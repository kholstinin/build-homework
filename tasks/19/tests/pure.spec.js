import { test } from "@playwright/test";

test("page render without build", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");

  const text = await page.waitForSelector("#text");

  test
    .expect(await text.textContent())
    .toEqual("hello from native esm with react");
});
