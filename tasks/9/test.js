// TODO: вызвать все файлы и получить ожидаемый результат (экспортится функция, через jest)

import { getData as rollupGetData } from "./dist/rollup/main.js";
import { getData as webpackGetData } from "./dist/webpack/main.mjs";
import { getData as viteGetData } from "./dist/vite/index.js";
import { getData as esbuildGetData } from "./dist/esbuild/index.js";

const expectedData = { items: ["some", 56, "content"] };
const expectedTemplateData = { templateData: ["lorem", "ipsum", 5] };

const functions = [
  {
    bundler: "rollup",
    fn: rollupGetData,
  },
  {
    bundler: "webpack",
    fn: webpackGetData,
  },
  {
    bundler: "vite",
    fn: viteGetData,
  },
  {
    bundler: "esbuild",
    fn: esbuildGetData,
  },
];

functions.forEach(({bundler, fn}) => {
  test(`${bundler} get data`, () => {
    const { data, templateData } = fn();
    expect(data).toEqual(expectedData);
    expect(templateData).toEqual(expectedTemplateData);
  });
})
