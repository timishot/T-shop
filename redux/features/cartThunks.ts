// features/cartThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {ICartProduct, setCart} from "./cartSlice";
import {useAppDispatch} from "@/redux/hooks"; // Adjust the path accordingly

// Fetch the persisted cart data

// Fetch the persisted cart data
export const fetchCart = createAsyncThunk<ICartProduct[]>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/cart");
            console.log(res, "res");

            if (!res.ok) {
                throw new Error("Failed to fetch cart data");
            }

            const data: ICartProduct[] = await res.json();
            console.log(data, "data");
            return data; // Redux will handle setting the state via extraReducers
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Persist the current cart data
export const persistCart = createAsyncThunk(
    "cart/persistCart",
    async (cart: ICartProduct[], { rejectWithValue }) => {
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });
            console.log(res, "res")
            if (!res.ok) {
                throw new Error("Failed to persist cart data");
            }
            return await res.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
