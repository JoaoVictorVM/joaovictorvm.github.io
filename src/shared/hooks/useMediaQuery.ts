import { useEffect, useState } from "react";

/**
 * Acompanha uma media query. No HTML do SSG (e até hidratar) vale `false`;
 * depois reflete o aparelho e reage a mudanças (ex.: mouse conectado).
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => {
      setMatches(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, [query]);

  return matches;
}
