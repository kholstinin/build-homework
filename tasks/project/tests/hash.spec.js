import path from "node:path";
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ["webpack", "rollup", "esbuild", "vite"];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} all assets has hash in name`, async ({ page }) => {
    const assets = [];

    page.on("response", async (response) => {
      const url = response.url();

      if (url.endsWith(".js") || url.endsWith(".css")) {
        assets.push(url);
      }
    });

    await page.goto(`${baseUrl}/${bundlerName}/index.html`);

    expect(assets.length).toBeGreaterThan(1);

    for (const assetUrl of assets) {
      const filename = path.basename(assetUrl);
      expect(/[0-9a-zA-Z]+_[0-9a-zA-Z-]{8}\.\w+/.test(filename)).toBeTruthy();
    }
  });
});
