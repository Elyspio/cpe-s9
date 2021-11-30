import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { names, stepsMap } from "../../../config/steps";
import { ALDialogService } from "../../../core/services/ALDialog.service";
import { setUser } from "../../store/modules/user.reducer";
import { useAppDispatch } from "../../store/store";
import { changeStep } from "../../store/modules/scenario.reducer";
import { ALMemoryService } from "../../../core/services/ALMemory.service";

export function AskName() {
	const { str, tts } = React.useMemo(() => {
		const str = "Bonjour humain, quel est votre prénom ?";
		return {
			tts: str,
			str,
		};
	}, []);

	const dispatch = useAppDispatch();

	const next = React.useCallback(
		(name) => () => {
			dispatch(setUser(name));
			dispatch(changeStep(stepsMap.ask_drink));
		},
		[dispatch]
	);

	React.useEffect(() => {
		(async () => {
			const dialog = await ALDialogService.instance();
			const [id, clean] = await dialog.say(tts, names);
			const almemory = await ALMemoryService.instance();
			console.log("id", id);
			await almemory.listen<string>(id, (name) => {
				console.log("AskName", { x: name });
				next(name)();
				almemory.unsubscribe(id);
				clean();
			});
		})();
	}, [tts, dispatch, next]);

	return (
		<Box p={2}>
			<Typography>{str}</Typography>
			<Grid container spacing={4} my={2}>
				{names.map((name) => (
					<Grid item key={name}>
						{
							<Button size={"large"} variant={"contained"} onClick={next(name)}>
								"{name}"
							</Button>
						}
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
