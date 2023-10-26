import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

// Quelle: https://www.cdu.de/mitglied-werden

export function calculateContribution({
  brutto: income,
}: UserData): ContributionResult {
  let fee: number;

  if (income >= 6000) {
    fee = 50;
  } else if (income >= 4000) {
    fee = 25;
  } else if (income >= 2500) {
    fee = 15;
  } else {
    fee = 6;
  }

  return {
    totalContribution: fee,
    approx: false,
    notes: [],
    source: "https://www.cdu.de/mitglied-werden",
    details: [membersFee(fee)],
  };
}

export default calculateContribution satisfies CalculatorFn;
