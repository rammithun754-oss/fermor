"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is Fermor completely free to use?",
      a: "Yes. Every financial calculator, rate comparison tool, and article on Fermor is 100% free with no paywall or trial period.",
    },
    {
      q: "Is account login required to calculate my numbers?",
      a: "No. You can use every tool instantly without signing up or logging in. Account creation is completely optional, only if you choose to save your results to access later.",
    },
    {
      q: "How accurate is the math behind Fermor's calculators?",
      a: "Our calculators execute standard financial formulas (Annuity Due for SIP, reducing balance EMI for loans, and official Income Tax Department FY 2025-26 tax slabs). Intermediate numbers maintain 64-bit IEEE floating precision before rounding to the nearest rupee.",
    },
    {
      q: "How does Fermor earn money if all tools are free?",
      a: "Fermor is supported by digital advertising and affiliate partnerships with financial providers. All sponsored content and affiliate links are always clearly labeled and never disguised as neutral financial advice.",
    },
    {
      q: "Are the calculations on Fermor financial or investment advice?",
      a: "No. All outputs are indicative mathematical estimates for educational planning only. Fermor does not provide formal investment, tax, or legal advice. Consult a certified financial advisor before making investment moves.",
    },
    {
      q: "How does Fermor protect my private financial data?",
      a: "Every calculator's arithmetic runs entirely in your browser using client-side JavaScript. The numbers you enter in sliders or text inputs are never sent to remote servers to generate your receipt.",
    },
  ];

  return (
    <section id="faq" className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
            [07 / FREQUENTLY ASKED QUESTIONS]
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Clear Answers, Zero Jargon
          </h2>
          <p className="text-sm sm:text-base text-graphite font-sans">
            Direct answers matching our verified operating principles.
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-white border border-rule divide-y divide-rule">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-sans hover:bg-paper/40 focus:outline-none focus:ring-2 focus:ring-ink"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-graphite mt-1">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-ink">
                      {faq.q}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-ink flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-graphite flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 pl-12 text-sm text-graphite font-sans leading-relaxed border-t border-dashed border-rule/60 bg-paper/20 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
