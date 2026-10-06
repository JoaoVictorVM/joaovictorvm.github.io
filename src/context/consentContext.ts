import { createContext } from "react";
import type { ConsentChoice } from "@/types/consent";

export interface ConsentContextValue {
  choice: ConsentChoice;
  /** Falso até a escolha salva ser lida do navegador (o HTML do SSG não a conhece). */
  isResolved: boolean;
  /** Aviso de cookies visível: escolha pendente ou reaberto pelo botão "Cookies". */
  isPromptOpen: boolean;
  grant: () => void;
  deny: () => void;
  openPrompt: () => void;
  closePrompt: () => void;
}

export const ConsentContext = createContext<ConsentContextValue | null>(null);
