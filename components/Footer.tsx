import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-ink font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        
        {/* Top Section: Wordmark + Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Mark */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                width="28"
                height="22"
                viewBox="0 0 29 22"
                fill="none"
                className="h-5 w-auto"
                aria-hidden="true"
              >
                <rect width="8" height="22" fill="#F3F4F0" />
                <rect x="11" width="8" height="15" fill="#F3F4F0" />
                <rect x="22" width="7" height="22" fill="#75FB90" />
              </svg>
              <span className="font-display text-2xl font-bold tracking-tight text-paper">
                Fermor
              </span>
            </Link>
            <p className="text-xs text-rule/80 max-w-sm leading-relaxed font-sans">
              Personal finance platform built for India. Free calculators, unbiased rate comparisons, and open methodology with zero login walls.
            </p>
          </div>

          {/* Calculators Column */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-fermor-green font-bold uppercase tracking-widest text-[11px]">
              Calculators
            </div>
            <ul className="space-y-2 text-rule/80">
              <li>
                <Link href="/calculators/sip-calculator" className="hover:text-paper transition-colors">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/emi-calculator" className="hover:text-paper transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/home-loan-calculator" className="hover:text-paper transition-colors">
                  Home Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/in-hand-salary-calculator" className="hover:text-paper transition-colors">
                  In-Hand Salary Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/old-vs-new-tax-regime-calculator" className="hover:text-paper transition-colors">
                  Old vs New Tax Regime
                </Link>
              </li>
              <li>
                <Link href="/calculators/fd-calculator" className="hover:text-paper transition-colors">
                  FD Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics Column */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-fermor-green font-bold uppercase tracking-widest text-[11px]">
              Topics
            </div>
            <ul className="space-y-2 text-rule/80">
              <li>
                <Link href="/mutual-funds" className="hover:text-paper transition-colors">
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="#calculators" className="hover:text-paper transition-colors">
                  Home Loans
                </Link>
              </li>
              <li>
                <Link href="#calculators" className="hover:text-paper transition-colors">
                  Fixed Deposits
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-paper transition-colors">
                  Income Tax India
                </Link>
              </li>
              <li>
                <Link href="#calculators" className="hover:text-paper transition-colors">
                  Retirement Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-fermor-green font-bold uppercase tracking-widest text-[11px]">
              Company
            </div>
            <ul className="space-y-2 text-rule/80">
              <li>
                <Link href="/about" className="hover:text-paper transition-colors">
                  About Fermor
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-paper transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-paper transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-paper transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="border-t border-graphite/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-rule/70">
          <div>
            © 2026 Fermor. All rights reserved. Built for India.
          </div>
          <div className="text-right italic font-sans text-rule/60">
            Results are indicative. Not financial advice.
          </div>
        </div>

      </div>
    </footer>
  );
}
