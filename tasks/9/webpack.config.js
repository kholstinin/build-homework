import path from "node:path";

const config = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    library: {
      type: 'module'
    },
    path: path.resolve(import.meta.dirname, "dist/webpack"),
  },
  experiments: {
    outputModule: true
  }
};

export default config;
