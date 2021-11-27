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
	},
});

export const { reducer: userReducer } = slice;
