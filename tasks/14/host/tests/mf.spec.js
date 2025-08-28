import { test, expect } from "@playwright/test";

const url = "http://localhost:3001";

test("mf render", async ({ page }) => {
  await page.goto(url);

  await page.waitForSelector("#header");
  await page.waitForSelector("#button");
  await page.waitForSelector("#footer");
});
