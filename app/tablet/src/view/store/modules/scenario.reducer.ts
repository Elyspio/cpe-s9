import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../store";
import { steps } from "../../../config/steps";

export const stepId = ["ask_name", "ask_drink", "say_joke", "get_order", "comeback", "conclusion"] as const;

export type StepId = typeof stepId[number];

export type Step = {
	text?: string | ((state: StoreState) => string);
	name: string;
	id: StepId;
};

export type ScenarioState = {
	step?: Step;
	steps: Step[];
	joke?: string;
};

const initialState: ScenarioState = {
	steps,
};

const slice = createSlice({
	name: "Scenario",
	initialState,
	reducers: {
		setSteps: (state, action: PayloadAction<Step[]>) => {
			state.steps = action.payload;
		},

		setCurrentStep: (state, { payload: name }: PayloadAction<string>) => {
			state.step = state.steps.find((step) => step.name === name);
		},
	},
});

export const { reducer: scenarioReducer, actions: scenarioActions } = slice;
