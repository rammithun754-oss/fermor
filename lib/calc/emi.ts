import { formatINR } from "./sip";

export interface EmiInput {
  loanAmount: number; // e.g. 5000000 (50 Lakhs)
  annualRate: number; // e.g. 8.5 (%)
  years: number;      // e.g. 20
}

export interface EmiResult {
  loanAmount: number;
  annualRate: number;
  years: number;
  totalMonths: number;
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
  interestRatioPercentage: number;
  formula: string;
  calculationTape: Array<{
    step: number;
    label: string;
    formulaText: string;
    value: number;
    formattedValue: string;
  }>;
}

export function calculateEmi(input: EmiInput): EmiResult {
  const { loanAmount, annualRate, years } = input;
  const totalMonths = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = loanAmount / totalMonths;
  } else {
    monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPayable = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayable - loanAmount);
  const interestRatioPercentage =
    totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;

  const calculationTape = [
    {
      step: 1,
      label: "Loan Principal (P)",
      formulaText: `₹${loanAmount.toLocaleString("en-IN")}`,
      value: loanAmount,
      formattedValue: formatINR(loanAmount),
    },
    {
      step: 2,
      label: "Repayment Tenure (n)",
      formulaText: `${years} years × 12 months`,
      value: totalMonths,
      formattedValue: `${totalMonths} months`,
    },
    {
      step: 3,
      label: "Interest Rate per Month (r)",
      formulaText: `${annualRate}% ÷ 12 = ${(monthlyRate * 100).toFixed(4)}%`,
      value: annualRate,
      formattedValue: `${annualRate}% p.a.`,
    },
    {
      step: 4,
      label: "Monthly EMI",
      formulaText: `[P × r × (1+r)^n] ÷ [(1+r)^n - 1]`,
      value: monthlyEmi,
      formattedValue: formatINR(monthlyEmi),
    },
    {
      step: 5,
      label: "Total Interest Payable",
      formulaText: `(EMI × n) - Principal`,
      value: totalInterest,
      formattedValue: formatINR(totalInterest),
    },
    {
      step: 6,
      label: "Total Amount Paid over Tenure",
      formulaText: `Principal + Total Interest`,
      value: totalPayable,
      formattedValue: formatINR(totalPayable),
    },
  ];

  return {
    loanAmount,
    annualRate,
    years,
    totalMonths,
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    interestRatioPercentage: Number(interestRatioPercentage.toFixed(1)),
    formula: "EMI = P × r × (1+r)^n / [(1+r)^n - 1]",
    calculationTape,
  };
}
