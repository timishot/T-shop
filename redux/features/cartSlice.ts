import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product} from "@/type";
import {fetchCart} from "@/redux/features/cartThunks";



const initialState: Product[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart:  (state, action: PayloadAction<Product[]>) => {
            return action.payload; // Set cart state to the persisted cart
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.find((product) => product.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {

                state.push({ ...action.payload, quantity: 1 }); // Add quantity when pushing
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
        // When the cart is fetched from the server, replace the state.
        builder.addCase(fetchCart.fulfilled, (_, action) => action.payload);
        // Optionally, you can handle persistCart cases (e.g., logging, errors)
    },
});

export const { setCart, addToCart, removeFromCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
