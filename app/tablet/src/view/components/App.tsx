import React from "react";
import { Box } from "@mui/material";
import { Route, Switch } from "react-router";
import { StepId } from "../store/modules/scenario.reducer";
import { AskName } from "./steps/AskName";
import { AskDrink } from "./steps/AskDrink";
import { Content } from "./Content";
import { Joke } from "./steps/Joke";
import { Comeback } from "./steps/Comeback";
import { Conclusion } from "./steps/Conclusion";
import { GetOrder } from "./steps/GetOrder";

export function App() {
	const stepMap = React.useMemo((): Record<StepId, React.ReactNode> => {
		return {
			ask_name: (
				<Content label={"Votre prénom"}>
					<AskName />
				</Content>
			),
			ask_drink: (
				<Content label={"Votre boisson"}>
					<AskDrink />
				</Content>
			),
			comeback: (
				<Content label={"Je reviens vers les clients"}>
					<Comeback />
				</Content>
			),
			conclusion: (
				<Content label={"Remerciement"}>
					<Conclusion />
				</Content>
			),
			say_joke: (
				<Content label={"Commande envoyée"}>
					<Joke />
				</Content>
			),
			get_order: (
				<Content label={"Direction cuisine"}>
					<GetOrder />
				</Content>
			),
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
