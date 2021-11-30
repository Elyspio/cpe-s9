import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { names } from "../../../config/steps";
import { ALDialogService } from "../../../core/services/ALDialog.service";
import { useAppDispatch, useAppSelector } from "../../store/store";

export function Conclusion() {
	const { drink } = useAppSelector((s) => s.user);

	const { str, tts } = React.useMemo(() => {
		const tts = `Merci d'avoir commandé, voici votre ${drink}, je vous souhaite une bonne dégustation. Si vous voulez prendre une autre commande, touchez ma tête`;
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
				setTimeout(() => {}, 2000);
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
