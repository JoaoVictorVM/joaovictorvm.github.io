import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ConsentChoice } from "@/types/consent";
import {
  ConsentContext,
  type ConsentContextValue,
} from "@/context/consentContext";

const CONSENT_STORAGE_KEY = "portfolio-consent";
/** Incrementar quando a política mudar: invalida as escolhas já salvas. */
const CONSENT_VERSION = 1;
/** Validade da escolha: 12 meses. */
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

type DecidedChoice = Exclude<ConsentChoice, "pending">;

interface StoredConsent {
  choice: DecidedChoice;
  version: number;
  decidedAt: number;
}

function isStoredConsent(value: unknown): value is StoredConsent {
  return (
    typeof value === "object" &&
    value !== null &&
    "choice" in value &&
    (value.choice === "granted" || value.choice === "denied") &&
    "version" in value &&
    typeof value.version === "number" &&
    "decidedAt" in value &&
    typeof value.decidedAt === "number"
  );
}

function readStoredChoice(): ConsentChoice {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    const stored: unknown = raw ? JSON.parse(raw) : null;
    if (
      isStoredConsent(stored) &&
      stored.version === CONSENT_VERSION &&
      Date.now() - stored.decidedAt < CONSENT_MAX_AGE_MS
    ) {
      return stored.choice;
    }
  } catch {
    // Storage bloqueado ou valor corrompido: trata como ainda não escolhido.
  }
  return "pending";
}

function storeChoice(choice: DecidedChoice) {
  const stored: StoredConsent = {
    choice,
    version: CONSENT_VERSION,
    decidedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Sem storage, a escolha vale só nesta visita.
  }
}

export function ConsentProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [choice, setChoice] = useState<ConsentChoice>("pending");
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    setChoice(readStoredChoice());
    setIsResolved(true);
  }, []);

  const grant = useCallback(() => {
    storeChoice("granted");
    setChoice("granted");
  }, []);

  const deny = useCallback(() => {
    storeChoice("denied");
    setChoice("denied");
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({ choice, isResolved, grant, deny }),
    [choice, isResolved, grant, deny],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
