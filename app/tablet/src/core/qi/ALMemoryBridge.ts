import QiWrapper from "./QiWrapper";
import { store } from "../../view/store/store";

const dispatch = store.dispatch;

/**
 *
 * @return {[Object]}
 */
const getScenarioSteps = () => {
	return store.getState().scenario.steps;
};

/**
 *
 * @returns {Object | undefined}
 * @param name
 */
const getStepByName = (name) => {
	const steps = getScenarioSteps();
	return steps[steps.findIndex((step) => (step.name = name))];
};

export { getScenarioSteps, getStepByName };

const localManagerToTabletEvents = {
	stepReceived: {
		reduxKey: "stepReceived",
		ALMemory: "R2019/Global/stepReceived",
	},
	currentScenario: {
		ALMemory: "R2019/Global/stepsList",
		reduxKey: "currentScenario",
		scenario: "__SCENARIO",
	},
};

/**
 * @description this class is the link between ALMemory's and Redux
 */
export default class ALMemoryBridge {
	static async init() {
		await QiWrapper.create();
	}

	// static initBridge = () => {
	// 	Promise.all([QiWrapper.listen(localManagerToTabletEvents.currentScenario.ALMemory, this.handleChangeCurrentScenario())]).then(() => {});
	// };

	static handleChangeCurrentView = () => (data) => {
		// if (data.view !== undefined || data.data !== undefined) {
		// 	dispatch({
		// 		type: viewAction.changeView.type,
		// 		view: data.view,
		// 		data: data.data,
		// 	});
		// }
	};
}
