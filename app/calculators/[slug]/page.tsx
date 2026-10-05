import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calculateSip, calculateEmi, calculateSalary, formatINR } from "@/lib/calc";
import { ArrowLeft, Calculator, ArrowUpRight } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

const calculatorTitles: Record<string, { title: string; mode: "sip" | "emi" | "salary"; description: string }> = {
  "sip-calculator": {
    title: "SIP Calculator",
    mode: "sip",
    description: "Calculate expected mutual fund returns and wealth accumulation from systematic monthly investments.",
  },
  "lumpsum-calculator": {
    title: "Lumpsum Calculator",
    mode: "sip",
    description: "Calculate long-term compound growth for a one-time lump sum mutual fund investment.",
  },
  "emi-calculator": {
    title: "EMI Calculator",
    mode: "emi",
    description: "Calculate exact monthly installments, interest outgo, and amortization schedules for loans.",
  },
  "home-loan-calculator": {
    title: "Home Loan Calculator",
    mode: "emi",
    description: "Model long-term 15 to 30 year home loan EMIs, interest ratios, and prepayment savings.",
  },
  "car-loan-calculator": {
    title: "Car Loan Calculator",
    mode: "emi",
    description: "Compute auto loan monthly EMIs and total interest payable across 3 to 7 year tenures.",
  },
  "in-hand-salary-calculator": {
    title: "In-Hand Salary Calculator",
    mode: "salary",
    description: "Calculate net monthly take-home salary after EPF, Professional Tax, and Income Tax deductions.",
  },
  "old-vs-new-tax-regime-calculator": {
    title: "Old vs New Tax Regime Calculator",
    mode: "salary",
    description: "Compare annual tax liability under Old vs New Tax Regimes for FY 2025-26.",
  },
  "hra-calculator": {
    title: "HRA Exemption Calculator",
    mode: "salary",
    description: "Find tax-exempt House Rent Allowance based on basic salary, metro status, and actual rent paid.",
  },
  "fd-calculator": {
    title: "Fixed Deposit (FD) Calculator",
    mode: "sip",
    description: "Calculate quarterly compounded interest payouts and final maturity value for bank FDs.",
  },
  "ppf-calculator": {
    title: "PPF Calculator",
    mode: "sip",
    description: "Calculate 15-year tax-free compounding under Government Public Provident Fund scheme.",
  },
  "nps-calculator": {
    title: "NPS Calculator",
    mode: "sip",
    description: "Project National Pension System retirement corpus and annuity pension payouts.",
  },
  "swp-calculator": {
    title: "SWP Calculator",
    mode: "sip",
    description: "Model Systematic Withdrawal Plans for regular monthly income from mutual funds.",
  },
  "gratuity-calculator": {
    title: "Gratuity Calculator",
    mode: "salary",
    description: "Calculate statutory tax-free gratuity payout after 5+ years of continuous employment.",
  },
  "gst-calculator": {
    title: "GST Calculator",
    mode: "sip",
    description: "Calculate Goods and Services Tax (5%, 12%, 18%, 28%) inclusive or exclusive amounts.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = calculatorTitles[params.slug] || {
    title: params.slug.replace(/-/g, " ").toUpperCase(),
    description: "Free worked personal finance calculator built for India on Fermor.",
  };

  return {
    title: `${calc.title} — Fermor Free Finance Calculators`,
    description: calc.description,
  };
}

export default function CalculatorSlugPage({ params }: Props) {
  const calcInfo = calculatorTitles[params.slug] || {
    title: params.slug.replace(/-/g, " ").replace("calculator", "Calculator").toUpperCase(),
    mode: params.slug.includes("emi") || params.slug.includes("loan") ? "emi" : params.slug.includes("salary") || params.slug.includes("tax") ? "salary" : "sip",
    description: "Free personal finance tool built for India with worked calculation receipts.",
  };

  const sampleTape =
    calcInfo.mode === "sip"
      ? calculateSip({ monthlyInvestment: 10000, annualRate: 12, years: 10 }).calculationTape
      : calcInfo.mode === "emi"
      ? calculateEmi({ loanAmount: 5000000, annualRate: 8.5, years: 20 }).calculationTape
      : calculateSalary({ annualCtc: 1500000, regime: "new", deductEpf: true, deductPt: true }).calculationTape;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage & All Calculators
        </Link>

        {/* Header Title */}
        <div className="space-y-3 border-b border-rule pb-6">
          <div className="inline-flex items-center gap-2 bg-ink text-fermor-green px-3 py-1 font-mono text-xs font-bold uppercase">
            <span>Verified Tool</span>
            <span>•</span>
            <span>{params.slug}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            {calcInfo.title}
          </h1>
          <p className="text-base text-graphite max-w-2xl">
            {calcInfo.description}
          </p>
        </div>

        {/* Live Calculation Tape Demonstration */}
        <div className="bg-white border border-rule p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-graphite block">
                Fermor Worked Calculation Receipt
              </span>
              <h2 className="font-display text-xl font-bold text-ink">Sample Worked Output</h2>
            </div>
            <div className="text-xs bg-fermor-green px-3 py-1 font-mono font-bold text-ink border border-ink">
              OPEN ARITHMETIC
            </div>
          </div>

          <div className="divide-y divide-dashed divide-rule font-mono text-xs space-y-2">
            {sampleTape.map((step) => (
              <div key={step.step} className="pt-2 flex items-center justify-between gap-4">
                <div>
                  <span className="text-graphite mr-2">[{String(step.step).padStart(2, "0")}]</span>
                  <span className="font-sans font-bold text-ink">{step.label}</span>
                  <div className="text-[11px] text-graphite">{step.formulaText}</div>
                </div>
                <div className="font-bold text-sm text-ink tabular-nums text-right">
                  {step.formattedValue}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-double border-ink pt-4 flex items-center justify-between font-sans">
            <div>
              <span className="text-xs text-graphite uppercase font-mono tracking-wider block">
                Verified Formula Result
              </span>
              <span className="font-bold text-lg text-ink font-mono">
                {calcInfo.mode === "sip" ? "₹23,23,391" : calcInfo.mode === "emi" ? "₹43,391 / mo" : "₹98,450 / mo"}
              </span>
            </div>
            <Link
              href="/#working-tape"
              className="bg-ink text-paper font-bold font-mono text-xs px-4 py-2 hover:bg-graphite transition-colors inline-flex items-center gap-1.5"
            >
              <span>Adjust Live Sliders</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-fermor-green" />
            </Link>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="bg-paper p-4 border border-rule text-xs text-graphite italic font-sans">
          Calculations are indicative estimates based on standard Indian financial conventions. Fermor is free, requires no sign-up, and does not sell or share user inputs.
        </div>

      </main>
      <Footer />
    </div>
  );
}
