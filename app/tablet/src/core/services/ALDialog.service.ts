import { QiService } from "../wrapper/QiWrapper";

interface IALDialog {
	/**
	 * Load a topic from its absolute path
	 * @return a function to unload the topic
	 */
	loadTopic(topicName: string): () => void;
}

/**
 *     topic_name = ALDialog.loadTopic(topf_path.encode('utf-8'))
 *
 *     # Activating the loaded topic
 *     ALDialog.activateTopic(topic_name)
 *
 *     # Starting the dialog engine - we need to type an arbitrary string as the identifier
 *     # We subscribe only ONCE, regardless of the number of topics we have activated
 *     ALDialog.subscribe('my_dialog_example')
 *
 *     try:
 *         raw_input("\nSpeak to the robot using rules from the just loaded .top file. Press Enter when finished:")
 *     finally:
 *         # stopping the dialog engine
 *         ALDialog.unsubscribe('my_dialog_example')
 *
 *         # Deactivating the topic
 *         ALDialog.deactivateTopic(topic_name)
 *
 *         # now that the dialog engine is stopped and there are no more activated topics,
 *         # we can unload our topic and free the associated memory
 *         ALDialog.unloadTopic(topic_name)
 */

interface QiALDialog {
	loadTopic(topicName: string): void;

	activateTopic(topicName: string): void;

	subscribe(dialog: string): void;

	subscribe(dialog: string): void;

	desactivateTopic(topicName: string): void;

	unloadTopic(topicName: string): void;
}

export class ALDialogService extends QiService<QiALDialog> implements IALDialog {
	private constructor() {
		super("ALDialog");
	}

	public static async instance(): Promise<IALDialog> {
		const self = new ALDialogService();
		await self.init();
		return self;
	}

	public loadTopic(topicName: string) {
		return () => {};
	}
}
