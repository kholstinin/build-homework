// @ts-check
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:3000";

const bundlers = ['webpack', 'rollup', 'esbuild', 'vite'];

bundlers.forEach((bundlerName) => {
  test(`${bundlerName} todo render`, async ({ page }) => {
    const url = `${baseUrl}/${bundlerName}/index.html`;
    await page.goto(url);
    
    const todoText = 'Todo item';
  
    await page.waitForSelector('input[id="name"]');
    await page.fill('input[id="name"]', todoText);
    await page.click('button[type="submit"]');
  
    const todoItem = await page.locator('.todo-tag');
    expect(await todoItem.textContent()).toBe(todoText);
  });
})
