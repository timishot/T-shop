import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = ""; // Initial state is now an empty string

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => action.payload === null ? "" : action.payload,
        clearError: () => "",
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;