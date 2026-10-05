import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

export const metadata = {
  title: "Mutual Funds Rate Comparison — Fermor",
  description: "Compare mutual fund SIP return expectations, expense ratios, and asset allocation categories.",
};

export default function MutualFundsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>

        <div className="space-y-3 border-b border-rule pb-6">
          <div className="inline-flex items-center gap-2 bg-ink text-fermor-green px-3 py-1 font-mono text-xs font-bold uppercase">
            <span>Comparison Engine</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Mutual Funds & Rate Comparisons
          </h1>
          <p className="text-base text-graphite max-w-2xl">
            Unbiased return expectations and expense ratio math for equity, hybrid, and debt mutual funds in India.
          </p>
        </div>

        <div className="bg-white border border-rule p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-ink">Popular Fund Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-rule p-4 space-y-2 bg-paper">
              <span className="font-bold text-ink text-sm block">Nifty 50 Index Funds</span>
              <span className="text-graphite block">Expected Return: ~12% p.a.</span>
              <span className="text-graphite block">Expense Ratio: 0.1% - 0.2%</span>
            </div>
            <div className="border border-rule p-4 space-y-2 bg-paper">
              <span className="font-bold text-ink text-sm block">Flexi Cap Funds</span>
              <span className="text-graphite block">Expected Return: ~13.5% p.a.</span>
              <span className="text-graphite block">Expense Ratio: 0.6% - 0.9%</span>
            </div>
            <div className="border border-rule p-4 space-y-2 bg-paper">
              <span className="font-bold text-ink text-sm block">Small Cap Funds</span>
              <span className="text-graphite block">Expected Return: ~15% p.a.</span>
              <span className="text-graphite block">Expense Ratio: 0.7% - 1.1%</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
