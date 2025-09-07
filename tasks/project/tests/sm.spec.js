import path from "node:path";
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ["webpack", "rollup", "esbuild", "vite"];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} all assets has hidden sourcemaps`, async ({ page }) => {
    const assets = [];

    page.on("response", async (response) => {
      const url = response.url();

      if (
        url.endsWith(".js") ||
        (!["vite", "rollup"].includes(bundlerName) && url.endsWith(".css"))
      ) {
        assets.push(url);
      }
    });

    await page.goto(`${baseUrl}/${bundlerName}/index.html`);

    expect(assets.length).toBeGreaterThan(0);

    for (const assetUrl of assets) {
      const assetResponse = await page.request.get(assetUrl);
      expect(assetResponse.ok()).toBeTruthy();

      const code = await assetResponse.text();

      const filename = path.basename(assetUrl);

      expect(code.includes(`sourceMappingURL=${filename}.map`)).toBeFalsy();

      const mapURL = `${assetUrl}.map`;

      const mapResponse = await page.request.get(mapURL);
      expect(mapResponse.ok()).toBeTruthy();

      const mapJson = await mapResponse.json();
      expect(mapJson).toHaveProperty("version");
      expect(mapJson).toHaveProperty("sources");
    }
  });
});
