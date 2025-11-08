import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="px-3 py-1 bg-white/5 rounded text-sm">
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
