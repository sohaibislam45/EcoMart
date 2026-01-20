import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c38e", // Design primary
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#22c38e", // Match design
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        secondary: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#a18072", // Earthy brown
          600: "#8a6a5c",
          700: "#73574d",
          800: "#5e4840",
          900: "#483832",
        },
        accent: {
          light: "#fde047",
          DEFAULT: "#eab308",
          dark: "#ca8a04",
        },
        "background-light": "#f6f8f7",
        "background-dark": "#12201b",
        "forest-dark": "#1a2e26",
        "forest-muted": "#27453b",
        "surface-dark": "#1a211e",
        "off-white": "#f2f7f5",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
      },
      fontFamily: {
        display: ["var(--font-manrope)"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
