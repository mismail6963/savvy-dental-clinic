import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#AFC9DF",
          accent: "#6F8FAE",
          dark: "#4A6A85",
          light: "#D4E4F0",
          50: "#F0F5FA",
          100: "#D4E4F0",
          200: "#AFC9DF",
          300: "#8FB0CE",
          400: "#6F8FAE",
          500: "#567A9A",
          600: "#4A6A85",
          700: "#3D576D",
          800: "#2F4356",
          900: "#1E2D3A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
