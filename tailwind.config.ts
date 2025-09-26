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
        // CalmMind AI Design System Colors
        bg: "hsl(210, 30%, 95%)",
        accent: "hsl(280, 60%, 70%)",
        primary: "hsl(190, 80%, 50%)",
        surface: "hsl(210, 30%, 100%)",
        "text-primary": "hsl(210, 30%, 20%)",
        "text-secondary": "hsl(210, 30%, 50%)",
      },
      spacing: {
        lg: "20px",
        md: "12px",
        sm: "8px",
      },
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "6px",
      },
      boxShadow: {
        card: "0 4px 12px hsla(210,30%,20%,0.10)",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        caption: ["var(--font-caption)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["1rem", { lineHeight: "1.75" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        display: ["2.25rem", { lineHeight: "1", fontWeight: "700" }],
        heading: ["1.875rem", { lineHeight: "1.2", fontWeight: "600" }],
      },
      transitionDuration: {
        base: "200ms",
        fast: "100ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        base: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
