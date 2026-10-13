import { useRef } from "react";
import { CertificatePreview } from "@/features/certificates/components/CertificatePreview";
import { GroupedCertificateList } from "@/features/certificates/components/GroupedCertificateList";
import {
  certificates as allCertificates,
  type Certificate,
} from "@/features/certificates/data/certificates";
import { useCertificateHighlight } from "@/features/certificates/hooks/useCertificateHighlight";
import { asset } from "@/shared/lib/asset";

/** Baixa as imagens de uma vez, para a troca no hover ser instantânea. */
function preloadImages(list: readonly Certificate[]) {
  for (const certificate of list) {
    if (certificate.image) {
      new Image().src = asset(certificate.image.src);
    }
  }
}

interface CertificateListProps {
  /** Certificados já filtrados e ordenados. */
  certificates: readonly Certificate[];
  /**
   * A lista mudou (filtro/ordem): os certificados entram com o fade rápido em
   * vez de refazer a cascata de digitação da primeira entrada.
   */
  skipCascade: boolean;
}

export function CertificateList({
  certificates,
  skipCascade,
}: CertificateListProps) {
  const { highlightedId, rowHighlight } = useCertificateHighlight();
  const hasPreloadedRef = useRef(false);

  const highlightedImage = certificates.find(
    (certificate) => certificate.id === highlightedId,
  )?.image;

  return (
    <div
      // Primeiro contato com a lista (mouse ou toque): baixa as imagens.
      onPointerEnter={() => {
        if (!hasPreloadedRef.current) {
          hasPreloadedRef.current = true;
          preloadImages(allCertificates);
        }
      }}
    >
      <CertificatePreview image={highlightedImage} />
      <GroupedCertificateList
        certificates={certificates}
        skipCascade={skipCascade}
        rowHighlight={rowHighlight}
      />
    </div>
  );
}
