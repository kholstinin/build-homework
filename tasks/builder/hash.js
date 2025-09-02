import fs from "node:fs";

import { bundle } from "./bundle.js";

const output = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
// TODO: hash from content in filename
fs.writeFileSync(`./dist/main.js`, output);
