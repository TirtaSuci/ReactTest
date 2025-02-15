import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
    reducer: { cart: cartReducer },
})
console.log("Initial State:", store.getState());

store.subscribe(() => console.log("Updated State:", store.getState()));

export default store