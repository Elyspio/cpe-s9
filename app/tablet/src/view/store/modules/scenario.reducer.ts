import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreState } from "../store";
import { steps } from "../../../config/steps";
import { push } from "connected-react-router";
import { jokeApi } from "../../../core/apis/joke";
import { Joke } from "../../../core/apis/joke/generated";

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
	joke?: Joke;
};

const initialState: ScenarioState = {
	steps,
};

export const getJoke = createAsyncThunk("Scenario/setJoke", async () => {
	const joke = await jokeApi.rootJokesGet();
	return joke.data;
});

export const changeStep = createAsyncThunk("Scenario/changeStep", (step: Step, { dispatch }) => {
	dispatch(push(step.id));
	if (step.id === "say_joke") {
		dispatch(getJoke());
	}
	return step;
});

const slice = createSlice({
	name: "Scenario",
	initialState,
	reducers: {
		clearJoke: (state) => {
			state.joke = undefined;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(changeStep.fulfilled, (state, action) => {
			state.step = action.payload;
		});
		addCase(getJoke.fulfilled, (state, action) => {
			state.joke = action.payload;
		});
	},
});

export const {
	reducer: scenarioReducer,
	actions: { clearJoke },
} = slice;
