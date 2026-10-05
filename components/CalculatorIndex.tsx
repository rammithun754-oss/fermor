"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

type CategoryFilter = "all" | "investing" | "loans" | "tax";

interface CalculatorItem {
  id: string;
  name: string;
  promise: string;
  category: CategoryFilter;
  slug: string;
  badge?: string;
}

export function CalculatorIndex() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const calculators: CalculatorItem[] = [
    {
      id: "sip",
      name: "SIP Calculator",
      promise: "Calculate future wealth compounding from monthly mutual fund deposits.",
      category: "investing",
      slug: "/calculators/sip-calculator",
      badge: "Popular",
    },
    {
      id: "lumpsum",
      name: "Lumpsum Calculator",
      promise: "Estimate long-term compound returns on single one-off investments.",
      category: "investing",
      slug: "/calculators/lumpsum-calculator",
    },
    {
      id: "emi",
      name: "EMI Calculator",
      promise: "Compute exact monthly loan repayments and total interest outgo.",
      category: "loans",
      slug: "/calculators/emi-calculator",
      badge: "Popular",
    },
    {
      id: "home-loan",
      name: "Home Loan Calculator",
      promise: "Model 15 to 30 year home loan EMIs, interest ratios, and prepayments.",
      category: "loans",
      slug: "/calculators/home-loan-calculator",
    },
    {
      id: "car-loan",
      name: "Car Loan Calculator",
      promise: "Calculate monthly auto loan installments across 3 to 7 year tenures.",
      category: "loans",
      slug: "/calculators/car-loan-calculator",
    },
    {
      id: "in-hand-salary",
      name: "In-Hand Salary Calculator",
      promise: "Break down CTC into basic, EPF, professional tax, and net monthly payout.",
      category: "tax",
      slug: "/calculators/in-hand-salary-calculator",
      badge: "Essential",
    },
    {
      id: "tax-regime",
      name: "Old vs New Tax Regime Calculator",
      promise: "Compare tax liability under FY 2025-26 slabs to pick the cheapest regime.",
      category: "tax",
      slug: "/calculators/old-vs-new-tax-regime-calculator",
    },
    {
      id: "hra",
      name: "HRA Exemption Calculator",
      promise: "Find exact tax-exempt House Rent Allowance based on rent paid and metro city status.",
      category: "tax",
      slug: "/calculators/hra-calculator",
    },
    {
      id: "fd",
      name: "Fixed Deposit (FD) Calculator",
      promise: "Project quarterly compounding FD interest payout and maturity value.",
      category: "investing",
      slug: "/calculators/fd-calculator",
    },
    {
      id: "ppf",
      name: "Public Provident Fund (PPF) Calculator",
      promise: "Calculate 15-year tax-free compounding under Govt PPF scheme.",
      category: "investing",
      slug: "/calculators/ppf-calculator",
    },
    {
      id: "nps",
      name: "National Pension System (NPS) Calculator",
      promise: "Estimate retirement annuity and lump sum withdrawal corpus at age 60.",
      category: "investing",
      slug: "/calculators/nps-calculator",
    },
    {
      id: "swp",
      name: "Systematic Withdrawal Plan (SWP) Calculator",
      promise: "Plan monthly regular income withdrawals from mutual fund investments.",
      category: "investing",
      slug: "/calculators/swp-calculator",
    },
    {
      id: "gratuity",
      name: "Gratuity Calculator",
      promise: "Calculate tax-free gratuity eligibility after 5+ years of continuous service.",
      category: "tax",
      slug: "/calculators/gratuity-calculator",
    },
    {
      id: "gst",
      name: "GST Calculator",
      promise: "Calculate inclusive or exclusive Goods and Services Tax (5%, 12%, 18%, 28%).",
      category: "tax",
      slug: "/calculators/gst-calculator",
    },
  ];

  const filtered = calculators.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.promise.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="calculators" className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
              [03 / COMPLETE CALCULATOR INDEX]
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              All Financial Calculators
            </h2>
            <p className="text-sm sm:text-base text-graphite font-sans max-w-xl">
              Dense ledger index of verified Indian personal finance tools. Every math engine runs directly in your browser.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-graphite absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search calculator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-rule text-xs font-mono text-ink placeholder:text-graphite focus:outline-none focus:ring-1 focus:ring-ink"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-rule pb-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 border transition-colors ${
              filter === "all"
                ? "bg-ink text-fermor-green font-bold border-ink"
                : "bg-white text-graphite border-rule hover:text-ink"
            }`}
          >
            All Tools ({calculators.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("investing")}
            className={`px-4 py-2 border transition-colors ${
              filter === "investing"
                ? "bg-ink text-fermor-green font-bold border-ink"
                : "bg-white text-graphite border-rule hover:text-ink"
            }`}
          >
            Investing & Wealth
          </button>
          <button
            type="button"
            onClick={() => setFilter("loans")}
            className={`px-4 py-2 border transition-colors ${
              filter === "loans"
                ? "bg-ink text-fermor-green font-bold border-ink"
                : "bg-white text-graphite border-rule hover:text-ink"
            }`}
          >
            Loans & EMI
          </button>
          <button
            type="button"
            onClick={() => setFilter("tax")}
            className={`px-4 py-2 border transition-colors ${
              filter === "tax"
                ? "bg-ink text-fermor-green font-bold border-ink"
                : "bg-white text-graphite border-rule hover:text-ink"
            }`}
          >
            Tax & Salary
          </button>
        </div>

        {/* Dense Table-Style List Container */}
        <div className="bg-white border border-rule overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-rule bg-paper/60 text-[11px] font-mono text-graphite uppercase tracking-wider">
                <th className="py-3 px-4 w-16">Ref</th>
                <th className="py-3 px-4 w-64">Calculator Name</th>
                <th className="py-3 px-4">Core Mathematical Promise</th>
                <th className="py-3 px-4 text-right w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule font-sans text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-graphite font-mono text-xs">
                    No calculators match your search query.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-paper/40 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-graphite">
                      [{String(idx + 1).padStart(2, "0")}]
                    </td>
                    <td className="py-3.5 px-4 font-bold text-ink">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[10px] font-mono bg-paper border border-rule px-1.5 py-0.5 text-graphite uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-graphite text-xs sm:text-sm">
                      {item.promise}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={item.slug}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-ink hover:underline group-hover:text-ink"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
