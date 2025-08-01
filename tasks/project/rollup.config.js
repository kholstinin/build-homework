import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/rollup/index.js",
    format: "esm",
  },
  jsx: 'react-jsx',
  plugins: [
    nodeResolve({browser: true}),
    commonjs(),
    typescript(),
    css(),
    html({
      title: 'TODO App',
      publicPath: '/rollup/',
      template: ({files, publicPath, title}) => {
        return `
          <html>
            <head>
              <meta charset="utf-8">
              <title>${title}</title>
              ${files.css?.map(file => `<link rel="stylesheet" href="${publicPath}${file.fileName}">`).join('\n')}
            </head>
            <body>
              <div id="root"></div>
              ${files.js?.map(file => `<script type="module" src="${publicPath}${file.fileName}"></script>`).join('\n')}
            </body>
          </html>
        `
      },
    }),
  ],
};
