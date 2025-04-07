// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        slab: ["'Roboto Slab'", "serif"],
      },
      colors: {
        basic: "#FBD909",
        primary: "#EBDE57",
        secondary: "#2c3e50",
        backColor: "#374151",
      },
    },
  },
  plugins: [],
};
