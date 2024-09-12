// tailwind.config.js
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#945c39",
        },
        text: {
          DEFAULT: "#000000",
          secondary: "#4A4A4A",
        },
        lightBeige: "#fee9d6",
        beige: "#d1a47b",
        brown: "#945c39",
        white: "#ffffff",
        black: "#000000",
      },
      fontSize: {
        // Font sizes with line height calculated as 1.3 times the body font size
        body: ["16px", { lineHeight: "20.8px" }],       // Body text
        subheading: ["26px", { lineHeight: "33.8px" }], // 26px * 1.3
        heading: ["41px", { lineHeight: "53.3px" }],    // 41px * 1.3
        xs: ["14px", { lineHeight: "18.2px" }],         // 14px * 1.3
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      fontWeight: {
        heading: "600",
        subheading: "500",
        body: "400",
      },
      // spacing: {
      //   // Define spacing based on 1.3 times the body font size (16px * 1.3 = 20.8px)
      //   '1': '20.8px',  // 1x spacing
      //   '2': '41.6px',  // 2x spacing
      //   '3': '62.4px',  // 3x spacing
      //   '4': '83.2px',  // 4x spacing
      //   '5': '104px',   // 5x spacing
      //   '6': '124.8px', // 6x spacing
      //   '8': '166.4px', // 8x spacing
      //   '10': '208px',  // 10x spacing
      //   '12': '249.6px',// 12x spacing
      //   '16': '332.8px',// 16x spacing
      //   '20': '416px',  // 20x spacing
      // },
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
