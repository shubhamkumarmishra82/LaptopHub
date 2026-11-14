import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",

    initialState: {
        cartCount: 0
    },

    reducers: {

        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },

        increaseCartCount: (state) => {
            state.cartCount += 1;
        }
    }
});

export const { setCartCount, increaseCartCount } =
    cartSlice.actions;

export default cartSlice.reducer;
