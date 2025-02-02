import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchCart, persistCart } from "./cartThunks"; // Thunks that trigger loading state

const initialState: boolean = false;

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        // Optional: can be used for manual control if needed
        setLoading: (state, action: PayloadAction<boolean>) => action.payload
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, () => true)  // Sets loading to true when fetching starts
            .addCase(fetchCart.fulfilled, () => false)  // Sets loading to false when fetching ends
            .addCase(fetchCart.rejected, () => false)  // Sets loading to false if fetching fails
            .addCase(persistCart.pending, () => true)
            .addCase(persistCart.fulfilled, () => false)
            .addCase(persistCart.rejected, () => false);
    }
});

export const { setLoading } = loadingSlice.actions;  // Export in case you need manual control
export default loadingSlice.reducer;
