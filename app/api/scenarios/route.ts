import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { calculateSip, calculateEmi, calculateSalary } from "@/lib/calc";
import { saveScenario } from "@/lib/db";

const SipSchema = z.object({
  calculator: z.literal("sip"),
  inputs: z.object({
    monthlyInvestment: z.number().min(100).max(1000000),
    annualRate: z.number().min(1).max(30),
    years: z.number().min(1).max(40),
  }),
});

const EmiSchema = z.object({
  calculator: z.literal("emi"),
  inputs: z.object({
    loanAmount: z.number().min(10000).max(100000000),
    annualRate: z.number().min(1).max(25),
    years: z.number().min(1).max(35),
  }),
});

const SalarySchema = z.object({
  calculator: z.literal("salary"),
  inputs: z.object({
    annualCtc: z.number().min(100000).max(100000000),
    regime: z.enum(["new", "old"]),
    deductEpf: z.boolean(),
    deductPt: z.boolean(),
  }),
});

const RequestSchema = z.discriminatedUnion("calculator", [
  SipSchema,
  EmiSchema,
  SalarySchema,
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid inputs provided.", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { calculator, inputs } = parsed.data;
    let result: any = null;

    if (calculator === "sip") {
      result = calculateSip(inputs);
    } else if (calculator === "emi") {
      result = calculateEmi(inputs);
    } else if (calculator === "salary") {
      result = calculateSalary(inputs);
    }

    const slug = nanoid(8);
    const saved = await saveScenario(slug, calculator, inputs, result);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const shareUrl = `${baseUrl}/s/${slug}`;

    return NextResponse.json({
      success: true,
      slug,
      url: shareUrl,
      calculator,
      inputs,
      result,
      isSavedToDb: saved.isSavedToDb,
    });
  } catch (err: any) {
    console.error("Error creating scenario:", err);
    return NextResponse.json(
      { error: "Internal server error calculating scenario." },
      { status: 500 }
    );
  }
}
