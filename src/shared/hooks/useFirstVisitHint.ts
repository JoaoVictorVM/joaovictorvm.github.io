import { useCallback, useEffect, useState } from "react";

interface UseFirstVisitHintOptions {
  /** Chave no sessionStorage que marca a dica como já exibida nesta sessão. */
  storageKey: string;
  /** Espera (ms) antes de exibir, para não competir com a animação de entrada. */
  delayMs: number;
  /** Tempo (ms) que a dica fica visível. */
  durationMs: number;
}

function hasSeenHint(storageKey: string): boolean {
  try {
    return window.sessionStorage.getItem(storageKey) === "seen";
  } catch {
    return false;
  }
}

function markHintAsSeen(storageKey: string) {
  try {
    window.sessionStorage.setItem(storageKey, "seen");
  } catch {
    // Sem storage (aba privada, bloqueio): a dica volta a aparecer, sem prejuízo.
  }
}

/**
 * Exibe uma dica uma vez por sessão do navegador em aparelhos sem hover (toque),
 * onde ela não pode aparecer ao passar o mouse. Some sozinha após `durationMs`
 * ou no primeiro toque em qualquer lugar. Fechar o navegador encerra a sessão
 * (sessionStorage), então a dica volta na próxima visita.
 */
export function useFirstVisitHint({
  storageKey,
  delayMs,
  durationMs,
}: UseFirstVisitHintOptions) {
  const [isVisible, setIsVisible] = useState(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover || hasSeenHint(storageKey)) {
      return;
    }

    let hideTimer: number | undefined;
    // A marcação acontece ao exibir, não ao montar: assim o efeito duplo do
    // StrictMode em desenvolvimento não consome a dica antes de ela aparecer.
    const showTimer = window.setTimeout(() => {
      markHintAsSeen(storageKey);
      setIsVisible(true);
      hideTimer = window.setTimeout(dismiss, durationMs);
    }, delayMs);

    document.addEventListener("pointerdown", dismiss);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [storageKey, delayMs, durationMs, dismiss]);

  return isVisible;
}
