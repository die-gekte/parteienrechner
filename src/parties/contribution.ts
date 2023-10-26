import { UserData } from "../Layout.tsx";
import { AlertColor } from "@mui/material/Alert/Alert";

export type ContributionDetail = {
  name: string;
  amount: number;
  description?: string;
  approx: boolean;
};

export interface InfoBox {
  severity: AlertColor;
  text: string;
}

export const membersFee = (
  amount: number,
  approx: boolean = false,
): ContributionDetail => {
  return {
    amount,
    name: "Mitgliedsbeitrag",
    approx,
  };
};

export type ContributionResult = {
  totalContribution: number;
  details: ContributionDetail[];
  approx: boolean;
  notes: InfoBox[];
  source: string;
};

export const Besoldungsgruppen: Besoldungsgruppe[] = [
  "A15",
  "A16",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "B9",
  "B10",
  "B11",
];

export type Besoldungsgruppe =
  | "A15"
  | "A16"
  | "B1"
  | "B2"
  | "B3"
  | "B4"
  | "B5"
  | "B6"
  | "B7"
  | "B8"
  | "B9"
  | "B10"
  | "B11";

export type CalculatorFn = (form: UserData) => ContributionResult;
