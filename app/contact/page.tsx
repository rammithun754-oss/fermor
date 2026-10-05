import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us — Fermor",
  description: "Get in touch with the Fermor team for questions, feedback, or partnerships.",
};

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="text-base text-graphite">
            Have questions, feedback, or calculator feature suggestions? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="bg-white border border-rule p-8 space-y-4 font-sans text-sm text-graphite">
          <p>For inquiries, reach out directly at:</p>
          <div className="inline-flex items-center gap-2 bg-ink text-fermor-green font-mono font-bold text-sm px-4 py-2.5">
            <Mail className="w-4 h-4" />
            <span>fermor.in.contact@gmail.com</span>
          </div>
          <p className="text-xs text-graphite pt-2">
            We are based in India and typically respond within 2 business days.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
