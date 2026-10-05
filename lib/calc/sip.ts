export interface SipInput {
  monthlyInvestment: number; // e.g. 10000
  annualRate: number;        // e.g. 12 (%)
  years: number;             // e.g. 10
}

export interface SipResult {
  monthlyInvestment: number;
  annualRate: number;
  years: number;
  totalMonths: number;
  totalInvested: number;
  futureValue: number;
  totalReturns: number;
  formula: string;
  calculationTape: Array<{
    step: number;
    label: string;
    formulaText: string;
    value: number;
    formattedValue: string;
  }>;
}

/**
 * Format currency in Indian Number Format (en-IN)
 */
export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

/**
 * Calculate Monthly SIP Future Value
 */
export function calculateSip(input: SipInput): SipResult {
  const { monthlyInvestment, annualRate, years } = input;
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  const totalInvested = monthlyInvestment * totalMonths;

  let futureValue = 0;
  if (monthlyRate === 0) {
    futureValue = totalInvested;
  } else {
    futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalReturns = Math.max(0, futureValue - totalInvested);

  const calculationTape = [
    {
      step: 1,
      label: "Monthly SIP Deposit (P)",
      formulaText: `₹${monthlyInvestment.toLocaleString("en-IN")} / month`,
      value: monthlyInvestment,
      formattedValue: formatINR(monthlyInvestment),
    },
    {
      step: 2,
      label: "Investment Tenure (n)",
      formulaText: `${years} years × 12 months`,
      value: totalMonths,
      formattedValue: `${totalMonths} months`,
    },
    {
      step: 3,
      label: "Assumed Annual Return (r)",
      formulaText: `${annualRate}% p.a. (monthly r = ${(monthlyRate * 100).toFixed(2)}%)`,
      value: annualRate,
      formattedValue: `${annualRate}%`,
    },
    {
      step: 4,
      label: "Total Principal Invested",
      formulaText: `P × n = ₹${monthlyInvestment.toLocaleString("en-IN")} × ${totalMonths}`,
      value: totalInvested,
      formattedValue: formatINR(totalInvested),
    },
    {
      step: 5,
      label: "Estimated Compounded Growth",
      formulaText: `FV - Total Principal`,
      value: totalReturns,
      formattedValue: formatINR(totalReturns),
    },
    {
      step: 6,
      label: "Total Corpus Value (FV)",
      formulaText: `P × [((1+i)^n - 1) / i] × (1+i)`,
      value: futureValue,
      formattedValue: formatINR(futureValue),
    },
  ];

  return {
    monthlyInvestment,
    annualRate,
    years,
    totalMonths,
    totalInvested: Math.round(totalInvested),
    futureValue: Math.round(futureValue),
    totalReturns: Math.round(totalReturns),
    formula: "FV = P × [((1+i)^n - 1) / i] × (1+i)",
    calculationTape,
  };
}
