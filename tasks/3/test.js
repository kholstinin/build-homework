import fs from "node:fs";
import path from "node:path";
import { resolve } from "./resolve.js";
import assert from "node:assert";
import { describe, test } from "node:test";

const parentPath = path.resolve("./src/page/home.js");

describe("should correctly resolve paths", () => {
  test("existing paths", () => {
    assert.equal(
      checkPath(resolve("../components/button/index.js", parentPath)),
      true
    );
    assert.equal(
      checkPath(resolve("../components/button/index", parentPath)),
      true
    );
    assert.equal(checkPath(resolve("../components/header", parentPath)), true);
  });

  test("not existing paths", () => {
    assert.equal(
      checkPath(resolve("../components/header/index.js", parentPath)),
      null
    );
    assert.equal(
      checkPath(resolve("../components/modal/index", parentPath)),
      null
    );
    assert.equal(checkPath(resolve("../button/index.ts", parentPath)), null);
  });

  test("extensions priority", () => {
    assert.equal(checkPath(resolve("../utils/data", parentPath), ".ts"), true);
    assert.equal(
      checkPath(resolve("../utils/data.json", parentPath), ".json"),
      true
    );
    assert.equal(checkPath(resolve("../page/home", parentPath), ".js"), true);
  });

  test("paths with aliases", () => {
    assert.equal(
      checkPath(resolve("#components/button/index", parentPath)),
      true
    );
    assert.equal(
      checkPath(resolve("#components/button/index.js", parentPath)),
      true
    );
    assert.equal(
      checkPath(resolve("#components/button/index.json", parentPath)),
      null
    );
  });

  test("paths with invalid existing aliases", () => {
    assert.equal(checkPath(resolve("#utisl/math.js", parentPath)), null);
    assert.equal(
      checkPath(resolve("~components/button/index.js", parentPath)),
      null
    );
  });
});

function checkPath(resolvedPath, expectedExtension) {
  if (resolvedPath === null) {
    return null;
  }

  if (expectedExtension) {
    const extension = path.extname(resolvedPath);
    if (extension !== expectedExtension) {
      return null;
    }
  }

  try {
    fs.readFileSync(resolvedPath, "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}
