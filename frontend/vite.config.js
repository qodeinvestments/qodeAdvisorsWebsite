import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Set output directory to 'build' instead of 'dist'
  },
  base: "/", // Ensure paths are relative to the index.html
});
