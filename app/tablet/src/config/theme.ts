import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		mode: "light",
		secondary: {
			...colors.grey,
			main: colors.grey["900"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["400"],
		},
		background: {
			paper: "#ffffff",
			default: "#e6e6e6",
		},
	},
	typography: {
		body1: {
			fontSize: 20,
		},
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root": {
						backgroundImage: "unset !important",
					},
				},
			},
		},
	},
});
