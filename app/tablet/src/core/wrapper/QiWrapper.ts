import io, { Socket } from "socket.io-client";
import { pepperIp, runningOnPepper } from "../../config/qi";

const naoqiIsPresent = process.env.NODE_ENV === "production";

const servicesNames = ["ALMemory", "ALDialog"] as const;
type ServiceName = typeof servicesNames[number];

interface IQiWrapper {
	services: {
		stored: Map<string, any>;
		get: <T>(serviceName: ServiceName) => Promise<T>;
	};
}

/**
 * @description This class is a wrapper of Naoqi's ALMemory
 * @class QiWrapper
 */
class QiWrapper implements IQiWrapper {
	private static inst: IQiWrapper;
	private session: any;

	public services = {
		stored: new Map<string, any>(),
		get: <T>(serviceName: string) => {
			return new Promise<T>((resolve) => {
				if (this.services.stored.has(serviceName)) resolve(this.services.stored.get(serviceName));
				this.session.service(serviceName).then((serv) => {
					if (!this.services.stored.has(serviceName)) this.services.stored.set(serviceName, serv);
					resolve(serv as T);
				});
			});
		},
	};

	/**
	 * Do NOT call it directly
	 * @param session {QiSession} the session resulted from calling QiMessaging Api.
	 */
	private constructor(session) {
		this.session = session;
	}

	/**
	 * @description Create an instance of QiWrapper accessible via promise
	 * @returns {Promise<QiWrapper>}
	 */
	static create(host?: string) {
		return new Promise<IQiWrapper>((resolve) => {
			// @ts-ignore
			window.QiSession(
				async (session) => {
					this.inst = new QiWrapper(session);
					return resolve(this.inst);
				},
				undefined,
				host
			);
		});
	}

	static instance() {
		return this.inst;
	}
}

class FalseQiWrapper implements IQiWrapper {
	client: Socket;
	public services: { stored: Map<string, any>; get: <T>(serviceName: string) => Promise<T> };

	constructor() {
		this.client = io("localhost:4000/ws");
	}
}

export default QiWrapper;

export class QiService<Service> {
	protected service: Service;
	private inited = false;

	constructor(private serviceName: ServiceName) {}

	protected ensureInit() {
		if (!this.inited) throw `Service ${this.serviceName} is not inited`;
	}

	protected toJson(val: any) {
		return JSON.stringify(val);
	}

	protected async init() {
		this.service = await QiWrapper.instance().services.get(this.serviceName);
		this.inited = true;
	}
}

export async function initQi() {
	const timeoutMessage = "Qi connection timeout (2s)";
	const timeout = new Promise((resolve) => setInterval(() => resolve(timeoutMessage), 2000));

	try {
		const result = await Promise.race([timeout, QiWrapper.create(runningOnPepper ? pepperIp : undefined)]);
		if (result === timeoutMessage) console.warn(result);
	} catch (e) {
		console.error(e);
	}
}
