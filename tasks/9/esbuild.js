import esbuild from "esbuild";

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outdir: "dist/esbuild",
};

esbuild.build(options).catch(() => process.exit(1));
