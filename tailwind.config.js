/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        balkrann: {
          orange: "#ff5a00",
          "orange-hover": "#e04f00",
          dark: "#0b0c10",
          card: "#12141a",
          surface: "#181a22",
          border: "rgba(255, 255, 255, 0.1)",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-redhat-text)", "var(--font-redhat-display)", "sans-serif"],
        display: ["var(--font-redhat-display)", "var(--font-redhat-text)", "sans-serif"],
      },
      keyframes: {
        "volt-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "volt-ring": {
          "0%": { transform: "scale(1)", opacity: 0.55 },
          "100%": { transform: "scale(1.9)", opacity: 0 },
        },
        "volt-bubble": {
          "0%, 100%": { transform: "translateX(0)", opacity: 0.95 },
          "50%": { transform: "translateX(4px)", opacity: 1 },
        },
      },
      animation: {
        "volt-bounce": "volt-bounce 2.6s ease-in-out infinite",
        "volt-ring": "volt-ring 2s ease-out infinite",
        "volt-bubble": "volt-bubble 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
