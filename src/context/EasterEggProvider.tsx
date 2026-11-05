import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  EasterEggContext,
  easterEggIds,
  type EasterEggId,
} from "@/context/easterEggContext";

export function EasterEggProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [found, setFound] = useState<readonly EasterEggId[]>([]);

  const discover = useCallback((id: EasterEggId) => {
    setFound((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const value = useMemo(
    () => ({
      foundCount: found.length,
      totalCount: easterEggIds.length,
      discover,
    }),
    [found.length, discover],
  );

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  );
}
