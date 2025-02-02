import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import loadingReducer from "./features/loadingSlice";
// import productReducer from "./features/productSlice";
import errorReducer from "./features/errorSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // product: productReducer,
        loading: loadingReducer,
        error: errorReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
