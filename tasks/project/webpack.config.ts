import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: Configuration = {
  entry: "./src/index.tsx", // path.resolve(import.meta.dirname, "./src/index.tsx"),
  mode:  process.env.NODE_ENV === 'development' ? 'development'  : 'production',
  target: ["web"],
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "swc-loader",
          options: {
            "jsc": {
              "parser": {
                "syntax": "typescript",
                "tsx": true,
              },
              transform: {
                react: {
                  runtime: "automatic", 
                  importSource: "react",
                },
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json" ,
      }),
    ],
  },
  output: {
    path: path.resolve(import.meta.dirname, `./dist/webpack/`),
    publicPath: "/webpack/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent:`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>My App</title>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
      `,
    }),
  ],
};

export default config;
