import { defineConfig } from "vite";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: "/vite/",
  plugins: [tsconfigPaths()],
  build: {
    outDir: path.resolve(import.meta.dirname, `./dist/vite/`),
  },
});
