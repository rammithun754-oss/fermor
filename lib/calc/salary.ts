import { formatINR } from "./sip";

export interface SalaryInput {
  annualCtc: number;        // e.g. 1500000 (15 Lakhs)
  regime: "new" | "old";     // Tax Regime
  deductEpf: boolean;       // Standard Employee Provident Fund (12% of Basic)
  deductPt: boolean;        // Professional Tax (₹2,400/yr)
}

export interface SalaryResult {
  annualCtc: number;
  monthlyCtc: number;
  basicAnnual: number;
  epfAnnual: number;
  professionalTaxAnnual: number;
  standardDeduction: number;
  taxableIncome: number;
  annualTax: number;
  monthlyInHand: number;
  annualInHand: number;
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
 * Simplified Income Tax calculation for India FY 2025-26 New Regime
 * Standard Deduction: ₹75,000 for New Regime
 * Slabs:
 * 0 - 3L: Nil
 * 3L - 7L: 5%
 * 7L - 10L: 10%
 * 10L - 12L: 15%
 * 12L - 15L: 20%
 * Above 15L: 30%
 * Tax rebate under 87A up to 7L taxable income.
 * Health & Education Cess: 4% on tax.
 */
function calculateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 700000) return 0; // 87A rebate applies

  let tax = 0;
  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.30;
    tax += 300000 * 0.20; // 12-15L
    tax += 200000 * 0.15; // 10-12L
    tax += 300000 * 0.10; // 7-10L
    tax += 400000 * 0.05; // 3-7L
  } else if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.20;
    tax += 200000 * 0.15;
    tax += 300000 * 0.10;
    tax += 400000 * 0.05;
  } else if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.15;
    tax += 300000 * 0.10;
    tax += 400000 * 0.05;
  } else if (taxableIncome > 700000) {
    tax += (taxableIncome - 700000) * 0.10;
    tax += 400000 * 0.05;
  }

  // Add 4% Cess
  tax = tax * 1.04;
  return Math.round(tax);
}

/**
 * Old Regime simplified tax calculation (Standard Deduction ₹50,000)
 */
function calculateOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 500000) return 0; // 87A rebate up to 5L

  let tax = 0;
  if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.30;
    tax += 500000 * 0.20; // 5-10L
    tax += 250000 * 0.05; // 2.5-5L
  } else if (taxableIncome > 500000) {
    tax += (taxableIncome - 500000) * 0.20;
    tax += 250000 * 0.05;
  }

  tax = tax * 1.04;
  return Math.round(tax);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualCtc, regime, deductEpf, deductPt } = input;
  const monthlyCtc = annualCtc / 12;
  const basicAnnual = annualCtc * 0.5; // 50% basic rule

  // EPF: 12% of basic capped at ₹1,800/mo (₹21,600/yr) or statutory minimum
  const epfMonthly = deductEpf ? Math.min(basicAnnual * 0.12 / 12, 1800) : 0;
  const epfAnnual = epfMonthly * 12;

  // Professional Tax: ₹200/mo = ₹2,400/yr
  const professionalTaxAnnual = deductPt ? 2400 : 0;

  // Standard Deduction
  const standardDeduction = regime === "new" ? 75000 : 50000;

  const taxableIncome = Math.max(
    0,
    annualCtc - standardDeduction - (regime === "old" ? epfAnnual + professionalTaxAnnual : 0)
  );

  const annualTax =
    regime === "new"
      ? calculateNewRegimeTax(taxableIncome)
      : calculateOldRegimeTax(taxableIncome);

  const annualDeductions = epfAnnual + professionalTaxAnnual + annualTax;
  const annualInHand = Math.max(0, annualCtc - annualDeductions);
  const monthlyInHand = Math.round(annualInHand / 12);

  const calculationTape = [
    {
      step: 1,
      label: "Gross Annual CTC",
      formulaText: `₹${annualCtc.toLocaleString("en-IN")}`,
      value: annualCtc,
      formattedValue: formatINR(annualCtc),
    },
    {
      step: 2,
      label: "Standard Tax Deduction",
      formulaText: `${regime === "new" ? "FY 2025-26 New Regime" : "Old Regime"} Flat Deduction`,
      value: standardDeduction,
      formattedValue: formatINR(standardDeduction),
    },
    {
      step: 3,
      label: "Employee Provident Fund (EPF)",
      formulaText: deductEpf ? `12% of Basic (capped at ₹1,800/mo)` : `Opted Out / Zero`,
      value: epfAnnual,
      formattedValue: formatINR(epfAnnual),
    },
    {
      step: 4,
      label: "Professional Tax (PT)",
      formulaText: deductPt ? `₹200/mo statutory state tax` : `Zero`,
      value: professionalTaxAnnual,
      formattedValue: formatINR(professionalTaxAnnual),
    },
    {
      step: 5,
      label: "Estimated Income Tax + 4% Cess",
      formulaText: `Slab computation on taxable income of ${formatINR(taxableIncome)}`,
      value: annualTax,
      formattedValue: formatINR(annualTax),
    },
    {
      step: 6,
      label: "Monthly Net Take-Home Salary",
      formulaText: `(Annual CTC - Total Deductions) ÷ 12`,
      value: monthlyInHand,
      formattedValue: `${formatINR(monthlyInHand)} / month`,
    },
  ];

  return {
    annualCtc,
    monthlyCtc: Math.round(monthlyCtc),
    basicAnnual: Math.round(basicAnnual),
    epfAnnual: Math.round(epfAnnual),
    professionalTaxAnnual,
    standardDeduction,
    taxableIncome: Math.round(taxableIncome),
    annualTax: Math.round(annualTax),
    monthlyInHand,
    annualInHand: Math.round(annualInHand),
    formula: "Monthly In-Hand = (Gross CTC - EPF - PT - Income Tax) / 12",
    calculationTape,
  };
}
