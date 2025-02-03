import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/type";
import { fetchCart } from "@/redux/features/cartThunks";

const initialState: Product[] = []; // Ensure SSR renders empty first

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Product[]>) => {
            return action.payload;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.find((p) => p.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        updateCartQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const product = state.find((item) => item.id === action.payload.id);
            if (product) {
                product.quantity = action.payload.quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (_, action) => action.payload);
    },
});

export const { setCart, addToCart, removeFromCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
