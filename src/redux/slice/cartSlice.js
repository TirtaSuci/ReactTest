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
            } else (
                state.data.push(action.payload)
            )
        },

        decreaseCart: (state, action) => {
            const itemInCart = state.data.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                if (itemInCart.qty > 1) {
                    itemInCart.qty -= 1;
                }
            } else (
                state.data.push(action.payload)
            )
        },

        removeFromCart: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.data)); // Simpan ke localStorage
        },

        clearCart: (state) => {
            state.data = [];
            localStorage.removeItem("cart"); // Hapus dari localStorage
        },
    }
});

export const { addToCart } = cartSlice.actions;
export const { decreaseCart } = cartSlice.actions;

export default cartSlice.reducer;

