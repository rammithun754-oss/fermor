"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Code, CheckCircle2, FileCode } from "lucide-react";

export function HowWeCalculate() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="methodology" className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
            [04 / OPEN METHODOLOGY]
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            How We Calculate
          </h2>
          <p className="text-base text-graphite font-sans">
            We publish every mathematical equation, compounding period, tax slab rule, and rounding convention. No hidden proprietary black boxes.
          </p>
        </div>

        {/* Expandable Worked Example Container */}
        <div className="bg-white border border-rule space-y-0">
          
          {/* Accordion Bar Header */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full p-5 text-left flex items-center justify-between bg-white hover:bg-paper/40 transition-colors border-b border-rule focus:outline-none focus:ring-2 focus:ring-ink"
            aria-expanded={expanded}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-graphite">[WORKED EXAMPLE 01]</span>
              <span className="font-display text-lg font-bold text-ink">
                Monthly SIP Future Value Formula & Compounding Standard
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink">
              <span>{expanded ? "Collapse Formula" : "Expand Formula"}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Accordion Content Body */}
          {expanded && (
            <div className="p-6 md:p-8 space-y-8 font-sans text-sm animate-in fade-in duration-200">
              
              {/* Formula Section */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase font-bold text-graphite">
                  1. The Standard Annuity Due Equation
                </h4>
                <div className="bg-paper p-4 border border-rule font-mono text-sm md:text-base text-ink overflow-x-auto">
                  <code>FV = P × [((1 + i)^n - 1) / i] × (1 + i)</code>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono text-xs text-graphite">
                  <div className="border border-rule p-3 bg-white">
                    <span className="font-bold text-ink block">FV</span>
                    <span>Future Value Corpus</span>
                  </div>
                  <div className="border border-rule p-3 bg-white">
                    <span className="font-bold text-ink block">P</span>
                    <span>Monthly SIP Deposit Amount</span>
                  </div>
                  <div className="border border-rule p-3 bg-white">
                    <span className="font-bold text-ink block">i</span>
                    <span>Monthly Rate = (r ÷ 12) ÷ 100</span>
                  </div>
                  <div className="border border-rule p-3 bg-white">
                    <span className="font-bold text-ink block">n</span>
                    <span>Total Months = Years × 12</span>
                  </div>
                </div>
              </div>

              {/* Concrete Worked Walkthrough */}
              <div className="space-y-3 border-t border-rule pt-6">
                <h4 className="font-mono text-xs uppercase font-bold text-graphite">
                  2. Concrete Worked Step-by-Step (₹10,000/mo @ 12% for 1 Year)
                </h4>
                
                <div className="bg-paper border border-rule p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-rule pb-2">
                    <span className="text-graphite">Step 1: Convert Annual Rate to Monthly (i)</span>
                    <span className="font-bold text-ink">12% ÷ 12 = 1.0% / month = 0.01</span>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <span className="text-graphite">Step 2: Total Investment Tenure Months (n)</span>
                    <span className="font-bold text-ink">1 Year × 12 = 12 Months</span>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <span className="text-graphite">Step 3: Compounding Factor ((1 + 0.01)^12 - 1) / 0.01</span>
                    <span className="font-bold text-ink">12.682503</span>
                  </div>
                  <div className="flex justify-between border-b border-rule pb-2">
                    <span className="text-graphite">Step 4: Multiply by Monthly Deposit & Beginning-of-Month (1 + i)</span>
                    <span className="font-bold text-ink">₹10,000 × 12.682503 × 1.01</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-sm text-ink">
                    <span>Final Calculated Corpus (FV)</span>
                    <span className="tabular-nums">₹1,28,093</span>
                  </div>
                </div>
              </div>

              {/* Explicit Assumptions & Rounding Rules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-rule pt-6 font-sans">
                <div className="space-y-1.5">
                  <h5 className="font-mono text-xs font-bold text-ink uppercase">
                    [A] Compounding Assumption
                  </h5>
                  <p className="text-xs text-graphite leading-relaxed">
                    Calculations assume monthly compounding made at the beginning of each calendar month (Annuity Due standard).
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-mono text-xs font-bold text-ink uppercase">
                    [B] Rounding Convention
                  </h5>
                  <p className="text-xs text-graphite leading-relaxed">
                    All intermediate steps maintain 64-bit IEEE 754 floating precision. Final numbers round to the nearest whole Rupee using Math.round().
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-mono text-xs font-bold text-ink uppercase">
                    [C] Client-Side Execution
                  </h5>
                  <p className="text-xs text-graphite leading-relaxed">
                    The entire calculation loop runs directly inside your browser JavaScript runtime. No inputs are transmitted to remote servers.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
