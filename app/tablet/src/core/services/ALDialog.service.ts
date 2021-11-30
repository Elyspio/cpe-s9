import { QiService } from "../wrapper/QiWrapper";

interface IALDialog {
	/**
	 * Load a topic from its absolute path
	 * @return a function to unload the topic
	 */
	// loadTopicFromContent(topicContent: string, dialogName?: string): Promise<() => void>;

	say(text: string, choices: string[], outputALMemory?: string, dialogName?: string): Promise<[string, () => void]>;
}

interface QiALDialog {
	loadTopic(topicName: string): void;

	loadTopicContent(topicContent: string): Promise<string>;

	activateTopic(topicName: string): void;

	subscribe(dialog: string): void;

	subscribe(dialog: string): void;

	unsubscribe(dialog: string): void;

	deactivateTopic(topicName: string): void;

	unloadTopic(topicName: string): void;

	setLanguage(language: string): void;

	getAllLoadedTopics(): Promise<string[]>;

	activateTag(tagName: string, topicName: string);

	gotoTag(tagName: string, topicName: string);
}

export const dialogMemoryStorage = "topToJs";
export const dialogTopicName = "topToJs";
let idALMemory = 0;

export class ALDialogService extends QiService<QiALDialog> implements IALDialog {
	private constructor() {
		super("ALDialog");
	}

	public static async instance(): Promise<IALDialog> {
		const self = new ALDialogService();
		await self.init();

		const topics = await self.service.getAllLoadedTopics();
		for (let topic of topics) {
			self.service.unloadTopic(topic);
		}
		await self.service.setLanguage("French");

		return self;
	}

	public async loadTopicFromContent(topicContent: string, dialogName = dialogTopicName) {
		const topicName = await this.service.loadTopicContent(topicContent);

		await this.service.activateTopic(topicName);
		await this.service.subscribe(dialogName);
		await this.service.activateTag("x", topicName);
		await this.service.gotoTag("x", topicName);

		return async () => {
			await this.service.unsubscribe(dialogName);
			await this.service.deactivateTopic(topicName);
			await this.service.unloadTopic(topicName);
		};
	}

	public async say(text: string, choices: string[], outputALMemory: string = dialogMemoryStorage, dialogName: string = dialogTopicName): Promise<[string, () => void]> {
		let almemory = outputALMemory + idALMemory++;
		const content = this.getContent(text, choices, almemory, dialogName);
		console.log("say content=", content);
		return [almemory, await this.loadTopicFromContent(content, dialogName)];
	}

	private getContent(text: string, choices: string[], outputALMemory: string, dialogName: string) {
		return `
topic: ~${dialogName}()
language: frf
proposal: %x ${text}
u: (_[${choices.join(" ")}]) $${outputALMemory}=$1
`;
	}
}
