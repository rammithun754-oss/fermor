import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fermor — Personal Finance with the Working Shown",
  description:
    "Free calculators for SIP, EMI, FD, salary take-home, and income tax in India. No login wall, no black boxes, transparent math.",
  keywords: [
    "Fermor",
    "SIP calculator",
    "EMI calculator",
    "Income tax calculator India",
    "In-hand salary calculator",
    "Home loan calculator",
    "PPF calculator",
    "FD calculator",
  ],
  authors: [{ name: "Fermor India" }],
  openGraph: {
    title: "Fermor — Personal Finance with the Working Shown",
    description:
      "Free SIP, EMI, FD, salary, and tax calculators built for India. No sign-up, clear worked arithmetic.",
    url: "https://fermor.in",
    siteName: "Fermor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fermor_in",
    title: "Fermor: Finance Smarter",
    description: "Free calculators and clear math for every money move in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased min-h-screen selection:bg-fermor-green selection:text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-fermor-green focus:text-ink focus:font-bold border border-ink"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
