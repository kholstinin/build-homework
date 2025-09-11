import fs from "node:fs/promises";
import path from "node:path";
import { test, expect } from "@playwright/test";

const url = "http://localhost:3000";

const filePath = path.resolve(process.cwd(), "./watch/arguments.cjs");
async function initialOutputFile() {
  const content = `const a = 5;
const b = 6;

module.exports = {
  a, b
}
`;

  await fs.writeFile(filePath, content);
}

async function newOutputFile() {
  const content = `const a = 10;
const b = 15;

module.exports = {
  a, b
}
`;

  await fs.writeFile(filePath, content);
}

test("page rendered without error", async ({ page }) => {
  await initialOutputFile();

  const consoleMessages = [];

  page.on("console", (message) => {
    if (message.type() === "log") {
      consoleMessages.push(message.text());
    }
  });

  await page.goto(url);

  expect(consoleMessages).toEqual(["11"]);

  await page.waitForTimeout(1000);
  await newOutputFile();
  await page.waitForTimeout(1000);

  await page.reload();

  expect(consoleMessages).toEqual(["11", "25"]);
});
