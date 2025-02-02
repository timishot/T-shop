// mport { Product } from "@/type"; // Ensure this is the correct import
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
// const initialState: Product = {
//     id: "",
//     name: "",
//     price: 0, // Changed from "" to 0 (number)
//     description: "",
//     category: "Electronics", // Default to one of the valid categories
//     image: "",
//     stock: 0, // Added stock property (since it's in the Product interface)
// };
//
// export const productSlice = createSlice({
//     name: "productSlice",
//     initialState,
//     reducers: {
//         setProduct: (state, action: PayloadAction<Product>) => {
//             return action.payload;
//         },
//     },
// });
//
// export const { setProduct } = productSlice.actions;
// export default productSlice.reducer;
