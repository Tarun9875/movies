import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle Theme"
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-300 ease-in-out
        shadow-md hover:shadow-lg
        ${
          dark
            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-yellow-300 hover:from-gray-700 hover:to-gray-600"
            : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
        }
      `}
    >
      <span className="text-lg">
        {dark ? "🌙" : "☀️"}
      </span>
      <span className="text-sm font-medium hidden sm:block">
        {dark ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
