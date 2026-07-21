import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";

const port = 4179;
const baseUrl = `http://localhost:${port}`;
let server;
let serverOutput = "";

before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/vinext/dist/cli.js", "dev", "--port", String(port)],
    { cwd: new URL("../", import.meta.url), env: process.env, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Vinext test server did not start.\n${serverOutput}`);
});

after(() => {
  if (server && !server.killed) server.kill();
});

test("server-renders the complete Route Desk", async () => {
  const response = await fetch(baseUrl, { headers: { accept: "text/html" } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Auntie AI: Blackwards Route Desk(?: · Auntie AI)?<\/title>/i);
  assert.match(html, /Read the route before your work moves\./);
  assert.match(html, /Build route packet/);
  assert.match(html, /The worldwide exhibition/);
  assert.match(html, /No account\. No retention\./);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("health route reports a contained not-yet-live state without secrets", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.service, "blackwards-route-desk");
  assert.equal(payload.model, "gpt-5.6");
  assert.equal(payload.liveReady, false);
  assert.equal(payload.retention, "metadata-only");
});

test("live route fails truthfully when server secrets are unavailable", async () => {
  const response = await fetch(`${baseUrl}/api/route`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      routeType: "opportunity",
      summary: "A campaign offers a fee but asks for permanent exclusive rights and does not explain creator credit or approval terms.",
      compensation: "paid",
      rights: "exclusive",
      credit: "unclear",
      audienceAccess: "limited",
      urgency: "normal",
    }),
  });
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.equal(payload.error, "service_not_ready");
  assert.match(payload.message, /verified sample packets remain available/i);
});
