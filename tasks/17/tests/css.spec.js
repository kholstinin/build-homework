import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ["webpack", "esbuild", "vite", "rollup"];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} render`, async ({ page }) => {
    const assets = [];

    page.on("response", async (response) => {
      const url = response.url();

      if (url.endsWith(".css")) {
        assets.push(url);
      }
    });

    const url = `${baseUrl}/${bundlerName}/index.html`;
    await page.goto(url);

    const element = await page.locator("#button");
    const classList = await element.evaluate((el) => Array.from(el.classList));

    const className = classList[0];

    test.expect(/src-styles-module_.{5}$/.test(className)).toBeTruthy();
    test.expect(assets.length).toBe(1);
  });
});
