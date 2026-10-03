import { useContext } from "react";
import {
  ConsentContext,
  type ConsentContextValue,
} from "@/context/consentContext";

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent deve ser usado dentro de ConsentProvider.");
  }

  return context;
}
