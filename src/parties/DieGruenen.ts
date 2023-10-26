import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

// Quelle: https://www.gruene.de/mitglied-werden
export function calculateContribution(form: UserData): ContributionResult {
  const fee = form.netto * 0.01;

  return {
    totalContribution: fee,
    details: [membersFee(fee)],
    approx: false,
    source: "https://www.gruene.de/mitglied-werden",
    notes: [
      {
        severity: "info",
        text: "Dein Kreisverband kann höhere Beiträge festsetzen.",
      },
    ],
  };
}

export default calculateContribution satisfies CalculatorFn;
