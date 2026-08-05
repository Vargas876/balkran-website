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
    },
  },
  plugins: [],
};
