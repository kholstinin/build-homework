import esbuild from "esbuild";
import path from "node:path";
// import { type BuildOptions } from 'esbuild'

//: BuildOptions
const options = {
  bundle: true,
  entryPoints: {
    entry: "./src/entry.js",
    performance: "./src/performance.js"
  },
  outdir: path.resolve(import.meta.dirname, `./dist/esbuild/`),
//   resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
  publicPath: "/esbuild/",
};

esbuild.build(options).catch(() => process.exit(1));
