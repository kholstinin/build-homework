import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  base: "/vite/",
  build: {
    outDir: path.resolve(import.meta.dirname, `./dist/vite/`),
    minify: false,
    rollupOptions: {
        input: {
            entry: path.resolve(import.meta.dirname, "./src/entry.js"),
            performance: path.resolve(import.meta.dirname, "./src/performance.js"),
        },
        output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        }
    }
  },
});
