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
        background: "var(--background)",
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        foreground: "var(--foreground)",
        primary: "#0D0DCD", // Warna utama (primary)
        secondary: "#000096", 
        default: "#191F2A",
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'], // Adding Open Sans font
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 1px 0px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
