import { createContext, useContext, useReducer } from "react";
const TotalPriceContext = createContext();
const TotalPriceDispatchContext = createContext();

const totalPricerReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                total: action.payload.total
            };
        default:
            throw Error("Unknown action: " + action.type);
    }
};

export function TotalPriceProvider({ children }) {
    const [totalPrice, dispatch] = useReducer(totalPricerReducer, { total: 0 });
    return (
        <TotalPriceDispatchContext.Provider value={dispatch}>
            <TotalPriceContext.Provider value={totalPrice}>
                {children}
            </TotalPriceContext.Provider>
        </TotalPriceDispatchContext.Provider>
    );
}

export function useTotalPrice() {
    return useContext(TotalPriceContext);
}

export function useTotalPriceDispatch() {
    return useContext(TotalPriceDispatchContext);
}
