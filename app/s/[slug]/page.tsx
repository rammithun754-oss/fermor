import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenarioBySlug } from "@/lib/db";
import { formatINR } from "@/lib/calc";
import { ArrowLeft, Check, Copy, Share2 } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const scenario = await getScenarioBySlug(params.slug);
  if (!scenario) {
    return {
      title: "Working Not Found — Fermor",
    };
  }

  const calcTitle =
    scenario.calculator === "sip"
      ? "SIP Compounding Working"
      : scenario.calculator === "emi"
      ? "Loan EMI Calculation Tape"
      : "In-Hand Salary Breakdown";

  return {
    title: `${calcTitle} — Fermor Worked Receipt`,
    description: `Worked arithmetic for ${calcTitle} on Fermor. Open math with no login wall.`,
    openGraph: {
      title: `${calcTitle} — Fermor`,
      description: `Worked answer receipt for ${scenario.slug}.`,
    },
  };
}

export default async function SharedWorkingPage({ params }: Props) {
  const scenario = await getScenarioBySlug(params.slug);

  if (!scenario) {
    notFound();
  }

  const result = scenario.result as any;
  const tape = result?.calculationTape || [];

  return (
    <main className="min-h-screen bg-paper text-ink font-sans p-4 md:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fermor Calculators
        </Link>

        {/* Read-Only Tape Container */}
        <div className="bg-white border border-rule rounded-none shadow-none p-6 md:p-8 space-y-6 font-mono text-sm relative">
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-graphite font-sans font-bold">
                Fermor Worked Answer Receipt
              </div>
              <h1 className="text-xl font-bold font-sans text-ink mt-1">
                {scenario.calculator === "sip"
                  ? "SIP Investment Working"
                  : scenario.calculator === "emi"
                  ? "Loan EMI Calculation"
                  : "Salary Take-Home Math"}
              </h1>
            </div>
            <div className="text-xs bg-paper border border-rule px-3 py-1 font-mono text-graphite">
              ID: {scenario.slug}
            </div>
          </div>

          <div className="text-xs text-graphite font-sans">
            Calculated on {new Date(scenario.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })} • Open Arithmetic Methodology
          </div>

          {/* Tape Steps */}
          <div className="divide-y divide-dashed divide-rule py-2">
            {tape.map((step: any) => (
              <div
                key={step.step}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="text-xs text-graphite mr-2">[{String(step.step).padStart(2, "0")}]</span>
                  <span className="font-sans font-medium">{step.label}</span>
                  <div className="text-xs text-graphite">{step.formulaText}</div>
                </div>
                <div className="font-bold text-base text-right tabular-nums text-ink">
                  {step.formattedValue}
                </div>
              </div>
            ))}
          </div>

          {/* Double-ruled Summary Total */}
          <div className="border-t-4 border-double border-ink pt-4 flex items-center justify-between font-sans">
            <div>
              <div className="text-xs text-graphite uppercase tracking-wider">Final Output</div>
              <div className="font-bold text-lg text-ink">
                {scenario.calculator === "sip"
                  ? formatINR(result.futureValue)
                  : scenario.calculator === "emi"
                  ? `${formatINR(result.monthlyEmi)} / mo`
                  : `${formatINR(result.monthlyInHand)} / mo`}
              </div>
            </div>
            <div className="text-xs bg-fermor-green px-3 py-1 font-bold text-ink border border-ink">
              VERIFIED WORKED ANSWER
            </div>
          </div>

          <div className="text-xs text-graphite font-sans italic border-t border-rule pt-4">
            Illustrative calculation based on user inputs. Not investment or legal tax advice.
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-ink text-paper p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg text-fermor-green font-bold">
              Want to run your own numbers?
            </h3>
            <p className="text-xs text-rule font-sans mt-1">
              Fermor offers free calculators with zero login wall and 100% open formulas.
            </p>
          </div>
          <Link
            href="/"
            className="bg-fermor-green text-ink font-bold px-5 py-2.5 text-sm hover:opacity-95 transition-opacity whitespace-nowrap"
          >
            Open Calculator
          </Link>
        </div>
      </div>
    </main>
  );
}
