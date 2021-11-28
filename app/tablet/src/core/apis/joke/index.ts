import { ConsoleApi, JokeApi } from "./generated";

let basePath = "http://192.168.0.44:8000";
export const jokeApi = new JokeApi(undefined, basePath);
export const consoleApi = new ConsoleApi(undefined, basePath);
