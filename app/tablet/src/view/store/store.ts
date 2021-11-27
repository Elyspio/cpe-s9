import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { scenarioReducer } from "./modules/scenario.reducer";
import { userReducer } from "./modules/user.reducer";

export const history = createBrowserHistory({
	basename: process.env.NODE_ENV === "production" ? "/apps/ihr-jgd-opt" : undefined,
});

export function configureCustomStore() {
	const reducers = {
		scenario: scenarioReducer,
		user: userReducer,
	};

	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(history),
	});

	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false }), routerMiddleware(history)],
	});
}

export const store = configureCustomStore();

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
