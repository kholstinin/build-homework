import path from "node:path";

const config  = {
  mode:  process.env.NODE_ENV === 'development' ? 'development'  : 'production',
  target: ["web"],
  resolve: {
    extensions: [ ".js"],
  },
  entry: {
    entry: "./src/entry.js",
    performance: "./src/performance.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(import.meta.dirname, `./dist/webpack/`),
    publicPath: "/webpack/",
  },
};

export default config;
