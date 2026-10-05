import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Fermor — Free Finance Calculators for India",
  description: "Fermor builds free, accurate personal finance calculators for India. Free to use, no login wall on any tool.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>

        <div className="space-y-3 border-b border-rule pb-6">
          <div className="inline-flex items-center gap-2 bg-ink text-fermor-green px-3 py-1 font-mono text-xs font-bold uppercase">
            <span>Our Story</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            About Fermor
          </h1>
          <p className="text-base text-graphite max-w-xl">
            Free personal finance calculators built for India. No login wall on any tool. Just clear math for every money decision.
          </p>
        </div>

        <div className="bg-white border border-rule p-6 md:p-8 space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink">What We Build</h2>
          <p className="text-sm text-graphite leading-relaxed">
            Fermor is a personal finance platform built for India. We make free, accurate calculators that help you understand the real math behind every money decision: EMI, SIP returns, FD interest, income tax, salary take-home, and more.
          </p>
          <p className="text-sm text-graphite leading-relaxed">
            Every calculator&apos;s math runs entirely in your browser: the numbers you type in are never sent to our servers just to get a result. Creating an account is optional and only needed if you want to save a calculation and come back to it later. Fermor is supported by advertising and affiliate partnerships, which is what lets every tool stay free with no paywall.
          </p>
        </div>

        <div className="bg-white border border-rule p-6 md:p-8 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Our Principles</h2>
          <div className="space-y-3 font-mono text-xs text-graphite">
            <div className="p-3 bg-paper border border-rule flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-ink flex-shrink-0" />
              <span>Show the full math, not just the answer</span>
            </div>
            <div className="p-3 bg-paper border border-rule flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-ink flex-shrink-0" />
              <span>No login wall on any calculator: an account is optional, only to save your results</span>
            </div>
            <div className="p-3 bg-paper border border-rule flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-ink flex-shrink-0" />
              <span>Ads and affiliate links are always clearly labeled, never disguised as neutral advice</span>
            </div>
            <div className="p-3 bg-paper border border-rule flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-ink flex-shrink-0" />
              <span>Transparent methodology on every tool</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
