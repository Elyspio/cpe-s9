import { pepperIp } from "../../config/qi";
import { QiWrapper } from "./QiWrapper";
import { ALMemoryService } from "../services/ALMemory.service";
import { store } from "../../view/store/store";
import { stepsMap } from "../../config/steps";
import { changeStep, clearJoke } from "../../view/store/modules/scenario.reducer";
import { setDrink, setUser } from "../../view/store/modules/user.reducer";

export async function initQi() {
	const timeoutMessage = "Qi connection timeout (2s)";
	const timeout = new Promise((resolve) =>
		setTimeout(() => {
			resolve(timeoutMessage);
		}, 2000)
	);

	try {
		const result = await Promise.race([timeout, QiWrapper.create(process.env.NODE_ENV === "production" ? undefined : `${pepperIp}:80`)]);
		if (result === timeoutMessage) console.warn(result);
		else {
			const memory = await ALMemoryService.instance();
			await memory.listen("MiddleTactilTouched", () => {
				store.dispatch(changeStep(stepsMap.ask_name));
				store.dispatch(setUser(undefined));
				store.dispatch(setDrink(undefined));
				store.dispatch(clearJoke());
			});
		}
	} catch (e) {
		console.error(e);
	}
}
