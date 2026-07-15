import { useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, handleTheme };
}
