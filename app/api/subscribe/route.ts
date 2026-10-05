import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveSubscriber } from "@/lib/db";

const SubscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  source: z.string().optional().default("homepage"),
  honeypot: z.string().optional().default(""), // must be empty
});

// Simple in-memory sliding window rate limiter per IP (max 5 req/min)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxReqs) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = SubscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid email address." },
        { status: 400 }
      );
    }

    const { email, source, honeypot } = parsed.data;

    // Honeypot check: silent return for bot submissions
    if (honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Subscription recorded successfully.",
      });
    }

    const res = await saveSubscriber(email, source);

    if (res.isDuplicate) {
      return NextResponse.json({
        success: true,
        message: "You're already on our update list! We'll notify you when new calculators launch.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Success! We'll email you when new Fermor calculators launch.",
    });
  } catch (err) {
    console.error("Subscription endpoint error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
