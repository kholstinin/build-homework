import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  reporter: "list",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
  },
});
