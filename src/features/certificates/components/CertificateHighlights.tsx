import { useRef } from "react";
import { CertificatePreview } from "@/features/certificates/components/CertificatePreview";
import {
  formatCertificateDate,
  getFeaturedCertificates,
} from "@/features/certificates/data/certificates";
import {
  highlightTriggerProps,
  useCertificateHighlight,
} from "@/features/certificates/hooks/useCertificateHighlight";
import { preloadCertificateImages } from "@/features/certificates/lib/preloadCertificateImages";
import { useI18n } from "@/shared/hooks/useI18n";
import { usePreference } from "@/shared/hooks/usePreference";

const featuredCertificates = getFeaturedCertificates();

/**
 * Certificados em destaque na home. O título mostra a imagem do certificado no
 * hover (toque no celular); o sublinhado pontilhado indica que há algo ali.
 */
export function CertificateHighlights() {
  const { language } = usePreference();
  const { highlightSummary } = useI18n().certificates;
  const { highlightedId, rowHighlight } = useCertificateHighlight();
  const hasPreloadedRef = useRef(false);

  const highlightedImage = featuredCertificates.find(
    (certificate) => certificate.id === highlightedId,
  )?.image;

  return (
    <div
      className="space-y-6"
      // Primeiro contato com o bloco (mouse ou toque): baixa as imagens.
      onPointerEnter={() => {
        if (!hasPreloadedRef.current) {
          hasPreloadedRef.current = true;
          preloadCertificateImages(featuredCertificates);
        }
      }}
    >
      <CertificatePreview image={highlightedImage} />
      {featuredCertificates.map((certificate) => (
        <article key={certificate.id} className="space-y-1.5">
          <h3 className="text-text font-normal">
            <span
              {...highlightTriggerProps(rowHighlight(certificate.id))}
              className="decoration-text/30 hover:decoration-text underline decoration-dotted underline-offset-4 transition-colors hover:decoration-solid"
            >
              {certificate.title[language]}
            </span>
          </h3>
          <p className="text-detail text-sm">
            {highlightSummary(
              certificate.institution,
              formatCertificateDate(certificate.issuedAt, language),
            )}
          </p>
        </article>
      ))}
    </div>
  );
}
