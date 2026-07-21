import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

test("complete synthetic route works without overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator('main[data-hydrated="true"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Read the route before your work moves." })).toBeVisible();
  await expect(page.getByRole("button", { name: /The worldwide exhibition/ })).toBeVisible();

  const initialOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(initialOverflow).toBeLessThanOrEqual(1);

  await page.getByRole("button", { name: /The worldwide exhibition/ }).click();
  await expect(page.getByText("Protect", { exact: true }).last()).toBeVisible();
  await expect(page.getByRole("heading", { name: "What stays yours" })).toBeVisible();
  await expect(page.getByText("Reply with a narrow nonexclusive license proposal", { exact: false })).toBeVisible();

  const resultOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(resultOverflow).toBeLessThanOrEqual(1);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download route packet" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^blackwards-route-.*\.md$/);

  const screenshotDirectory = path.resolve("qa-screenshots");
  await mkdir(screenshotDirectory, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotDirectory, `${testInfo.project.name}-route-packet.png`),
    fullPage: true,
  });
});

test("private contact data is rejected before a live call", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('main[data-hydrated="true"]')).toBeVisible();
  await page.getByLabel("2. Name what is being offered and asked").fill(
    "A campaign asks for permanent exclusive rights and says to contact founder@example.com before the offer expires today.",
  );
  await page.getByRole("button", { name: "Build route packet" }).click();
  await expect(page.getByRole("alert")).toContainText("Remove the email address");
});

test("health response exposes status but no secret values", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  expect(payload).toEqual({
    status: "ok",
    service: "blackwards-route-desk",
    model: "gpt-5.6",
    liveReady: false,
    retention: "metadata-only",
  });
  expect(JSON.stringify(payload)).not.toMatch(/sk-|RATE_LIMIT_SALT|OPENAI_API_KEY/);
});
