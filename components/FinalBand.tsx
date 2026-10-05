"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Send } from "lucide-react";

export function FinalBand() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot, source: "homepage_final_band" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="bg-fermor-green text-ink border-b border-ink py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Call to Action */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 border border-ink bg-ink text-paper px-3 py-1 font-mono text-xs uppercase tracking-wider font-bold">
              <span>[08 / LAUNCH A CALCULATOR]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              Ready to see the worked math behind your next money move?
            </h2>
            <p className="text-base sm:text-lg font-sans text-ink/80 max-w-xl">
              Choose from 14+ free Indian calculators with full step-by-step receipt breakdowns. No sign-up required.
            </p>

            <div className="pt-2">
              <Link
                href="#calculators"
                className="bg-ink text-paper hover:bg-graphite font-bold font-mono text-xs uppercase tracking-wider px-7 py-4 border border-ink inline-flex items-center gap-2 shadow-none transition-colors"
              >
                <span>Open a Calculator Now</span>
                <ArrowUpRight className="w-4 h-4 text-fermor-green" />
              </Link>
            </div>
          </div>

          {/* Right Side: Email Signup Box */}
          <div className="lg:col-span-5 bg-ink text-paper p-6 sm:p-8 space-y-4 border border-ink shadow-none">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-fermor-green font-bold">
                Stay Updated
              </span>
              <h3 className="font-display text-xl font-bold text-paper">
                Email me when new calculators launch
              </h3>
              <p className="text-xs text-rule/80 font-sans">
                Zero spam. Only fresh worked calculators and rate comparison tools.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                  className="flex-1 bg-white text-ink px-3.5 py-2.5 text-xs font-mono border border-rule focus:outline-none focus:ring-2 focus:ring-fermor-green placeholder:text-graphite"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-fermor-green text-ink hover:opacity-90 font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 border border-fermor-green transition-opacity flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5 text-ink" />
                    </>
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="text-xs font-mono text-fermor-green flex items-center gap-1.5 pt-1">
                  <Check className="w-4 h-4" />
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="text-xs font-mono text-caution font-bold pt-1">
                  {message}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
