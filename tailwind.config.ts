import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "pr-blue-1": "#042E5D",
        "pr-blue-2": "#0F619B",
        "pr-blue-3": "#3563E9",
        "sc-gray-1": "#596780",
        "sc-gray-2": "#90A3BF",
        "sc-gray-3": "#C3D4E9",
      },
    },
  },
  plugins: [],
};
export default config;
