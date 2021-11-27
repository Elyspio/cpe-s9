import io, { Socket } from "socket.io-client";

const naoqiIsPresent = process.env.NODE_ENV === "production";

interface IQiWrapper {
	/**
	 *
	 * @example to get the event when pepper catch a touch : inst.listen("TouchChanged", (data) => {console.log(data)})
	 * @param event  the event that will be subscribed
	 * @param callback the callback to do something when event is raised
	 */
	listen<T>(event, callback: (obj: T) => void): Promise<void>;

	/**
	 * @description Set the value in a ALMemory
	 * @param event  the name of the ALMemory
	 * @param value  the value of the event
	 *
	 */
	setALValue(event: string, value: any): void;

	/**
	 * @description get the value stored in a ALMemory
	 * @param event the name of the ALMemory
	 * @returns {Promise<string>} the value in the ALMemory named {event}
	 */
	getAlValue<T>(event: string): Promise<T>;

	/**
	 * @description raise an ALMemory event
	 * @param event {string} the name of the ALMemory
	 * @param value {Object} the value of the event
	 * @return {Promise} a promise that is resolved when event is raised.
	 */
	raise(event: string, value: any): Promise<void>;
}

/**
 * @description This class is a wrapper of Naoqi's ALMemory
 * @class QiWrapper
 */
class QiWrapper implements IQiWrapper {
	private static inst: IQiWrapper;
	private session: any;
	private readonly AlMemory: any;

	/**
	 * Do NOT call it directly, see @getInstanceSync
	 * @description set proprieties for QiWrapper object.
	 * @param session {QiSession} the session resulted from calling QiMessaging Api.
	 * @param ALMemory the ALMemory's proxy resulted from session.service("AlMemory");
	 */
	constructor(session, ALMemory) {
		this.session = session;
		this.AlMemory = ALMemory;
	}

	/**
	 * @description Create an instance of QiWrapper accessible via promise
	 * @returns {Promise<QiWrapper>}
	 */
	static create() {
		return new Promise<IQiWrapper>((resolve) => {
			if (naoqiIsPresent) {
				// @ts-ignore
				window.QiSession(async (session) => {
					await session.service("ALMemory").then(async (ALMemory) => {
						this.inst = new QiWrapper(session, ALMemory);
						return resolve(this.inst);
					});
				});
			} else {
				return resolve(new FalseQiWrapper());
			}
		});
	}

	static instance() {
		return this.inst;
	}

	/**
	 * @description return the JSON's version of a value
	 * @param value the value that have to be transform to JSON
	 * @returns {string} the JSON's version of the value
	 */
	toJson(value) {
		// if (typeof (value) !== "string") {
		// 	value = JSO N.stringify(value);
		// }
		return JSON.stringify(value);
	}

	public listen(event, callback) {
		return new Promise<void>((resolve) =>
			this.AlMemory.subscriber(event).then((subscriber) => {
				subscriber.signal.connect((state) => {
					callback(JSON.parse(state));
				});
				resolve();
			})
		);
	}

	public setALValue(event, value) {
		value = this.toJson(value);
		this.AlMemory.insertData(event, value);
	}

	public async getAlValue(event) {
		return this.AlMemory.getData(event);
	}

	public raise(event, value) {
		value = this.toJson(value);
		return this.AlMemory["raiseEvent"](event, value);
	}
}

class FalseQiWrapper implements IQiWrapper {
	client: Socket;

	constructor() {
		this.client = io("localhost:4000/ws");
	}

	// static warningMessage = () =>
	static warningMessage() {}

	public getAlValue<T>(event: string): Promise<T> {
		return Promise.resolve(undefined);
	}

	public listen<T>(event, callback: (obj: T) => void): Promise<void> {
		return Promise.resolve(undefined);
	}

	public raise(event: string, value: any): Promise<void> {
		return Promise.resolve(undefined);
	}

	public setALValue(event: string, value: any): void {}
}

export default QiWrapper;
