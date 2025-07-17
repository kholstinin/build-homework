import fs from "node:fs";
import { transformer } from "./transformer.js";
import * as astring from "astring";
import { parse } from "acorn";

// read file with source code

// get ast from source code

// transform ast

// convert ast to source code

// write source code to file
fs.writeFileSync("./result.js", result);
