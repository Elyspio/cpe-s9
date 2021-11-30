import { QiService } from "../wrapper/QiWrapper";
import { ALAutonomousLifeService, IALAutonomousLife } from "./ALAutonomousLife.service";

interface IALMotion {
	moveTo(x: number, y: number, theta: number): Promise<boolean>;
}

interface QiALMotion {
	moveTo(x: number, y: number, theta: number): Promise<boolean>;
}

export class ALMotionService extends QiService<QiALMotion> implements IALMotion {
	autonomousLifeService!: IALAutonomousLife;

	private constructor() {
		super("ALMotion");
	}

	public static async instance(): Promise<IALMotion> {
		const self = new ALMotionService();
		await self.init();
		self.autonomousLifeService = await ALAutonomousLifeService.instance();
		return self;
	}

	async moveTo(x: number, y: number, theta: number): Promise<boolean> {
		await this.autonomousLifeService.setMouvement(false);
		const done = await this.service.moveTo(x, y, theta);
		await this.autonomousLifeService.setMouvement(true);

		return done;
	}
}
