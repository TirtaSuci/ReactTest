import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: [
            {
                data: 1, qty: 1
            }
        ],

    },
    reducers: {
        addToCart: (state, action) => {
            state.data.push(action.payload);
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

