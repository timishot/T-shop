import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICartProduct } from "./cartSlice";

// Fetch the persisted cart data
export const fetchCart = createAsyncThunk<ICartProduct[], void, { rejectValue: string }>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/cart");

            if (!res.ok) {
                return rejectWithValue("Failed to fetch cart data");
            }

            return await res.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Persist the current cart data
export const persistCart = createAsyncThunk<
    ICartProduct[],
    ICartProduct[],
    { rejectValue: string }
>(
    "cart/persistCart",
    async (cart, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cart),
            });

            if (!res.ok) {
                return rejectWithValue("Failed to persist cart data");
            }

            return await res.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
