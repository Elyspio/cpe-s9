import { consoleApi } from "../apis/joke";
import { ConsoleLevel } from "../apis/joke/generated";

export function redirectStd() {
	const { log, error, warn, debug } = console;

	console.log = (data: any) => {
		log(data);
		consoleApi.stdoutConsoleLevelPost(ConsoleLevel.Info, JSON.stringify(data, null, 4));
	};

	console.error = (data: any) => {
		error(data);
		consoleApi.stdoutConsoleLevelPost(ConsoleLevel.Error, JSON.stringify(data, null, 4));
	};

	console.warn = (data: any) => {
		warn(data);
		consoleApi.stdoutConsoleLevelPost(ConsoleLevel.Warning, JSON.stringify(data, null, 4));
	};

	console.debug = (data: any) => {
		debug(data);
		consoleApi.stdoutConsoleLevelPost(ConsoleLevel.Debug, JSON.stringify(data, null, 4));
	};
}
