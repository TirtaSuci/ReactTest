import { createContext, useContext, useEffect, useState } from "react";

const ExchangeRateContext = createContext();

export const ExchangeRateProvider = ({ children }) => {
    const [exchangeRate, setExchangeRate] = useState(1);

    useEffect(() => {
        fetch("https://api.exchangerate-api.com/v4/latest/USD")
            .then((res) => res.json())
            .then((data) => {
                setExchangeRate(data.rates.IDR);
            })
            .catch((error) => console.error("Error fetching exchange rate:", error));
    }, []);

    return (
        <ExchangeRateContext.Provider value={exchangeRate}>
            {children}
        </ExchangeRateContext.Provider>
    );
};

export const useExchangeRate = () => {
    return useContext(ExchangeRateContext);
};
