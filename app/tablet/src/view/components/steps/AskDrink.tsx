import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useMemo } from "react";
import { drinks, stepsMap } from "../../../config/steps";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ALDialogService } from "../../../core/services/ALDialog.service";
import { setDrink } from "../../store/modules/user.reducer";
import { ALMemoryService } from "../../../core/services/ALMemory.service";
import { changeStep } from "../../store/modules/scenario.reducer";

export function AskDrink() {
	const name = useAppSelector((s) => s.user.name);

	const str = useMemo(() => `Bienvenue ${name}, quelle boisson voudriez vous ?`, [name]);

	const strTTS = `${str} Nous avons : ${drinks.join(", ")}`;

	const dispatch = useAppDispatch();

	const next = React.useCallback(
		(name) => () => {
			dispatch(setDrink(name));
			dispatch(changeStep(stepsMap.say_joke));
		},
		[dispatch]
	);

	React.useEffect(() => {
		(async () => {
			const dialog = await ALDialogService.instance();
			const almemory = await ALMemoryService.instance();
			const [id, clean] = await dialog.say(strTTS, drinks);
			await almemory.listen<string>(id, (drink) => {
				console.log("ASKDRINK", drink);
				next(drink)();
				almemory.unsubscribe(id);
				clean();
			});
		})();
	}, [strTTS, dispatch, next]);

	return (
		<Box p={2}>
			<Typography>{str}</Typography>

			<Grid container spacing={4} my={2}>
				{drinks.map((drink) => (
					<Grid item key={drink}>
						{
							<Button size={"large"} variant={"contained"} onClick={next(drink)}>
								"{drink}"
							</Button>
						}
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
