import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ['webpack', 'esbuild', 'vite', 'rollup'];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} render`, async ({ page }) => {
    const url = `${baseUrl}/${bundlerName}/index.html`;
    await page.goto(url);

    const externalImages = [
      { selector: "#avatar", path: "avatar.svg" },
      { selector: "#illustration", path: "illustration.png" },
    ];

    for (const image of externalImages) {
      await page.waitForSelector(image.selector);
      const imageElement = await page.locator(image.selector);
      expect(await imageElement.getAttribute("src")).toBe(
        `${baseUrl}/${bundlerName}/assets/${image.path}`
      );
    }

    const inlineImages = [
      { selector: "#logo", path: "logo.svg" },
      { selector: "#ad", path: "ad.inline.svg" },
    ];

    for (const image of inlineImages) {
      await page.waitForSelector(image.selector);
      const imageElement = await page.locator(image.selector);
      const srcAttr = await imageElement.getAttribute("src");
      expect(srcAttr.startsWith("data:image/svg+xml")).toBeTruthy();
    }

    const template = await page.evaluate(() => {
      return window.template;
    });
    expect(template.trim()).toEqual(`<h2><%= title %></h2>
<h3>Logo inline</h3>
<img id="logo" width="100px" src="<%= logoPath %>">
<h3>Ad inline</h3>
<img id="ad" width="100px" src="<%= adInline %>">
<h3>Illustration external</h3>
<img id="illustration" width="100px" src="<%= illustrationPath %>">
<h3>Avatar external</h3>
<img id="avatar" width="100px" src="<%= avatarInline %>">`);

    const data = await page.evaluate(() => {
      return window.data;
    });
    expect(JSON.parse(data)).toEqual({ title: "homework-7" });
  });
});
