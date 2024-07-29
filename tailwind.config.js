import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        9: "2.25rem", // 36px
      },
      padding: {
        page: "1rem 2rem", // 16px 32px
      },
      colors: {
        primary: {
          DEFAULT: "#808080", // Gray
          light: "#A9A9A9", // Lighter shade of gray
          dark: "#000", // Darker shade of gray
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["0.875rem", { lineHeight: "2.25rem" }], // 14px
        "4xl": ["1.375rem", { lineHeight: "2rem" }], // 22px
        "5xl": ["2.2rem", { lineHeight: "1" }], // 35px
        "6xl": ["3.5rem", { lineHeight: "1" }], // 56px
        "7xl": ["5.625rem", { lineHeight: "1" }], // 90px
      },
      screens: {
        "3xl": "2560px",
        "4k": "3840px",
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
