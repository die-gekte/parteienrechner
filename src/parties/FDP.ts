import {
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

// Quelle: https://mitgliedwerden.fdp.de/fragen-und-antworten-zur-mitgliedschaft

function calculateContribution({
  brutto: income,
  isStudent,
}: UserData): ContributionResult {
  let fee: number;
  if (isStudent) {
    fee = 5;
  } else if (income <= 2400) {
    fee = 10;
  } else if (income <= 3600) {
    fee = 12;
  } else if (income <= 4800) {
    fee = 18;
  } else {
    fee = 24;
  }

  return {
    totalContribution: fee,
    details: [membersFee(fee)],
    source:
      "https://mitgliedwerden.fdp.de/fragen-und-antworten-zur-mitgliedschaft",
    notes: [
      {
        severity: "info",
        text: "Die örtlichen Gliederungen haben das Recht, von der bundesweiten Beitragsstaffel abzuweichen und höhere Beiträge festzulegen.",
      },
      {
        severity: "info",
        text: "Erwerbslose und Rentner können im Antragsformular einen reduzierten Mitgliedsbeitrag beantragen. Die Entscheidung darüber liegt allerdings bei der zuständigen Gliederung, in der Regel Ihr Orts- bzw. Kreisverband. Wird in diesem Rechner nicht betrachtet.",
      },
    ],
    approx: false,
  };
}

export default calculateContribution satisfies CalculatorFn;
