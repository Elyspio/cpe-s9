import React from "react";
import { Box } from "@mui/material";
import { Route, Switch } from "react-router";
import { StepId } from "../store/modules/scenario.reducer";
import { AskName } from "./steps/AskName";
import { AskDrink } from "./steps/AskDrink";
import { Content } from "./Content";

export function App() {
	const stepMap = React.useMemo((): Record<StepId, React.ReactNode> => {
		return {
			ask_name: (
				<Content label={"Ask Name"}>
					<AskName />
				</Content>
			),
			ask_drink: (
				<Content label={"Ask Drink"}>
					<AskDrink />
				</Content>
			),
			comeback: <div />,
			conclusion: <div />,
			say_joke: <div />,
			get_order: <div />,
		};
	}, []);

	return (
		<Box className={"App"}>
			<Switch>
				{Object.entries(stepMap).map(([id, component]: [StepId, React.ReactNode]) => (
					<Route key={id} render={() => component} path={`/${id}`} />
				))}

				<Route exact path="/" render={() => stepMap.ask_name} />
			</Switch>
		</Box>
	);
}
