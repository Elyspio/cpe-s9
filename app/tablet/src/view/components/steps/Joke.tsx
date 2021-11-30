import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { names, stepsMap } from "../../../config/steps";
import { ALDialogService } from "../../../core/services/ALDialog.service";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeStep } from "../../store/modules/scenario.reducer";

export function Joke() {
	const { drink } = useAppSelector((s) => s.user);
	const { joke } = useAppSelector((s) => s.scenario);

	const [answerJoke, setAnswerJoke] = React.useState("");

	const { str, tts } = React.useMemo(() => {
		const tts = `Bien compris ça sera un ${drink}, j'ai envoyé la commande, durant le temps de préparation je te propose une petite blague : ${joke?.question}`;
		const str = `J'ai commandé d'un ${drink} pour vous. En attendant, voici de quoi patienter :`;
		return {
			tts,
			str,
		};
	}, [drink, joke]);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		(async () => {
			if (joke && drink) {
				const dialog = await ALDialogService.instance();
				const [, clean] = await dialog.say(tts, names);
				await clean();
				setTimeout(async () => {
					setAnswerJoke(joke.answer);
					const [, clean] = await dialog.say(joke.answer, ["xazxzax"]);
					await clean();

					setTimeout(() => {
						dispatch(changeStep(stepsMap.get_order));
					}, 2000);
				}, 1000);
			}
		})();
	}, [joke, drink, tts, dispatch]);

	if (!joke || !drink) return null;

	return (
		<Box p={2}>
			<Typography>{str}</Typography>
			<Divider sx={{ m: 2 }} />
			<Typography>{joke.question}</Typography>
			<Typography>{answerJoke}</Typography>
		</Box>
	);
}
