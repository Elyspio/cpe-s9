/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from "./configuration";
import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
	assertParamExists,
	createRequestFunction,
	DUMMY_BASE_URL,
	serializeDataIfNeeded,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	toPathString,
} from "./common";
// @ts-ignore
import { BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError } from "./base";

/**
 * An enumeration.
 * @export
 * @enum {string}
 */

export enum ConsoleLevel {
	Debug = "debug",
	Error = "error",
	Info = "info",
	Warning = "warning",
}

/**
 *
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
	/**
	 *
	 * @type {Array<ValidationError>}
	 * @memberof HTTPValidationError
	 */
	detail?: Array<ValidationError>;
}

/**
 *
 * @export
 * @interface Joke
 */
export interface Joke {
	/**
	 *
	 * @type {string}
	 * @memberof Joke
	 */
	question: string;
	/**
	 *
	 * @type {string}
	 * @memberof Joke
	 */
	answer: string;
}

/**
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
	/**
	 *
	 * @type {Array<string>}
	 * @memberof ValidationError
	 */
	loc: Array<string>;
	/**
	 *
	 * @type {string}
	 * @memberof ValidationError
	 */
	msg: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidationError
	 */
	type: string;
}

/**
 * ConsoleApi - axios parameter creator
 * @export
 */
export const ConsoleApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Stdout
		 * @param {ConsoleLevel} level
		 * @param {string} output
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		stdoutConsoleLevelPost: async (level: ConsoleLevel, output: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			// verify required parameter 'level' is not null or undefined
			assertParamExists("stdoutConsoleLevelPost", "level", level);
			// verify required parameter 'output' is not null or undefined
			assertParamExists("stdoutConsoleLevelPost", "output", output);
			const localVarPath = `/console/{level}`.replace(`{${"level"}}`, encodeURIComponent(String(level)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (output !== undefined) {
				localVarQueryParameter["output"] = output;
			}

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	};
};

/**
 * ConsoleApi - functional programming interface
 * @export
 */
export const ConsoleApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = ConsoleApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @summary Stdout
		 * @param {ConsoleLevel} level
		 * @param {string} output
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async stdoutConsoleLevelPost(level: ConsoleLevel, output: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.stdoutConsoleLevelPost(level, output, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	};
};

/**
 * ConsoleApi - factory interface
 * @export
 */
export const ConsoleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = ConsoleApiFp(configuration);
	return {
		/**
		 *
		 * @summary Stdout
		 * @param {ConsoleLevel} level
		 * @param {string} output
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		stdoutConsoleLevelPost(level: ConsoleLevel, output: string, options?: any): AxiosPromise<void> {
			return localVarFp.stdoutConsoleLevelPost(level, output, options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * ConsoleApi - object-oriented interface
 * @export
 * @class ConsoleApi
 * @extends {BaseAPI}
 */
export class ConsoleApi extends BaseAPI {
	/**
	 *
	 * @summary Stdout
	 * @param {ConsoleLevel} level
	 * @param {string} output
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ConsoleApi
	 */
	public stdoutConsoleLevelPost(level: ConsoleLevel, output: string, options?: AxiosRequestConfig) {
		return ConsoleApiFp(this.configuration)
			.stdoutConsoleLevelPost(level, output, options)
			.then((request) => request(this.axios, this.basePath));
	}
}

/**
 * JokeApi - axios parameter creator
 * @export
 */
export const JokeApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Root
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		rootJokesGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
			const localVarPath = `/jokes`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			setSearchParams(localVarUrlObj, localVarQueryParameter);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	};
};

/**
 * JokeApi - functional programming interface
 * @export
 */
export const JokeApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = JokeApiAxiosParamCreator(configuration);
	return {
		/**
		 *
		 * @summary Root
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async rootJokesGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Joke>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.rootJokesGet(options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	};
};

/**
 * JokeApi - factory interface
 * @export
 */
export const JokeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = JokeApiFp(configuration);
	return {
		/**
		 *
		 * @summary Root
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		rootJokesGet(options?: any): AxiosPromise<Joke> {
			return localVarFp.rootJokesGet(options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * JokeApi - object-oriented interface
 * @export
 * @class JokeApi
 * @extends {BaseAPI}
 */
export class JokeApi extends BaseAPI {
	/**
	 *
	 * @summary Root
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof JokeApi
	 */
	public rootJokesGet(options?: AxiosRequestConfig) {
		return JokeApiFp(this.configuration)
			.rootJokesGet(options)
			.then((request) => request(this.axios, this.basePath));
	}
}
