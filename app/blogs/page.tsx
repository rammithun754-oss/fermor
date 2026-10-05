import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CompareLearn } from "@/components/CompareLearn";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blogs & Analysis — Fermor",
  description: "Unbiased financial analysis, tax regulation breakdowns, and investment guides for India.",
};

export default function BlogsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Nav />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-graphite hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
        <CompareLearn />
      </main>
      <Footer />
    </div>
  );
}
