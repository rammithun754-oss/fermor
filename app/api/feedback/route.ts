import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveFeedback } from "@/lib/db";

const FeedbackSchema = z.object({
  scenarioSlug: z.string().optional(),
  helpful: z.boolean(),
  note: z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid feedback payload." },
        { status: 400 }
      );
    }

    const { scenarioSlug, helpful, note } = parsed.data;
    await saveFeedback(scenarioSlug, helpful, note);

    return NextResponse.json({
      success: true,
      message: "Thank you for helping us improve Fermor's calculators!",
    });
  } catch (err) {
    console.error("Feedback route error:", err);
    return NextResponse.json(
      { error: "Failed to record feedback." },
      { status: 500 }
    );
  }
}
