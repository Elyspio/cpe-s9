import { QiService } from "../wrapper/QiWrapper";

export interface IALAutonomousLife {
	setMouvement(state: boolean): Promise<void>;
}

interface QiALAutonomousLife {
	setAutonomousAbilityEnabled(type: "All", state: boolean): Promise<void>;
}

export class ALAutonomousLifeService extends QiService<QiALAutonomousLife> implements IALAutonomousLife {
	private constructor() {
		super("ALAutonomousLife");
	}

	public static async instance(): Promise<IALAutonomousLife> {
		const self = new ALAutonomousLifeService();
		await self.init();
		return self;
	}

	public async setMouvement(state: boolean): Promise<void> {
		await this.service.setAutonomousAbilityEnabled("All", state);
	}
}
