import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = env as unknown as {
    DB?: D1Database;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    RATE_LIMIT_SALT?: string;
  };
  return Response.json(
    {
      status: "ok",
      service: "blackwards-route-desk",
      model: runtime.OPENAI_MODEL || "gpt-5.6",
      liveReady: Boolean(runtime.DB && runtime.OPENAI_API_KEY && runtime.RATE_LIMIT_SALT),
      retention: "metadata-only",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
