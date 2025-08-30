import esbuild from "esbuild";
import path from "node:path";
import { type BuildOptions } from 'esbuild'
import { htmlPlugin }  from '@craftamap/esbuild-plugin-html';

const options: BuildOptions = {
  bundle: true,
  entryPoints: ["./src/index.tsx"],
  outdir: path.resolve(import.meta.dirname, `./dist/esbuild/`),
  resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
  publicPath: "/esbuild/",
  tsconfig: "./tsconfig.json",
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: [
            "src/index.tsx",
          ],
          filename: 'index.html',
          htmlTemplate: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="root">
                </div>
            </body>
            </html>
          `,
        },
      ]
    })
  ]
};

esbuild.build(options).catch(() => process.exit(1));
