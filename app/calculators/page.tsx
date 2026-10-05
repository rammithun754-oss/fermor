import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CalculatorIndex } from "@/components/CalculatorIndex";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "All Personal Finance Calculators — Fermor",
  description: "Browse 14+ free Indian calculators for SIP, EMI, FD, salary take-home, income tax, HRA, and PPF.",
};

export default function AllCalculatorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
        <CalculatorIndex />
      </main>
      <Footer />
    </div>
  );
}
