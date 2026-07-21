import { createHash } from "node:crypto";

const baseURL = process.env.LIVE_BASE_URL || "https://blackwards-route-desk.indigo-iris-5804.chatgpt.site";

const healthResponse = await fetch(`${baseURL}/api/health`);
const health = await healthResponse.json();
if (!healthResponse.ok || health.liveReady !== true) {
  throw new Error("The public route service is not live-ready.");
}

const routeResponse = await fetch(`${baseURL}/api/route`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    routeType: "partnership",
    summary: "A gallery offers a six-month nonexclusive license, a named fee, named credit, no audience export, and a normal review period before files move.",
    compensation: "paid",
    rights: "nonexclusive",
    credit: "named",
    audienceAccess: "none",
    urgency: "normal",
  }),
});
const responseText = await routeResponse.text();
const packet = JSON.parse(responseText);

if (!routeResponse.ok) throw new Error(packet.message || `Live route returned ${routeResponse.status}.`);
if (packet.source !== "live" || packet.model !== "gpt-5.6") {
  throw new Error("The public route did not return a live GPT-5.6 packet.");
}

console.log(JSON.stringify({
  health: health.status,
  liveReady: health.liveReady,
  retention: health.retention,
  httpStatus: routeResponse.status,
  source: packet.source,
  model: packet.model,
  verdict: packet.verdict,
  routeId: packet.routeId,
  quotaRemaining: packet.quota?.actorRemaining,
  responseSha256: createHash("sha256").update(responseText).digest("hex"),
}, null, 2));
