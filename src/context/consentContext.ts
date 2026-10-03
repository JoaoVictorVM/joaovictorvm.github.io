import { createContext } from "react";
import type { ConsentChoice } from "@/types/consent";

export interface ConsentContextValue {
  choice: ConsentChoice;
  /** Falso até a escolha salva ser lida do navegador (o HTML do SSG não a conhece). */
  isResolved: boolean;
  grant: () => void;
  deny: () => void;
}

export const ConsentContext = createContext<ConsentContextValue | null>(null);
