import "core-js";
import "core-js/es/set";
import "core-js/es/map";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./view/components/App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { history, store } from "./view/store/store";
import "./index.scss";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import { initQi } from "./core/wrapper/QiWrapper";
import { redirectStd } from "./core/services/Console.service";

export namespace Global {
	export interface Window {
		QiSession: any;
	}
}

async function initApp() {
	redirectStd();
	await initQi();

	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<App />
						<CssBaseline />
					</ThemeProvider>
				</StyledEngineProvider>
			</ConnectedRouter>
		</Provider>,

		document.getElementById("root")
	);
}

initApp().then(() => {
	console.log("App Loaded");
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
