import { useEffect, useRef } from "react";
import { Cookie } from "lucide-react";
import { useConsent } from "@/shared/hooks/useConsent";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Botão de cookies no canto inferior esquerdo (só a partir de `xl`, onde a
 * navegação vira cantos fixos): só o ícone, que se alarga mostrando "Cookies"
 * no hover/foco, e reabre o aviso de cookies em qualquer página.
 * Sai de cena enquanto o aviso está aberto, que ocupa o mesmo canto, e recebe o
 * foco de volta quando o aviso que ele abriu é fechado.
 */
export function ConsentTrigger() {
  const { isResolved, isPromptOpen, openPrompt } = useConsent();
  const t = useI18n().consent;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedPromptRef = useRef(false);

  // O botão volta a ser montado ao fechar o aviso; a ref já está ligada
  // quando o efeito roda.
  useEffect(() => {
    if (!isPromptOpen && hasOpenedPromptRef.current) {
      hasOpenedPromptRef.current = false;
      buttonRef.current?.focus();
    }
  }, [isPromptOpen]);

  // Antes de ler a escolha salva não dá para saber se o aviso vai abrir.
  if (!isResolved || isPromptOpen) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => {
        hasOpenedPromptRef.current = true;
        openPrompt();
      }}
      className="group fast-fade-up border-line bg-bg text-text hover:border-text visible fixed bottom-16 left-8 z-40 hidden h-9 cursor-pointer items-center rounded-lg border px-2.25 text-xs transition-colors xl:flex"
    >
      <Cookie size={16} aria-hidden className="shrink-0" />
      {/* Só o ícone em repouso; o texto abre ao passar o mouse ou focar pelo
          teclado. Escondido por largura (não display), segue sendo o nome
          acessível do botão. */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-20 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-20 group-focus-visible:opacity-100 motion-reduce:transition-none">
        {t.trigger}
      </span>
    </button>
  );
}
