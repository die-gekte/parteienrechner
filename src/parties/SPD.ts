import {
  Besoldungsgruppe,
  CalculatorFn,
  ContributionResult,
  membersFee,
} from "./contribution.ts";
import { UserData } from "../Layout.tsx";

type MemberType =
  | "regular"
  | "bundestagMember"
  | "landtagMember"
  | "municipalOfficial"
  | "unemployed"
  | "dualPartyMember";

// Quelle: https://kampagne.spd.de/meine-daten/beitragsquittung/mitgliedsbeitragshoehe

function calculateMembershipFee(
  netIncome: number,
  memberType: MemberType,
  besoldungsgruppe?: Besoldungsgruppe,
): number {
  if (
    memberType === "bundestagMember" ||
    (memberType === "regular" && netIncome > 6000)
  ) {
    return 300;
  } else if (memberType === "landtagMember") {
    // Fee for landtag members is determined by state associations, may need additional logic
    return 0;
  } else if (memberType === "municipalOfficial" && besoldungsgruppe) {
    switch (besoldungsgruppe) {
      case "A15":
      case "A16":
        return 70;
      case "B1":
      case "B2":
        return 140;
      case "B3":
      case "B4":
      case "B5":
      case "B6":
        return 210;
      case "B7":
      case "B8":
      case "B9":
        return 280;
      case "B10":
      case "B11":
        return 350;
      default:
        return 0; // Default for unknown salary groups
    }
  } else if (memberType === "unemployed" || memberType === "dualPartyMember") {
    return 2.5;
  } else if (memberType === "regular") {
    if (netIncome <= 1000) {
      return 6;
    } else if (netIncome <= 2000) {
      // Assuming the lowest fee tier within this income bracket
      return 8;
    } else if (netIncome <= 3000) {
      // Assuming the lowest fee tier within this income bracket
      return 26;
    } else if (netIncome <= 4000) {
      // Assuming the lowest fee tier within this income bracket
      return 47;
    } else if (netIncome <= 6000) {
      // Assuming the lowest fee tier within this income bracket
      return 105;
    } else {
      // Assuming the lowest fee tier within this income bracket
      return 300;
    }
  }
  return 0; // Default
}

function calculateContributionSPD(
  income: number,
  memberType: MemberType,
  besoldungsgruppe?: Besoldungsgruppe,
): ContributionResult {
  const membershipFee = calculateMembershipFee(
    income,
    memberType,
    besoldungsgruppe,
  );

  return {
    totalContribution: membershipFee,
    details: [membersFee(membershipFee)],
    source:
      "https://kampagne.spd.de/meine-daten/beitragsquittung/mitgliedsbeitragshoehe",
    approx: false,
    notes: [
      {
        severity: "warning",
        text: "Dieser Rechner deckt nicht die vielen Sonderfälle (Wahlbeamt*innen, Mitglied mehrer Parteien etc.) bei der SPD ab.",
      },
    ],
  };
}

function calculateContribution({
  netto: income,
  isUnemployed,
  isRetired,
}: UserData) {
  let type: MemberType = "regular";

  if (isRetired || isUnemployed) {
    type = "unemployed";
  }

  return calculateContributionSPD(income, type);
}

export default calculateContribution satisfies CalculatorFn;
