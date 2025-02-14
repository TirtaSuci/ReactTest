import { legacy_createStore } from "redux";

const cartReducer = (
    state = {
        cart: [{ id: 1, qty: 1 }],
    },
    action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
            case "ADD_TO_CART2":
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                };
        default:
            return state;
    }
};

const store = legacy_createStore(cartReducer);
console.log("Initial State :", store.getState());

store.subscribe(() => console.log("Updated State :", store.getState()));

const action1 = { type: "ADD_TO_CART", payload: { id: 2, qty: 1 } };
store.dispatch(action1);
const action2 = { type: "ADD_TO_CART2", payload: { id: 12, qty: 11 } };
store.dispatch(action2);