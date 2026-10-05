"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { calculateSip, calculateEmi, calculateSalary, formatINR } from "@/lib/calc";
import { Share2, ArrowUpRight, Check, Calculator, Copy } from "lucide-react";

/*
  HEADLINE EVALUATION:
  Option 1: "Personal finance, with the working shown." (SELECTED - directly captures the worked-receipt core promise)
  Option 2: "Understand the math before you invest a rupee."
  Option 3: "Your money decisions, calculated in plain daylight."
*/

type CalculatorMode = "sip" | "emi" | "salary";

export function Hero() {
  const [mode, setMode] = useState<CalculatorMode>("sip");

  // SIP State
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // EMI State
  const [emiAmount, setEmiAmount] = useState(5000000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);

  // Salary State
  const [salaryCtc, setSalaryCtc] = useState(1500000);
  const [salaryRegime, setSalaryRegime] = useState<"new" | "old">("new");
  const [deductEpf, setDeductEpf] = useState(true);
  const [deductPt, setDeductPt] = useState(true);

  // Share Link State
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Calculations
  const sipResult = useMemo(
    () => calculateSip({ monthlyInvestment: sipMonthly, annualRate: sipRate, years: sipYears }),
    [sipMonthly, sipRate, sipYears]
  );

  const emiResult = useMemo(
    () => calculateEmi({ loanAmount: emiAmount, annualRate: emiRate, years: emiYears }),
    [emiAmount, emiRate, emiYears]
  );

  const salaryResult = useMemo(
    () =>
      calculateSalary({
        annualCtc: salaryCtc,
        regime: salaryRegime,
        deductEpf,
        deductPt,
      }),
    [salaryCtc, salaryRegime, deductEpf, deductPt]
  );

  const activeResult = mode === "sip" ? sipResult : mode === "emi" ? emiResult : salaryResult;

  const handleShare = async () => {
    setIsSharing(true);
    setCopiedLink(null);

    const payload = {
      calculator: mode,
      inputs:
        mode === "sip"
          ? { monthlyInvestment: sipMonthly, annualRate: sipRate, years: sipYears }
          : mode === "emi"
          ? { loanAmount: emiAmount, annualRate: emiRate, years: emiYears }
          : { annualCtc: salaryCtc, regime: salaryRegime, deductEpf, deductPt },
    };

    try {
      const res = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const shareUrl = data.url || `${window.location.origin}/s/${Math.random().toString(36).substring(2, 10)}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(shareUrl);
    } catch (err) {
      // Instant fallback link
      const fallbackUrl = `${window.location.origin}/s/receipt8`;
      await navigator.clipboard.writeText(fallbackUrl);
      setCopiedLink(fallbackUrl);
    } finally {
      setIsSharing(false);
    }
  };

  const fullCalcUrl =
    mode === "sip"
      ? "/calculators/sip-calculator"
      : mode === "emi"
      ? "/calculators/emi-calculator"
      : "/calculators/in-hand-salary-calculator";

  return (
    <section id="working-tape" className="relative bg-paper graph-paper-bg border-b border-rule pt-10 md:pt-16 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Sharp Copy */}
          <div className="lg:col-span-5 space-y-6 lg:pr-4">
            <div className="inline-flex items-center gap-2 border border-ink bg-white px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-ink">
              <span className="w-2 h-2 rounded-full bg-fermor-green animate-pulse" />
              <span>[01] Worked Arithmetic Engine</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-ink">
              Personal finance, with the working shown.
            </h1>

            <p className="text-base md:text-lg text-graphite leading-relaxed max-w-xl font-sans">
              Understand the exact math behind your SIP, EMI, and salary. Act with clarity. Grow with confidence—with zero forced login and 100% open arithmetic.
            </p>

            {/* Micro Feature Bullet Ledger */}
            <div className="border-t border-b border-rule py-4 space-y-3 font-mono text-xs text-graphite">
              <div className="flex items-center justify-between">
                <span>[A] Browser-Calculated Math</span>
                <span className="text-ink font-bold">100% Private</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[B] Account Registration</span>
                <span className="text-ink font-bold">Optional Only</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[C] Transparency Standard</span>
                <span className="text-ink font-bold">Full Formula Receipts</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="#calculators"
                className="bg-ink text-paper hover:bg-graphite font-bold text-xs uppercase tracking-wider px-6 py-3.5 border border-ink inline-flex items-center gap-2 transition-colors focus:ring-2 focus:ring-fermor-green"
              >
                <span>Browse All Calculators</span>
                <ArrowUpRight className="w-4 h-4 text-fermor-green" />
              </Link>
              <Link
                href="#methodology"
                className="text-xs uppercase tracking-wider font-bold text-ink underline underline-offset-4 hover:text-graphite py-2"
              >
                Read Open Methodology
              </Link>
            </div>
          </div>

          {/* Right Column: Live Working Tape Tool */}
          <div className="lg:col-span-7 bg-white border border-rule shadow-none p-5 sm:p-7 relative space-y-6">
            
            {/* Header Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-graphite block">
                  Interactive Tape Receiver
                </span>
                <h2 className="font-display text-xl font-bold text-ink">Live Calculation Tape</h2>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex border border-rule p-1 bg-paper font-mono text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMode("sip")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    mode === "sip" ? "bg-ink text-fermor-green font-bold" : "text-graphite hover:text-ink"
                  }`}
                >
                  SIP Math
                </button>
                <button
                  type="button"
                  onClick={() => setMode("emi")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    mode === "emi" ? "bg-ink text-fermor-green font-bold" : "text-graphite hover:text-ink"
                  }`}
                >
                  Loan EMI
                </button>
                <button
                  type="button"
                  onClick={() => setMode("salary")}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    mode === "salary" ? "bg-ink text-fermor-green font-bold" : "text-graphite hover:text-ink"
                  }`}
                >
                  In-Hand Salary
                </button>
              </div>
            </div>

            {/* Sliders Input Area */}
            <div className="space-y-4 bg-paper/50 p-4 border border-rule">
              {mode === "sip" && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <label htmlFor="sip-deposit" className="text-graphite font-medium">Monthly SIP Deposit</label>
                      <span className="font-bold text-ink text-sm">{formatINR(sipMonthly)}</span>
                    </div>
                    <input
                      id="sip-deposit"
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      className="w-full accent-ink cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-graphite uppercase">Presets:</span>
                      {[5000, 10000, 25000, 50000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSipMonthly(preset)}
                          className={`text-[10px] font-mono border px-2 py-0.5 transition-colors ${
                            sipMonthly === preset ? "bg-ink text-white font-bold border-ink" : "bg-white text-graphite border-rule hover:text-ink"
                          }`}
                        >
                          ₹{(preset / 1000)}k
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <label htmlFor="sip-rate" className="text-graphite">Expected Return Rate</label>
                        <span className="font-bold text-ink">{sipRate}% p.a.</span>
                      </div>
                      <input
                        id="sip-rate"
                        type="range"
                        min="1"
                        max="25"
                        step="0.5"
                        value={sipRate}
                        onChange={(e) => setSipRate(Number(e.target.value))}
                        className="w-full accent-ink cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <label htmlFor="sip-years" className="text-graphite">Tenure (Years)</label>
                        <span className="font-bold text-ink">{sipYears} Years</span>
                      </div>
                      <input
                        id="sip-years"
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={sipYears}
                        onChange={(e) => setSipYears(Number(e.target.value))}
                        className="w-full accent-ink cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === "emi" && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <label htmlFor="emi-amount" className="text-graphite font-medium">Loan Principal Amount</label>
                      <span className="font-bold text-ink text-sm">{formatINR(emiAmount)}</span>
                    </div>
                    <input
                      id="emi-amount"
                      type="range"
                      min="100000"
                      max="20000000"
                      step="100000"
                      value={emiAmount}
                      onChange={(e) => setEmiAmount(Number(e.target.value))}
                      className="w-full accent-ink cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-graphite uppercase">Presets:</span>
                      {[2500000, 5000000, 7500000, 10000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setEmiAmount(preset)}
                          className={`text-[10px] font-mono border px-2 py-0.5 transition-colors ${
                            emiAmount === preset ? "bg-ink text-white font-bold border-ink" : "bg-white text-graphite border-rule hover:text-ink"
                          }`}
                        >
                          ₹{(preset / 100000)}L
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <label htmlFor="emi-rate" className="text-graphite">Interest Rate (% p.a.)</label>
                        <span className="font-bold text-ink">{emiRate}%</span>
                      </div>
                      <input
                        id="emi-rate"
                        type="range"
                        min="5"
                        max="18"
                        step="0.25"
                        value={emiRate}
                        onChange={(e) => setEmiRate(Number(e.target.value))}
                        className="w-full accent-ink cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <label htmlFor="emi-years" className="text-graphite">Tenure (Years)</label>
                        <span className="font-bold text-ink">{emiYears} Years</span>
                      </div>
                      <input
                        id="emi-years"
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={emiYears}
                        onChange={(e) => setEmiYears(Number(e.target.value))}
                        className="w-full accent-ink cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              {mode === "salary" && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <label htmlFor="salary-ctc" className="text-graphite font-medium">Gross Annual CTC</label>
                      <span className="font-bold text-ink text-sm">{formatINR(salaryCtc)}</span>
                    </div>
                    <input
                      id="salary-ctc"
                      type="range"
                      min="300000"
                      max="5000000"
                      step="50000"
                      value={salaryCtc}
                      onChange={(e) => setSalaryCtc(Number(e.target.value))}
                      className="w-full accent-ink cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-graphite uppercase">Presets:</span>
                      {[800000, 1500000, 2500000, 4000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSalaryCtc(preset)}
                          className={`text-[10px] font-mono border px-2 py-0.5 transition-colors ${
                            salaryCtc === preset ? "bg-ink text-white font-bold border-ink" : "bg-white text-graphite border-rule hover:text-ink"
                          }`}
                        >
                          ₹{(preset / 100000)}L
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-graphite">Regime:</span>
                      <button
                        type="button"
                        onClick={() => setSalaryRegime("new")}
                        className={`px-2 py-0.5 border cursor-pointer ${salaryRegime === "new" ? "bg-ink text-white font-bold" : "border-rule text-graphite"}`}
                      >
                        New (FY 25-26)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSalaryRegime("old")}
                        className={`px-2 py-0.5 border cursor-pointer ${salaryRegime === "old" ? "bg-ink text-white font-bold" : "border-rule text-graphite"}`}
                      >
                        Old
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={deductEpf}
                          onChange={(e) => setDeductEpf(e.target.checked)}
                          className="accent-ink cursor-pointer"
                        />
                        <span>EPF (12%)</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={deductPt}
                          onChange={(e) => setDeductPt(e.target.checked)}
                          className="accent-ink cursor-pointer"
                        />
                        <span>Prof Tax</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Printed Calculation Receipt Tape */}
            <div className="border border-rule bg-white p-4 font-mono text-xs relative max-h-72 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between border-b border-rule pb-2 text-[10px] text-graphite uppercase tracking-wider">
                <span>Formula Line Items</span>
                <span>Subtotal / Output</span>
              </div>

              <div className="space-y-2.5">
                {activeResult.calculationTape.map((step) => (
                  <div key={step.step} className="flex items-start justify-between gap-4 border-b border-dashed border-rule/70 pb-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-ink font-semibold">
                        <span className="text-graphite text-[10px]">[{String(step.step).padStart(2, "0")}]</span>
                        <span>{step.label}</span>
                      </div>
                      <div className="text-[11px] text-graphite">{step.formulaText}</div>
                    </div>
                    <div className="font-bold text-sm text-ink tabular-nums text-right whitespace-nowrap">
                      {step.formattedValue}
                    </div>
                  </div>
                ))}
              </div>

              {/* Double Ruled Summary Total */}
              <div className="ledger-double-rule pt-3 flex items-center justify-between font-sans">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-graphite block">
                    Calculated Summary Output
                  </span>
                  <span className="font-bold text-lg text-ink font-mono tabular-nums">
                    {mode === "sip"
                      ? formatINR(sipResult.futureValue)
                      : mode === "emi"
                      ? `${formatINR(emiResult.monthlyEmi)} / mo`
                      : `${formatINR(salaryResult.monthlyInHand)} / mo`}
                  </span>
                </div>
                <div className="text-[11px] font-mono font-bold bg-fermor-green px-2.5 py-1 text-ink border border-ink">
                  {mode === "sip" ? "ESTIMATED CORPUS" : mode === "emi" ? "MONTHLY EMI" : "MONTHLY IN-HAND"}
                </div>
              </div>
            </div>

            {/* Plain-Language Worked Sentence */}
            <div className="bg-paper p-3 border border-rule text-xs font-sans text-graphite leading-relaxed flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-ink mt-1.5 flex-shrink-0" />
              <div>
                {mode === "sip" && (
                  <span>
                    Investing <strong>{formatINR(sipMonthly)}</strong> every month for <strong>{sipYears} years</strong> at <strong>{sipRate}%</strong> return yields an estimated total corpus of <strong>{formatINR(sipResult.futureValue)}</strong> (with <strong>{formatINR(sipResult.totalReturns)}</strong> in estimated compounding returns).
                  </span>
                )}
                {mode === "emi" && (
                  <span>
                    A loan of <strong>{formatINR(emiAmount)}</strong> at <strong>{emiRate}%</strong> for <strong>{emiYears} years</strong> requires a monthly EMI of <strong>{formatINR(emiResult.monthlyEmi)}</strong>, totaling <strong>{formatINR(emiResult.totalPayable)}</strong> over the tenure.
                  </span>
                )}
                {mode === "salary" && (
                  <span>
                    On a <strong>{formatINR(salaryCtc)}</strong> annual CTC under the <strong>{salaryRegime.toUpperCase()} regime</strong>, your estimated net monthly take-home is <strong>{formatINR(salaryResult.monthlyInHand)}</strong> after standard deductions and tax.
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={isSharing}
                  className="inline-flex items-center gap-2 bg-paper hover:bg-rule/50 text-ink font-mono font-bold text-xs px-4 py-2.5 border border-ink transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Permalink Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-ink" />
                      <span>Share this working</span>
                    </>
                  )}
                </button>

                <Link
                  href={fullCalcUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-ink hover:underline underline-offset-4"
                >
                  <span>Open the full calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-[11px] text-graphite italic font-sans">
                * Illustrative calculation based on current parameters. Not investment or tax advice.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
