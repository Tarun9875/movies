// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: "#003B5C",     // Deep Ocean Blue
          tealDark: "#005B77", // Dark Teal Blue
          teal: "#007A8E",     // Ocean Teal
          sea: "#009DA5",      // Sea Green
          aqua: "#00B2B2"      // Aqua Cyan
        }
      }
    }
  },
  plugins: []
};
