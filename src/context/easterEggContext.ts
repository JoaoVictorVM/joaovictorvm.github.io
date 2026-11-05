import { createContext } from "react";

export const easterEggIds = ["about-portrait", "github-colors"] as const;
export type EasterEggId = (typeof easterEggIds)[number];

export interface EasterEggContextValue {
  foundCount: number;
  totalCount: number;
  discover: (id: EasterEggId) => void;
}

export const EasterEggContext = createContext<EasterEggContextValue | null>(
  null,
);
