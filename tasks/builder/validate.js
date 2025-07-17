import fs from "node:fs";

import { parse } from "acorn";
import { walk } from "estree-walker";
import { generate } from 'astring';

const source = fs.readFileSync("./dist/main.js", "utf-8");

const ast = parse(source, { ecmaVersion: 2020 });

const errors = [];

walk(ast, {
  enter(node) {
    if (node.type === "VariableDeclaration") {
      if (node.kind !== 'var') {
        errors.push(`Found wrong declaration: ${generate(node)}`)
      }
    }
  },
});

if (errors.length !== 0) {
  console.error(errors.join('\n'));
} else {
  console.log('Success!');
}
