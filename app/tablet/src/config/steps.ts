import { Step } from "../view/store/modules/scenario.reducer";

export const steps: Step[] = [
	{
		id: "ask_name",
		name: "Ask name",
		// buttons: [],
		// text: "Hello human, what is your name?",
	},
	{
		id: "ask_drink",
		// text: (state) => `Hello ${state.user.name}, which drink do you want ${drinks.join(", ")}?`,
		// buttons: drinks,
		name: "Ask Drink",
	},
	{
		id: "say_joke",
		// buttons: [],
		name: "Joke time !",
	},
	{
		id: "get_order",
		// buttons: [],
		name: "Get order",
	},
	{
		id: "comeback",
		// buttons: [],
		name: "Comming back to the user",
	},
	{
		// text: "Here is your order, have a nice day!",
		name: "Good bye !",
		// buttons: [],
		id: "conclusion",
	},
];
