import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3F4F0",
        ink: "#0B0D0C",
        graphite: "#3A3F3C",
        rule: "#D5D8D2",
        "fermor-green": "#75FB90",
        caution: "#D64B2A",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "Bricolage Grotesque", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "graph-paper":
          "linear-gradient(to right, #D5D8D2 1px, transparent 1px), linear-gradient(to bottom, #D5D8D2 1px, transparent 1px)",
      },
      backgroundSize: {
        "graph-paper": "24px 24px",
      },
    },
  },
  plugins: [],
};
export default config;
