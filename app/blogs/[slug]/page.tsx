import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

const articlesData: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  "itr-filing-last-date": {
    title: "ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know",
    category: "TAX PLANNING",
    date: "Oct 2025",
    content: [
      "Filing your Income Tax Return (ITR) on time is critical to avoid interest penalties under Section 234A, 234B, and 234C, as well as late filing fees under Section 234F.",
      "For individual salaried taxpayers without audit requirements, the standard deadline for FY 2025-26 (AY 2026-27) is July 31st.",
      "If you miss the July 31st deadline, you can file a Belated Return until December 31st. However, a late fee of ₹5,000 applies (₹1,000 for total income below ₹5 Lakhs).",
    ],
  },
  "rbi-financial-product-mis-selling-rules": {
    title: "RBI Financial Product Mis-Selling Rules: What Banks Must Now Do",
    category: "REGULATORY",
    date: "Sep 2025",
    content: [
      "The Reserve Bank of India (RBI) has issued updated directives banning banks from bundling unwanted insurance policies with home loans and credit card applications.",
      "Key changes mandate clear opt-in consent checkboxes, explicit fee disclosures, and strict penalties for bank branches forcing insurance purchase as a condition for loan approval.",
      "Borrowers can now lodge direct complaints with the Banking Ombudsman if bank officials demand forced insurance bundling.",
    ],
  },
  "tata-motors-pv-stock-crash-jlr-fy27-outlook": {
    title: "TMPV Share Price Falls 10%: What JLR's FY27 Guidance Means for Investors",
    category: "MARKET ANALYSIS",
    date: "Sep 2025",
    content: [
      "Tata Motors Passenger Vehicles (TMPV) witnessed a sharp 10% pullback following revised Jaguar Land Rover (JLR) margin guidance.",
      "Analysts highlight heavy EV transformation expenditure and supply chain realignment across European assembly plants as key drivers for near-term cash flow consolidation.",
      "Long-term domestic EV market leadership remains intact with strong order books for Punch EV and Curvv EV.",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articlesData[params.slug] || {
    title: params.slug.replace(/-/g, " ").toUpperCase(),
  };

  return {
    title: `${article.title} — Fermor Financial Analysis`,
    description: "Read in-depth financial analysis and regulatory breakdowns on Fermor.",
  };
}

export default function ArticlePage({ params }: Props) {
  const article = articlesData[params.slug] || {
    title: params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category: "FINANCIAL ANALYSIS",
    date: "2025-2026",
    content: [
      "Detailed financial analysis breakdown for " + params.slug.replace(/-/g, " ") + ".",
      "Fermor provides open arithmetic and unbiased data to empower Indian individuals in making smart money moves.",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to All Blogs
        </Link>

        <div className="space-y-4 border-b border-rule pb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-graphite">
            <span className="bg-ink text-fermor-green px-2.5 py-0.5 font-bold uppercase text-[10px]">
              {article.category}
            </span>
            <span>{article.date}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
            {article.title}
          </h1>
        </div>

        <div className="bg-white border border-rule p-6 md:p-8 space-y-4 font-sans text-base text-graphite leading-relaxed">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="bg-ink text-paper p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-fermor-green">
              Calculate your numbers now
            </h3>
            <p className="text-xs text-rule font-sans mt-1">
              Try our free browser calculators with zero login wall.
            </p>
          </div>
          <Link
            href="/#working-tape"
            className="bg-fermor-green text-ink font-bold font-mono text-xs px-5 py-2.5 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Open Live Working Tape
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
