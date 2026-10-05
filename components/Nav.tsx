"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-rule transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-ink"
        >
          <svg
            width="28"
            height="22"
            viewBox="0 0 29 22"
            fill="none"
            className="h-5 md:h-6 w-auto transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            <rect width="8" height="22" fill="#0B0D0C" />
            <rect x="11" width="8" height="15" fill="#0B0D0C" />
            <rect x="22" width="7" height="22" fill="#75FB90" />
          </svg>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink">
            Fermor
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-graphite" aria-label="Main Navigation">
          <Link
            href="#calculators"
            className="hover:text-ink transition-colors py-1 hover:underline underline-offset-4"
          >
            Calculators
          </Link>
          <Link
            href="/mutual-funds"
            className="hover:text-ink transition-colors py-1 hover:underline underline-offset-4"
          >
            Compare
          </Link>
          <Link
            href="/blogs"
            className="hover:text-ink transition-colors py-1 hover:underline underline-offset-4"
          >
            Learn
          </Link>
          <Link
            href="#methodology"
            className="hover:text-ink transition-colors py-1 hover:underline underline-offset-4"
          >
            How we calculate
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#calculators"
            className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-graphite text-xs uppercase tracking-wider font-bold px-4 py-2.5 border border-ink transition-all focus:ring-2 focus:ring-fermor-green"
          >
            <span>Open a calculator</span>
            <ArrowUpRight className="w-4 h-4 text-fermor-green" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink hover:bg-rule/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ink"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-rule px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-base text-ink">
            <Link
              href="#calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-rule/60 flex items-center justify-between"
            >
              <span>Calculators</span>
              <ArrowUpRight className="w-4 h-4 text-graphite" />
            </Link>
            <Link
              href="/mutual-funds"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-rule/60 flex items-center justify-between"
            >
              <span>Compare Rates</span>
              <ArrowUpRight className="w-4 h-4 text-graphite" />
            </Link>
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-rule/60 flex items-center justify-between"
            >
              <span>Learn & Articles</span>
              <ArrowUpRight className="w-4 h-4 text-graphite" />
            </Link>
            <Link
              href="#methodology"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-rule/60 flex items-center justify-between"
            >
              <span>How We Calculate</span>
              <ArrowUpRight className="w-4 h-4 text-graphite" />
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="#working-tape"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper font-bold py-3 text-sm border border-ink"
            >
              Open a Calculator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
