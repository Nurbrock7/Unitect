import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef0f8",
          100: "#d5d9ef",
          200: "#aab3df",
          300: "#7f8dcf",
          400: "#4d64b8",
          500: "#1b2d6e",
          600: "#162458",
          700: "#101b42",
          800: "#0b122c",
          900: "#060916",
          DEFAULT: "#1b2d6e",
        },
        accent: {
          50: "#fef2f2",
          100: "#fde2e2",
          200: "#fbbaba",
          300: "#f78888",
          400: "#f05555",
          500: "#cc2128",
          600: "#a81a20",
          700: "#841419",
          800: "#600f12",
          900: "#3c090b",
          DEFAULT: "#cc2121",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
