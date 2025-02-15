import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
    },
});

const loginSlice = createSlice({
    name: "login", initialState: { status: false },
    reducers: {
        login: (state, action) => {
            state.status = true;
        },
    }
})

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        cart: cartSlice.reducer,
    },
});

console.log("Initial State:", store.getState());

store.subscribe(() => console.log("Updated State:", store.getState()));

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 20 }));
store.dispatch(loginSlice.actions.login());