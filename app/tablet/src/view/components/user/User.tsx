import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/store";
import "./User.scss";

export function User() {
	const { drink, name } = useAppSelector((s) => s.user);

	return (
		<Paper className={"User"}>
			<Grid container my={0} alignItems={"center"} direction={"column"} className={"h100"} spacing={2}>
				<Grid item>
					<Typography variant={"h3"}>Utilisateur</Typography>
				</Grid>
				<Grid item>
					<Typography>{name ? `Votre prénom est : ${name}` : "Je ne connais pas votre prénom"}</Typography>
				</Grid>

				{drink && (
					<Grid item>
						<Typography>Vous voulez une canette de {drink}</Typography>
					</Grid>
				)}
			</Grid>
		</Paper>
	);
}
