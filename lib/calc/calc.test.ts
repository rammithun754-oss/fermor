import { describe, it, expect } from "vitest";
import { calculateSip, calculateEmi, calculateSalary } from "./index";

describe("Fermor Pure Calculator Logic", () => {
  describe("SIP Calculations", () => {
    it("should correctly compute 10k monthly SIP at 12% for 10 years", () => {
      const res = calculateSip({
        monthlyInvestment: 10000,
        annualRate: 12,
        years: 10,
      });

      expect(res.totalInvested).toBe(1200000);
      // Expected FV around 23,23,391
      expect(res.futureValue).toBeGreaterThan(2300000);
      expect(res.futureValue).toBeLessThan(2350000);
      expect(res.calculationTape).toHaveLength(6);
    });

    it("should handle 0% rate gracefully", () => {
      const res = calculateSip({
        monthlyInvestment: 5000,
        annualRate: 0,
        years: 5,
      });
      expect(res.totalInvested).toBe(300000);
      expect(res.futureValue).toBe(300000);
      expect(res.totalReturns).toBe(0);
    });
  });

  describe("EMI Calculations", () => {
    it("should correctly compute EMI for 50L home loan at 8.5% for 20 years", () => {
      const res = calculateEmi({
        loanAmount: 5000000,
        annualRate: 8.5,
        years: 20,
      });

      // EMI for 50L @ 8.5% 20y is ~43,391
      expect(res.monthlyEmi).toBeGreaterThan(43000);
      expect(res.monthlyEmi).toBeLessThan(44000);
      expect(res.totalPayable).toBeGreaterThan(res.loanAmount);
      expect(res.interestRatioPercentage).toBeGreaterThan(45);
    });
  });

  describe("Salary Take-Home Calculations", () => {
    it("should correctly compute in-hand salary for 15L CTC in New Regime", () => {
      const res = calculateSalary({
        annualCtc: 1500000,
        regime: "new",
        deductEpf: true,
        deductPt: true,
      });

      expect(res.monthlyCtc).toBe(125000);
      expect(res.standardDeduction).toBe(75000);
      expect(res.monthlyInHand).toBeLessThan(125000);
      expect(res.monthlyInHand).toBeGreaterThan(90000);
    });
  });
});
