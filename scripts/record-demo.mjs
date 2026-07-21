import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.DEMO_BASE_URL || "https://blackwards-route-desk.indigo-iris-5804.chatgpt.site";
const outputDirectory = path.resolve("work/demo/raw");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  recordVideo: { dir: outputDirectory, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();

async function hold(milliseconds) {
  await page.waitForTimeout(milliseconds);
}

async function show(locator, milliseconds = 5000) {
  await locator.scrollIntoViewIfNeeded();
  await hold(milliseconds);
}

async function choose(label) {
  await page.getByText(label, { exact: true }).last().click();
}

await page.goto(baseURL, { waitUntil: "networkidle" });
await page.locator('main[data-hydrated="true"]').waitFor();
await hold(9000);

await show(page.locator("#route-composer"), 7000);
await choose("Partnership");
await page.getByLabel("2. Name what is being offered and asked").fill(
  "A global exhibition wants finished files, permanent exclusive rights, shared credit, audience export, and gives no clear fee before a same-day deadline.",
);
await show(page.getByText("3. Mark the visible terms"), 7000);
await page.getByLabel("Compensation").selectOption("unpaid");
await page.getByLabel("Rights").selectOption("transfer");
await page.getByLabel("Credit").selectOption("shared");
await page.getByLabel("Audience access").selectOption("export");
await page.getByLabel("Urgency").selectOption("same_day");
await hold(6000);

await show(page.locator("#sample-title"), 4000);
await page.getByRole("button", { name: /The worldwide exhibition/ }).click();
await page.locator("#route-result").waitFor();
await hold(8000);

await show(page.getByRole("heading", { name: "What stays yours" }), 6000);
await show(page.getByRole("heading", { name: "Extraction signals" }), 6000);
await show(page.getByRole("heading", { name: "Questions before yes" }), 6000);
await show(page.getByText("24-hour move", { exact: true }), 7000);
await show(page.getByRole("heading", { name: "Receipt checklist" }), 6000);

await page.getByRole("button", { name: "Copy route packet" }).click();
await hold(4000);
await page.getByRole("button", { name: "Download route packet" }).click();
await hold(4000);

await show(page.locator("#sample-title"), 3000);
await page.getByRole("button", { name: /The accelerator data ask/ }).click();
await page.locator("#route-result").waitFor();
await hold(7000);
await show(page.getByText("Clarify", { exact: true }).last(), 6000);

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
await hold(9000);

const video = page.video();
await context.close();
await browser.close();

if (!video) throw new Error("Playwright did not create a demo recording.");
console.log(await video.path());
