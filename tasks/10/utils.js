import path from "node:path";
import fs from "node:fs/promises";

const getIndexPath = () => `./src/index0${Math.random().toFixed(2)}.js`;
const getDataPath = () => `./src/data0${Math.random().toFixed(2)}.json`;
const getConstPath = () => `./src/const0${Math.random().toFixed(2)}.js`;

let indexPath;
let dataPath;
let constPath;

export async function initialOutput() {
  await fs.mkdir("./src", { recursive: true });

  indexPath = getIndexPath();
  dataPath = getDataPath();
  constPath = getConstPath();

  await fs.writeFile(
    indexPath,
    `import { a, b } from "./const.js";
  
function sum() {
  return a + b;
}
`
  );

  await fs.writeFile(
    dataPath,
    `{
  "a": 5,
  "b": 10
}
`
  );

  await fs.writeFile(
    constPath,
    `export const a = 5;
export const b = 10;
`
  );

  return [indexPath, constPath].map((item) => item.slice(2));
}

export async function outputIndex() {
  await fs.writeFile(
    indexPath,
    `import { a, b } from "./const.js";
  
function add() {
  return a + b;
}
`
  );
}

export async function outputConst() {
  await fs.writeFile(
    constPath,
    `export const a = 10;
export const b = 8;
`
  );
}

export async function outputData() {
  await fs.writeFile(
    dataPath,
    `{
  "a": 10,
  "b": 8
}
`
  );
}

export async function removeOutput() {
  for (const filePath of [indexPath, dataPath, constPath]) {
    await fs.unlink(filePath);
  }
}
