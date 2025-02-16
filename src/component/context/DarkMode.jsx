import { createContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;
