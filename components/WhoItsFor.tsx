"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, User, Home, Wallet, Briefcase } from "lucide-react";

export function WhoItsFor() {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      id: "first-salary",
      title: "First Salary Worker",
      roleLabel: "Entry-Level Professionals",
      icon: Briefcase,
      headline: "Know your actual in-hand money before your first paycheck.",
      body: "Understand how EPF contributions, professional tax, and standard deductions affect your ₹6L to ₹12L gross offer letter.",
      recommendedTool: "In-Hand Salary Calculator",
      recommendedSlug: "/calculators/in-hand-salary-calculator",
      sampleCase: "Gross ₹8.5L CTC → ₹63,200 Monthly Take-Home",
    },
    {
      id: "home-loan",
      title: "Home-Loan Buyer",
      roleLabel: "Property & Housing Buyers",
      icon: Home,
      headline: "Compare bank loan offers without aggressive sales calls.",
      body: "Calculate exact EMIs for ₹30L to ₹1.5Cr home loans across 20-30 years. Model total interest cost before visiting a bank branch.",
      recommendedTool: "Home Loan & Amortisation Calculator",
      recommendedSlug: "/calculators/home-loan-calculator",
      sampleCase: "₹60L @ 8.4% for 20Y → ₹51,691 EMI",
    },
    {
      id: "sip-starter",
      title: "SIP Starter",
      roleLabel: "Disciplined Mutual Fund Investors",
      icon: Wallet,
      headline: "Build long-term compounding habits from ₹1,000/month.",
      body: "Project expected wealth growth over 10 to 25 years. See how step-up annual increases compound your retirement portfolio.",
      recommendedTool: "SIP Compounding Calculator",
      recommendedSlug: "/calculators/sip-calculator",
      sampleCase: "₹5,000/mo @ 12% 20Y → ₹49.95 Lakhs Corpus",
    },
    {
      id: "tax-planner",
      title: "Salaried Tax Planner",
      roleLabel: "ITR & Exemption Optimisers",
      icon: User,
      headline: "Pick between Old and New Tax Regimes with zero guesswork.",
      body: "Factor in 80C, HRA rent receipts, 80D health insurance, and standard deduction to choose the cheapest regime for FY 2025-26.",
      recommendedTool: "Old vs New Tax Regime Calculator",
      recommendedSlug: "/calculators/old-vs-new-tax-regime-calculator",
      sampleCase: "₹18L Salary → Save ₹38,400 with New Regime",
    },
  ];

  return (
    <section className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
            [06 / TARGET AUDIENCE]
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Who Fermor Is Built For
          </h2>
          <p className="text-base text-graphite font-sans">
            Tailored calculation workflows designed specifically for Indian financial realities.
          </p>
        </div>

        {/* Tabbed / Hover Expand Ledger Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Persona Selection Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {personas.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePersona(idx)}
                onMouseEnter={() => setActivePersona(idx)}
                className={`w-full text-left p-4 border transition-all flex items-center justify-between font-mono text-xs ${
                  activePersona === idx
                    ? "bg-ink text-paper border-ink font-bold shadow-none"
                    : "bg-white text-graphite border-rule hover:text-ink hover:border-ink"
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-fermor-green block font-bold">
                    [0{idx + 1} / {item.roleLabel}]
                  </span>
                  <span className="font-display text-base font-bold block">
                    {item.title}
                  </span>
                </div>
                <ArrowUpRight className={`w-4 h-4 ${activePersona === idx ? "text-fermor-green" : "text-graphite"}`} />
              </button>
            ))}
          </div>

          {/* Active Persona Detail Card */}
          <div className="lg:col-span-8 bg-white border border-rule p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-paper border border-rule px-3 py-1 font-mono text-xs font-bold text-graphite">
                <span>Selected Persona:</span>
                <span className="text-ink uppercase">{personas[activePersona].title}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                {personas[activePersona].headline}
              </h3>

              <p className="text-graphite font-sans leading-relaxed text-sm md:text-base">
                {personas[activePersona].body}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-rule">
              <div className="bg-paper p-4 border border-rule font-mono text-xs space-y-1">
                <span className="text-graphite block uppercase">Worked Persona Real-Life Benchmark:</span>
                <span className="text-sm font-bold text-ink block tabular-nums">
                  {personas[activePersona].sampleCase}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs text-graphite">
                  Recommended Tool: <strong className="text-ink">{personas[activePersona].recommendedTool}</strong>
                </div>
                <Link
                  href={personas[activePersona].recommendedSlug}
                  className="bg-ink text-paper hover:bg-graphite font-bold font-mono text-xs uppercase tracking-wider px-5 py-2.5 border border-ink inline-flex items-center gap-2"
                >
                  <span>Open Tool</span>
                  <ArrowUpRight className="w-4 h-4 text-fermor-green" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
