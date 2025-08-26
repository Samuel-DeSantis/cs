import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
});

export function ThemeProvider({ children, ...props }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (newTheme) => {
      if (newTheme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: light)").matches;
        root.classList.remove("light", "dark");
        root.classList.add(isDark ? "dark" : "light");
      } else {
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
      }
    };

    // initial load
    applyTheme(theme);

    // listen for system theme changes
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
