import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";

// Quelle: https://www.die-partei.de/spenden/
export function calculateContribution(): ContributionResult {
  const monthlyFee = 25 / 12;

  return {
    totalContribution: monthlyFee,
    details: [membersFee(monthlyFee)],
    approx: false,
    source: "https://www.ssw.de/aktiv-werden/mitglied-werden",
    notes: [
      {
        severity: "info",
        text: "Junge Leute unter 27 Jahren in der Ausbildung zahlen nur 6,50€ / Jahr ",
      },
    ],
  };
}

export default calculateContribution satisfies CalculatorFn;
