import fs from "node:fs/promises";
import assert from "node:assert";
import { createRequire } from "node:module";
import { describe, test } from "node:test";

const require = createRequire(import.meta.dirname);

const notExporterError = "ERR_PACKAGE_PATH_NOT_EXPORTED";

describe("should correctly build library", () => {
  test("should correctly build library", async () => {
    const { add } = await import("library");

    assert.equal(add(3, 5), 8);
  });

  test("should disallow import from internal files", async () => {
    try {
      const { add } = await import("library/lib/utils/add.js");

      assert.equal(add(3, 5), 8);
    } catch (err) {
      assert.ok(err.code === notExporterError);
    }
  });

  test("should disallow require from internal files", async () => {
    try {
      const { add } = await import("library/lib/utils/add.js");

      assert.equal(add(3, 5), 8);
    } catch (err) {
      assert.ok(err.code === notExporterError);
    }
  });

  test("should correctly require cjs", () => {
    const { add } = require("library");

    assert.equal(add(3, 5), 8);
  });

  test("should correctly import package.json", async () => {
    const packageJson = await import("library/package.json", {
      with: { type: "json" },
    });

    assert.equal(typeof packageJson, "object");
  });

  test("should disallow require package.json", async () => {
    try {
      const packageJson = require("library/package.json");

      assert.equal(typeof packageJson, "object");
    } catch (err) {
      assert.ok(err.code === notExporterError);
    }
  });

  test("should export types", async () => {
    const typesPath = require.resolve("library/types");
    const types = await fs.readFile(typesPath, "utf-8");

    assert.deepEqual(types.replaceAll(/\r/g, "").split("\n").filter(Boolean), [
      "export declare const add: (a: number, b: number) => number;",
      "export declare const mul: (a: number, b: number) => number;",
      "export declare const sub: (a: number, b: number) => number;",
      "export { }",
    ]);
  });
});
