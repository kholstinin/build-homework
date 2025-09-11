import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config = {
  entry: "./src/main.tsx",
  mode: "production",
  // TODO
  devtool: false,
  experiments: {
    css: true,
  },
};

export default config;
