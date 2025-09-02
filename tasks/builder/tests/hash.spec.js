import path from "node:path";
import fg from "fast-glob";
import { test, expect } from "@playwright/test";

test("generate output file with hash", async () => {
  const files = fg.sync("./dist/*");

  expect(
    files.some((filepath) => /main\.[0-9A-Za-z-]{6}\.js/.test(path.basename(filepath)))
  ).toBeTruthy();
});
