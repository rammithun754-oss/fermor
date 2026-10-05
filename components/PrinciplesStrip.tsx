export function PrinciplesStrip() {
  const principles = [
    {
      number: "01",
      title: "No login.",
      detail: "Run every calculator instantly in your browser. Account creation is 100% optional, only if you choose to save a calculation.",
    },
    {
      number: "02",
      title: "No black boxes.",
      detail: "Every formula, compounding frequency, tax slab, and rounding assumption is published line-by-line right on the receipt.",
    },
    {
      number: "03",
      title: "Free.",
      detail: "Supported by clearly marked affiliate links and non-intrusive ads. No paywalls, premium tiers, or hidden charges ever.",
    },
  ];

  return (
    <section className="bg-ink text-paper border-b border-rule py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-graphite/40">
          {principles.map((item, idx) => (
            <div
              key={item.number}
              className={`py-6 md:py-0 ${
                idx === 0 ? "md:pr-8" : idx === 1 ? "md:px-8" : "md:pl-8"
              } space-y-3`}
            >
              <div className="font-mono text-xs text-fermor-green uppercase tracking-widest font-bold">
                [{item.number} / PRINCIPLE]
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-paper tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-rule/80 leading-relaxed font-sans max-w-sm">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
