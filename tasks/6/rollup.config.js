export default {
  input: {
    entry: "./src/entry.js",
    performance: "./src/performance.js"
  },
  output: {
    dir: './dist/rollup/',
    format: 'esm',
  },
};
