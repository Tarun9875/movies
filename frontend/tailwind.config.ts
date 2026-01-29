import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          900: "#003B5C",
          800: "#005B77",
          700: "#007A8E",
          600: "#009DA5",
          500: "#00B2B2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
