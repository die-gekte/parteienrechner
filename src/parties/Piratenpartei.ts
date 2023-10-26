import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";

// Quelle: https://www.piratenpartei.de/werde-pirat/mitgliedsbeitrag/
export function calculateContribution(): ContributionResult {
  const monthlyFee = 48 / 12;

  return {
    totalContribution: monthlyFee,
    details: [membersFee(monthlyFee)],
    approx: false,
    source: "https://www.piratenpartei.de/werde-pirat/mitgliedsbeitrag/",
    notes: [],
  };
}

export default calculateContribution satisfies CalculatorFn;
