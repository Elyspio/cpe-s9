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
					<Typography variant={"h3"}>User information</Typography>
				</Grid>
				<Grid item>
					<Typography>{name ? `Your name is: ${name}` : "I dont know your name"}</Typography>
				</Grid>

				{drink && (
					<Grid item>
						<Typography>You want a {drink}</Typography>
					</Grid>
				)}
			</Grid>
		</Paper>
	);
}
