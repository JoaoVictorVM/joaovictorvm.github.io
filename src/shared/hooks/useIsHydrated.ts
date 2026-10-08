import { useSyncExternalStore } from "react";

/** Nada a observar: o valor só muda uma vez, da hidratação para o cliente. */
function subscribe() {
  return unsubscribe;
}

function unsubscribe() {
  // Não há assinatura para desfazer.
}

/**
 * `false` no HTML do SSG e durante a hidratação; `true` logo depois. Serve para
 * só aplicar o que depende do navegador (como a query da URL, que o
 * pré-render não conhece) depois de hidratar, sem divergir do HTML.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
