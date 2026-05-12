import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "rgba(15, 23, 42, 0.62)",
        line: "rgba(255, 255, 255, 0.1)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(45, 212, 191, 0.14)",
        glass: "0 18px 70px rgba(0, 0, 0, 0.26)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
        "accent-line":
          "linear-gradient(90deg, #34d399 0%, #22d3ee 38%, #f59e0b 70%, #fb7185 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
