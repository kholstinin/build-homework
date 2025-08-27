import fs from "node:fs";
import { transformer } from "./transformer.js";
import * as astring from "astring";
import { parse } from "acorn";

// read file with source code
const source = fs.readFileSync('./entry.js', 'utf-8')

// get ast from source code

const parsedAst = parse(source, {ecmaVersion: 2020, sourceType: 'module'})
// transform ast
transformer(parsedAst)
// convert ast to source code
const result = astring.generate(parsedAst)
// write source code to file
fs.writeFileSync("./result.js", result);
