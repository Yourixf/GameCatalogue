import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

function ThemeContextProvider ({ children }) {
    const [selectedTheme, toggleSelectedTheme] = useState("dark-mode")

    function toggleTheme () {
        selectedTheme === "dark-mode" ? toggleSelectedTheme("light-mode") : toggleSelectedTheme("dark-mode")
    }

    return (
        <ThemeContext.Provider value={{toggleTheme, selectedTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;