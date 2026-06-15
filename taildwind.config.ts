import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#98141f",      
          grey: "#877f81",     
        },
        mac: {
          red: "#ff5f56",
          yellow: "#ffbd2e",
          green: "#27c93f",
        },
      },
      fontFamily: {
        script: ["var(--font-sacramento)", "cursive"],
        bold: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        arapey: ["var(--font-arapey)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "pop-in": "popIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;