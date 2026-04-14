import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        lava: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        night: {
          950: "#0a0f0a",
          900: "#0d1410",
          800: "#131b15",
        },
      },
      fontFamily: {
        display: ['"Impact"', '"Haettenschweiler"', '"Arial Narrow Bold"', "system-ui", "sans-serif"],
        sans: ['-apple-system', "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2.5s ease-in-out infinite",
        "shine": "shine 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 24px rgba(249,115,22,0.35)" },
          "50%": { boxShadow: "0 0 60px rgba(249,115,22,0.75)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(1200px 600px at 50% -10%, rgba(249,115,22,.25), transparent 60%), radial-gradient(800px 500px at 10% 110%, rgba(34,197,94,.20), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
