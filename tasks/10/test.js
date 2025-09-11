import assert from "node:assert";
import { describe, test } from "node:test";

import {
  initialOutput,
  outputConst,
  outputData,
  outputIndex,
  removeOutput,
} from "./utils.js";

import { getLog, subscribe, unsubscribe } from "./watch.js";

describe("watch files", () => {
  test("should correctly log all changed files", async () => {
    const expectedFiles = await initialOutput();

    await subscribe();

    await outputIndex();
    await outputData();
    await outputConst();

    unsubscribe();
    await removeOutput();

    assert.deepEqual(getLog(), expectedFiles);
  });
});
