import { useState } from "react";
import { ConsentActions } from "@/components/layout/ConsentActions";
import { useConsent } from "@/shared/hooks/useConsent";
import { useI18n } from "@/shared/hooks/useI18n";

/** Estado atual do consentimento e os controles para mudá-lo. */
export function ConsentChoice() {
  const { choice, isResolved } = useConsent();
  const t = useI18n().privacy.choice;
  const [hasSaved, setHasSaved] = useState(false);

  return (
    <>
      <p>
        {t.currentLabel}:{" "}
        {/* Até ler o navegador a escolha é desconhecida (o HTML do SSG não a tem). */}
        <span className="text-detail">
          {isResolved ? t.states[choice] : "…"}
        </span>
      </p>
      <ConsentActions
        onChoice={() => {
          setHasSaved(true);
        }}
      />
      <p role="status" className="text-detail text-sm">
        {hasSaved ? t.saved : ""}
      </p>
      <p className="text-detail text-sm">{t.validity}</p>
    </>
  );
}
