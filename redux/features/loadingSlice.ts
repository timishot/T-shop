import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: boolean = false;

export const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => action.payload
    }
})

export const  {setLoading} = loadingSlice.actions
export  default loadingSlice.reducer
