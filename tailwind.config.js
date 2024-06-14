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
          DEFAULT: "#48B4EA",
          light: "#7CCBF2", // Lighter shade of #48B4EA
          dark: "#2E8EC3", // Darker shade of #48B4EA
        },
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
