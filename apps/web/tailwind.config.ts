import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1D2A",
        secondary: "#5E8AA8",
        accent: "#D97742",
        support: "#A7BBC6",
        neutral: "#ECE7DF",
        background: "#FAFAF8",
        muted: "#46606F"
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"]
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(11, 29, 42, 0.05)",
        medium: "0 16px 40px -28px rgba(11, 29, 42, 0.28)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
