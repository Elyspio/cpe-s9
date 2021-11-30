import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { names, stepsMap } from "../../../config/steps";
import { ALDialogService } from "../../../core/services/ALDialog.service";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeStep } from "../../store/modules/scenario.reducer";
import { ALMotionService } from "../../../core/services/ALMotion.service";

export function GetOrder() {
	const { drink } = useAppSelector((s) => s.user);

	const { str, tts } = React.useMemo(() => {
		const tts = `On m'annonce que votre ${drink} est prêt, je pars le chercher`;
		return {
			tts,
			str: tts,
		};
	}, [drink]);

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		(async () => {
			if (drink) {
				const dialog = await ALDialogService.instance();
				const [, clean] = await dialog.say(tts, names);
				await clean();

				const motion = await ALMotionService.instance();
				await motion.moveTo(0, 0, Math.PI);
				await motion.moveTo(0.5, 0, 0);

				setTimeout(() => {
					dispatch(changeStep(stepsMap.comeback));
				}, 2000);
			}
		})();
	}, [drink, tts, dispatch]);

	if (!drink) return null;

	return (
		<Box p={2}>
			<Typography>{str}</Typography>
		</Box>
	);
}
