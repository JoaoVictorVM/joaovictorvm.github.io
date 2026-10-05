import { useId, useRef } from "react";

import { iconButtonClassName } from "@/components/ui/iconButton";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Botão "!" que abre o modal de informações. Usa o `<dialog>` nativo em modo
 * modal: foco preso no diálogo, Esc fecha e o restante da página fica inerte.
 * Clicar no fundo (fora do quadro) também fecha. Conteúdo provisório por ora.
 */
export function InfoDialog() {
  const t = useI18n().nav.info;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        aria-label={t.label}
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
        className={iconButtonClassName}
      >
        <span aria-hidden className="text-sm">
          !
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          // O clique no fundo chega com o próprio <dialog> como alvo.
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        className="border-line bg-bg text-text backdrop:bg-bg/80 m-auto w-full max-w-sm rounded-lg border"
      >
        {/* O respiro fica num div interno: clique no padding do <dialog> teria
            o próprio diálogo como alvo e fecharia como se fosse o fundo. */}
        <div className="p-6">
          <h2 id={titleId} className="text-lg">
            {t.title}
          </h2>
          <p className="text-detail mt-2 text-sm">{t.body}</p>
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
            }}
            className="border-line hover:border-text mt-6 cursor-pointer rounded-full border px-4 py-1.5 text-xs transition-colors"
          >
            {t.close}
          </button>
        </div>
      </dialog>
    </>
  );
}
