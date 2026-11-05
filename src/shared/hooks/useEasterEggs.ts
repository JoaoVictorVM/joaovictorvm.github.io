import { useContext } from "react";
import { EasterEggContext } from "@/context/easterEggContext";

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error(
      "useEasterEggs deve ser usado dentro de EasterEggProvider.",
    );
  }
  return context;
}
