import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	name?: string;
	drink?: string;
}

const slice = createSlice({
	name: "User",
	initialState: {} as UserState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setDrink: (state, action: PayloadAction<string>) => {
			state.drink = action.payload;
		},
	},
});

export const {
	reducer: userReducer,
	actions: { setUser, setDrink },
} = slice;
