import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

export function CompareLearn() {
  const articles = [
    {
      title: "ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know",
      excerpt:
        "Complete breakdown of key income tax deadlines, penalty structures under Section 234F, and mandatory filing criteria for salaried employees.",
      category: "TAX PLANNING",
      slug: "/blogs/itr-filing-last-date",
      readTime: "4 min read",
      date: "Oct 2025",
    },
    {
      title: "RBI Financial Product Mis-Selling Rules: What Banks Must Now Do",
      excerpt:
        "Analysis of mandatory RBI guidelines curbing forced bundling of insurance policies with home loans and credit cards.",
      category: "REGULATORY",
      slug: "/blogs/rbi-financial-product-mis-selling-rules",
      readTime: "5 min read",
      date: "Sep 2025",
    },
    {
      title: "TMPV Share Price Falls 10%: What JLR's FY27 Guidance Means for Investors",
      excerpt:
        "Examining Jaguar Land Rover's margin guidance, EV capex, and cash-flow projections for Indian automotive investors.",
      category: "MARKET ANALYSIS",
      slug: "/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook",
      readTime: "6 min read",
      date: "Sep 2025",
    },
  ];

  return (
    <section className="bg-paper border-b border-rule py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-graphite font-bold">
              [05 / LEARN & ANALYSIS]
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Compare & Learn
            </h2>
            <p className="text-base text-graphite font-sans max-w-xl">
              Unbiased financial breakdown and regulatory analysis written directly by engineers and analysts.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ink underline underline-offset-4 hover:text-graphite"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item, idx) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="bg-white border border-rule p-6 space-y-4 hover:border-ink transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-graphite">
                  <span className="font-bold text-ink bg-paper border border-rule px-2 py-0.5 uppercase text-[10px]">
                    {item.category}
                  </span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-ink group-hover:underline leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-graphite font-sans leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-rule flex items-center justify-between font-mono text-xs text-graphite">
                <span>{item.date}</span>
                <span className="font-bold text-ink inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
