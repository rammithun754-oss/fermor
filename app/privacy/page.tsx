import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Fermor",
  description: "Fermor Privacy Policy: client-side math, zero forced data collection.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>

        <div className="space-y-3 border-b border-rule pb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white border border-rule p-8 space-y-4 font-sans text-sm text-graphite leading-relaxed">
          <h2 className="font-display text-xl font-bold text-ink">Client-Side Calculations</h2>
          <p>
            All financial calculator math runs entirely within your browser using client-side JavaScript. The figures you input into sliders or text boxes are never transmitted to our remote servers just to perform calculations.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Scenario Storage</h2>
          <p>
            When you explicitly click &quot;Share this working&quot;, your scenario parameters and computed outputs are stored in our database to generate a unique permalink receipt (/s/[slug]) for sharing.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
