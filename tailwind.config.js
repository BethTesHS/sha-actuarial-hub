/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#003D6B",
          mid: "#0066B3",
          light: "#8BC53F",
          accent: "#8BC53F",
          soft: "#D9E1F2",
        },
        sha: {
          blue: "#0066B3",
          green: "#8BC53F",
          darkBlue: "#003D6B",
          purple: "#9D4EDD",
          cyan: "#00D4FF",
          orange: "#FF6B35",
        },
      },
    },
  },
  plugins: [],
};
