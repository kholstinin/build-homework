import fs from "node:fs";
import assert from 'node:assert';
import { describe } from "node:test";

const expected = `var a = 5;
var b = 10;
var c = a + b;
console.log(c);`

describe("should transofrm let and const into var", () => {
  const actual = fs.readFileSync('./result.js', 'utf-8');

  assert.equal(actual.trim(), expected.trim());
});
