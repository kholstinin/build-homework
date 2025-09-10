import esbuild from "esbuild";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import postCSSPlugin from "esbuild-postcss-plugin";

const options = {
  
};

esbuild.build(options).catch(() => process.exit(1));
