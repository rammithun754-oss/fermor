"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calculator, FileText, TrendingUp, ShieldCheck } from "lucide-react";

export function UnderstandActGrow() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      step: "01",
      tagline: "UNDERSTAND",
      heading: "Know your exact numbers before committing.",
      description:
        "Demystify tax slabs, standard deductions, and HRA exemptions. See precisely how much money lands in your bank account every month.",
      toolName: "In-Hand Salary & Tax Regime Calculator",
      toolSlug: "/calculators/in-hand-salary-calculator",
      sampleMetricLabel: "Gross ₹15L CTC Take-Home",
      sampleMetricVal: "₹98,450 / month",
      icon: FileText,
    },
    {
      step: "02",
      tagline: "ACT",
      heading: "Structure loans with zero amortisation surprises.",
      description:
        "Calculate exact monthly EMIs, total interest burden over 20 years, and prepayment savings. Never take bank loan PDF numbers at face value.",
      toolName: "Home Loan & EMI Amortisation Calculator",
      toolSlug: "/calculators/emi-calculator",
      sampleMetricLabel: "₹50L Loan @ 8.5% 20Y EMI",
      sampleMetricVal: "₹43,391 / month",
      icon: Calculator,
    },
    {
      step: "03",
      tagline: "GROW",
      heading: "Compound wealth with disciplined monthly SIPs.",
      description:
        "Project future portfolio wealth across 5 to 30 years. Compare regular vs step-up SIPs to hit your long-term retirement and inflation targets.",
      toolName: "Mutual Fund SIP & Step-Up Calculator",
      toolSlug: "/calculators/sip-calculator",
      sampleMetricLabel: "₹10,000/mo @ 12% for 15Y",
      sampleMetricVal: "₹50.45 Lakhs",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
            [02 / PRODUCT FRAMEWORK]
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Understand. Act. Grow.
          </h2>
          <p className="text-base sm:text-lg text-graphite font-sans">
            Three distinct phases of financial decision-making, each backed by dedicated browser calculators with full mathematical receipts.
          </p>
        </div>

        {/* Desktop Sticky Progress Line & Editorial Tabs */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: Progress Line Nav */}
          <div className="col-span-4 sticky top-28 space-y-2 border-l-2 border-rule pl-6">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.step}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left py-4 px-2 transition-all block ${
                  activeTab === idx
                    ? "text-ink border-l-4 border-ink -ml-[26px] pl-6 font-bold bg-white"
                    : "text-graphite/70 hover:text-ink"
                }`}
              >
                <div className="font-mono text-xs tracking-wider">
                  [{pillar.step} / {pillar.tagline}]
                </div>
                <div className="font-display text-lg font-bold mt-1">
                  {pillar.heading}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Pillar Card */}
          <div className="col-span-8 bg-white border border-rule p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <div className="inline-flex items-center gap-2 bg-ink text-fermor-green font-mono text-xs uppercase tracking-wider font-bold px-3 py-1">
                <span>Phase {pillars[activeTab].step}</span>
                <span>•</span>
                <span>{pillars[activeTab].tagline}</span>
              </div>
              <div className="font-mono text-xs text-graphite">
                Concrete Fermor Tool Integration
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                {pillars[activeTab].heading}
              </h3>
              <p className="text-graphite font-sans leading-relaxed text-base">
                {pillars[activeTab].description}
              </p>
            </div>

            {/* Metric Display Box */}
            <div className="bg-paper p-5 border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
              <div>
                <span className="text-xs text-graphite block uppercase tracking-wider">
                  Sample Live Calculation
                </span>
                <span className="text-sm font-bold text-ink">
                  {pillars[activeTab].sampleMetricLabel}
                </span>
              </div>
              <div className="text-xl font-bold text-ink bg-white border border-rule px-4 py-2 tabular-nums">
                {pillars[activeTab].sampleMetricVal}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={pillars[activeTab].toolSlug}
                className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-graphite font-bold font-mono text-xs uppercase tracking-wider px-6 py-3 border border-ink transition-colors"
              >
                <span>Launch {pillars[activeTab].toolName}</span>
                <ArrowUpRight className="w-4 h-4 text-fermor-green" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="lg:hidden space-y-6">
          {pillars.map((pillar) => (
            <div key={pillar.step} className="bg-white border border-rule p-6 space-y-4">
              <div className="inline-flex items-center gap-2 bg-ink text-fermor-green font-mono text-xs uppercase tracking-wider font-bold px-3 py-1">
                <span>Phase {pillar.step}</span>
                <span>•</span>
                <span>{pillar.tagline}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-ink">
                {pillar.heading}
              </h3>

              <p className="text-sm text-graphite font-sans leading-relaxed">
                {pillar.description}
              </p>

              <div className="bg-paper p-4 border border-rule font-mono text-xs space-y-1">
                <span className="text-graphite block">{pillar.sampleMetricLabel}</span>
                <span className="text-base font-bold text-ink block tabular-nums">
                  {pillar.sampleMetricVal}
                </span>
              </div>

              <div>
                <Link
                  href={pillar.toolSlug}
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper font-bold font-mono text-xs uppercase tracking-wider py-3 border border-ink"
                >
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 text-fermor-green" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
