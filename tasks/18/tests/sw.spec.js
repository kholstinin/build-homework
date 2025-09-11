import { test, expect } from "@playwright/test";

test("page loading without internet", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");

  const swRegistration = await page.evaluate(() =>
    navigator.serviceWorker.ready.then(() => true).catch(() => false)
  );
  expect(swRegistration).toBeTruthy();

  await page.waitForTimeout(1000);

  await context.setOffline(true);

  await page.goto("http://localhost:3000/");

  const root = page.locator("#root");
  await expect(root).toBeVisible();

  await expect(await root.textContent()).toBe('JavaScript is working');
});
