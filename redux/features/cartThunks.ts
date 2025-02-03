import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/type";

// Safe localStorage access
const loadCartFromLocalStorage = (): Product[] => {
    if (typeof window === "undefined") return []; // Prevent SSR issues
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart: Product[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

// Fetch the cart AFTER mount (client-side only)
export const fetchCart = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            return loadCartFromLocalStorage();
        } catch (error) {
            return rejectWithValue("Failed to fetch cart data from localStorage");
        }
    }
);

export const persistCart = createAsyncThunk<Product[], Product[], { rejectValue: string }>(
    "cart/persistCart",
    async (cart, { rejectWithValue }) => {
        try {
            saveCartToLocalStorage(cart);
            return cart;
        } catch (error) {
            return rejectWithValue("Failed to save cart data to localStorage");
        }
    }
);
