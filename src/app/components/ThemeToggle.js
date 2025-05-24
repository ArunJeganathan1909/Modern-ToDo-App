import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="px-3 py-1 rounded transition-colors duration-200"
      style={{
        backgroundColor: "var(--button-bg)",
        color: "var(--foreground)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "var(--button-hover)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "var(--button-bg)";
      }}
    >
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
