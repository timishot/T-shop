import { createAsyncThunk } from "@reduxjs/toolkit";
import {Product} from "@/type";

// Fetch the persisted cart data
type CartData = Product[];

export const fetchCart = createAsyncThunk<CartData, void, { rejectValue: string }>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/cart");
            if (!res.ok) {
                return rejectWithValue("Failed to fetch cart data");
            }
            return await res.json();
        } catch (error) {
            return rejectWithValue("Network error: Could not connect to server");
        }
    }
);

// Persist the current cart data
export const persistCart = createAsyncThunk<CartData, CartData, { rejectValue: string }>(
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
        } catch (error) {
            return rejectWithValue("Network error: Could not save cart data");
        }
    }
);
