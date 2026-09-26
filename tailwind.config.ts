import type { Config } from "tailwindcss";

/**
 * GridSync colour system.
 * Brand values are used for fills, rules and large type. The "-ink" variants are
 * darker/lighter partners that meet WCAG AA (4.5:1) for small text on paper or ink.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        ink: { DEFAULT: "#17221F", soft: "#1E2B27" },
        forest: "#24332E",
        mineral: { DEFAULT: "#66716C", ink: "#56615C", light: "#A7B0AA" },
        paper: { DEFAULT: "#F3F0E8", white: "#FCFBF7" },
        stone: { DEFAULT: "#DAD8CF", deep: "#C9C6BB" },
        copper: { DEFAULT: "#B96F45", ink: "#9A5530", light: "#D08A5E" },
        moss: { DEFAULT: "#788F72", ink: "#556B50" },
        sage: "#C7D2C0",
        signal: { DEFAULT: "#D9B84C", ink: "#7A5C0C" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Iowan Old Style", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 5.2vw + 0.5rem, 5.25rem)", { lineHeight: "1.0", letterSpacing: "-0.028em" }],
        "display-2": ["clamp(2.25rem, 3.2vw + 0.6rem, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.022em" }],
        "display-3": ["clamp(1.5rem, 1.2vw + 1rem, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.012em" }],
        lead: ["clamp(1.125rem, 0.4vw + 1rem, 1.3125rem)", { lineHeight: "1.55" }],
        label: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.04em" }],
      },
      maxWidth: { prose: "38rem", measure: "44rem" },
      transitionTimingFunction: { instrument: "cubic-bezier(0.2, 0, 0, 1)" },
    },
  },
  plugins: [],
};

export default config;
