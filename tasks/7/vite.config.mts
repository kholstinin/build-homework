import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  publicDir: "assets",
  build: {
    outDir: "dist/vite",
    assetsInlineLimit: 4 * 1024,
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
