import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

// Quelle: https://www.afd.de/mitglied-werden/
export function calculateContribution(form: UserData): ContributionResult {
  const fee = Math.max(form.netto * 0.01, 10);

  return {
    totalContribution: fee,
    details: [membersFee(fee, true)],
    approx: true,
    source: "https://www.afd.de/mitglied-werden/",
    notes: [
      {
        severity: "info",
        text: "Der Mitgliedsbeitrag versteht sich als Richtwert",
      },
    ],
  };
}

export default calculateContribution satisfies CalculatorFn;
