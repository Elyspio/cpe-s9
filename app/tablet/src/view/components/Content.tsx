import { Grid, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { User } from "./user/User";
import "./Content.scss";

interface ContentProps {
	children: ReactNode;
	label: string;
}

export function Content({ label, children }: ContentProps) {
	return (
		<Grid pl={"32px"} container direction={"row"} className={"Content"} spacing={4}>
			<Grid xs={8} item container direction={"column"} alignItems={"center"} className={"Title"} flexWrap={"nowrap"} spacing={2}>
				<Grid item sx={{ width: "100%" }}>
					<Paper>
						<Typography m={2} p={2} variant={"h3"}>
							{label}
						</Typography>
					</Paper>
				</Grid>

				<Grid item sx={{ width: "100%", height: "88.6%" }} className={"Children"}>
					<Paper className={"h100"}>{children}</Paper>
				</Grid>
			</Grid>

			<Grid item xs={4} className={"h100"} my={2}>
				<User />
			</Grid>
		</Grid>
	);
}
