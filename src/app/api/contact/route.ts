import { NextResponse } from "next/server";
import { contactSchema } from "@/components/forms/contact-schema";

/*
 * Contact endpoint.
 * - Honeypot is checked before validation so bots receive a normal success response.
 * - Valid submissions are POSTed as JSON to CONTACT_WEBHOOK_URL (CRM intake, Slack, Zapier…).
 *   If the variable is not set, the submission is only logged — set it before launch.
 * - The rate limit is per server instance; use a shared store (e.g. Upstash, Vercel KV) in production.
 */

const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  e.count += 1;
  return e.count > MAX;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "The request could not be read." }, { status: 400 });
  }

  if (typeof body?.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Some fields need attention.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const data = { ...parsed.data };
  delete data.website;
  const payload = { ...data, source: "gridsync.build/contact", receivedAt: new Date().toISOString() };

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (e) {
      console.error("[contact] webhook failed", e);
      return NextResponse.json({ message: "We could not record your message." }, { status: 502 });
    }
  } else {
    console.info("[contact] CONTACT_WEBHOOK_URL not set; submission received from", data.company);
  }

  return NextResponse.json({ ok: true });
}
