import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";

// Quelle: https://www.die-partei.de/spenden/
export function calculateContribution(): ContributionResult {
  const monthlyFee = 10 / 12;

  return {
    totalContribution: monthlyFee,
    details: [membersFee(monthlyFee)],
    approx: false,
    source: "https://www.die-partei.de/spenden/",
    notes: [],
  };
}

export default calculateContribution satisfies CalculatorFn;
