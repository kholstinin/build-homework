// @ts-check
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ["webpack", "rollup", "esbuild", "vite"];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} todo render`, async ({ page }) => {
    const url = `${baseUrl}/${bundlerName}/index.html`;
    const consoleErrors = [];
    const consoleMessages = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }

      if (message.type() === "log") {
        consoleMessages.push(message.text());
      }
    });

    await page.goto(url);

    const body = await page.locator("body");
    expect(await body.textContent()).toBe("hello world");

    expect(consoleErrors).toEqual([]);
    expect(consoleMessages).toEqual(['call metric']);
  });
});
