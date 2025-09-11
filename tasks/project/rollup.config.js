import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

export default {
  input: './src/index.tsx',
  output: {
    dir: './dist/rollup/',
    format: 'esm'
  },

  plugins: [
    css(),
    nodeResolve(), 
    commonjs({
        transformMixedEsModules: true, extensions: [".tsx", ".ts", ".jsx", ".js"]
    }),
    typescript({
        tsconfig: "./tsconfig.json"
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    html({
        publicPath: "/rollup/",
        template: ({files, publicPath}) => {
        const scripts = (files.js || [])
            .map(({ fileName }) => `<script type="module" src="${publicPath}${fileName}"></script>`)
            .join("\n");
        const links = (files.css || [])
            .map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}">`)
            .join("\n");

            return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${links}
                ${scripts}
            </head>
            <body>
                <div id="root">
                </div>
            </body>
            </html>
          `
        },
        }),
  ]
};
