import {
  CalculatorFn,
  ContributionDetail,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

const europeanLeftFee = (amount: number): ContributionDetail => {
  return {
    amount,
    name: "Mitgliedsbeitrag europäische Linke",
    approx: false,
  };
};

// Quelle: https://www.die-linke.de/fileadmin/1_Partei/grundsatzdokumente/beitragstabelle/die_linke_beitragstabelle_stand_januar_2016.pdf
function calculateContribution({
  netto: income,
  isUnemployed,
}: UserData): ContributionResult {
  // Define the income ranges and corresponding contributions
  const incomeRanges: Array<[number, number]> = [
    [0, 500],
    [500, 600],
    [600, 700],
    [700, 800],
    [800, 900],
    [900, 1000],
    [1000, 1100],
    [1100, 1300],
    [1300, 1500],
    [1500, 1700],
    [1700, 1900],
    [1900, 2100],
    [2100, 2300],
    [2300, 2500],
    [2500, Number.POSITIVE_INFINITY],
  ];
  const contributions: number[] = [
    1.5, 3.0, 5.0, 7.0, 9.0, 12.0, 15.0, 20.0, 25.0, 35.0, 45.0, 55.0, 65.0,
    75.0, 85.0,
  ];

  let membershipContribution = 0;
  if (isUnemployed) {
    membershipContribution = 1.5;
  } else if (income > 2500) {
    membershipContribution = income * 0.04;
  } else {
    for (let i = 0; i < incomeRanges.length; i++) {
      if (incomeRanges[i][0] <= income && income < incomeRanges[i][1]) {
        membershipContribution = contributions[i];
        break;
      }
    }
  }

  const details: ContributionDetail[] = [membersFee(membershipContribution)];

  if (income > 700) {
    // Minimum contribution
    details.push(europeanLeftFee(0.5));
  }

  const totalContribution = details.reduce(
    (sum, detail) => sum + detail.amount,
    0,
  );

  return {
    totalContribution: totalContribution,
    details: details,
    source:
      "https://www.die-linke.de/fileadmin/1_Partei/grundsatzdokumente/beitragstabelle/die_linke_beitragstabelle_stand_januar_2016.pdf",
    notes: [
      {
        severity: "info",
        text: "Gesetzliche Unterhaltsverpflichtungen mindern die Einkünfte und Bezüge um den jeweiligen Unterhaltsbetrag.",
      },
    ],
    approx: false,
  };
}

export default calculateContribution satisfies CalculatorFn;
