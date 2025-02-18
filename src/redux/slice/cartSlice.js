import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: JSON.parse(localStorage.getItem("cart")) || [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.data.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.qty += 1;
            } else {
                state.data.push(action.payload)
            }
            localStorage.setItem("cart", JSON.stringify(state.data));
        },
        decreaseCart: (state, action) => {
            const itemInCart = state.data.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                if (itemInCart.qty > 1) {
                    itemInCart.qty -= 1;
                }
            }
            localStorage.setItem("cart", JSON.stringify(state.data))
        },

        removeFromCart: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.data)); // Simpan ke localStorage
        },
    }
});

export const { addToCart } = cartSlice.actions;
export const { decreaseCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;