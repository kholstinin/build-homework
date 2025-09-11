import fs from "node:fs";

import { bundle } from "./bundle.js";

const entryPath = process.argv[2];
const output = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
fs.writeFileSync(`./dist/main.js`, output);

// Реализуйте watch здесь
