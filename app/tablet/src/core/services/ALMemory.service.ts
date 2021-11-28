import { QiService } from "../wrapper/QiWrapper";

export interface IALMemory {
	/**
	 *
	 * @example to get the event when pepper catch a touch : inst.listen("TouchChanged", (data) => {console.log(data)})
	 * @param event  the event that will be subscribed
	 * @param callback the callback to do something when event is raised
	 */
	listen<T>(event: string, callback: (obj: T) => void): Promise<void>;

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

interface QiALMemory {
	subscriber: (event: string) => Promise<{ signal: { connect: (val: any) => void } }>;

	insertData(event: string, value: string);

	getData<T = any>(event: string): T;

	raiseEvent(event: string, data: any): Promise<void>;
}

export class ALMemoryService extends QiService<QiALMemory> implements IALMemory {
	private constructor() {
		super("ALMemory");
	}

	public static async instance(): Promise<IALMemory> {
		const self = new ALMemoryService();
		await self.init();
		return self;
	}

	public listen(event: string, callback: (arg0: any) => void) {
		this.ensureInit();
		return new Promise<void>(async (resolve) =>
			this.service.subscriber(event).then((subscriber) => {
				subscriber.signal.connect((state) => {
					callback(JSON.parse(state));
				});
				resolve();
			})
		);
	}

	public setALValue(event: string, value: any) {
		this.ensureInit();
		value = this.toJson(value);
		this.service.insertData(event, value);
	}

	public async getAlValue(event: string) {
		this.ensureInit();
		return this.service.getData(event);
	}

	public raise(event: string, value: any) {
		this.ensureInit();
		value = this.toJson(value);
		return this.service.raiseEvent(event, value);
	}
}
