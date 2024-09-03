import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        'section': '6rem', // Adjust this value as needed
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
        xs: ["0.75rem", { lineHeight: "1rem" }],    // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        md: ["1rem", { lineHeight: "1.5rem" }],      // 16px
        base: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        lg: ["1.15rem", { lineHeight: "1.75rem" }],  // 20px
        xl: ["1.25rem", { lineHeight: "2rem" }],      // 24px
        "2xl": ["1.75rem", { lineHeight: "2.25rem" }], // 28px
        "3xl": ["2rem", { lineHeight: "2.5rem" }],   // 32px
        "4xl": ["2.5rem", { lineHeight: "3rem" }],   // 40px
        "5xl": ["3rem", { lineHeight: "3.5rem" }],   // 48px
        "6xl": ["3.75rem", { lineHeight: "4rem" }],  // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }],      // 72px
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
