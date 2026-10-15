import { useRef } from "react";
import { CertificatePreview } from "@/features/certificates/components/CertificatePreview";
import { FlatCertificateList } from "@/features/certificates/components/FlatCertificateList";
import { GroupedCertificateList } from "@/features/certificates/components/GroupedCertificateList";
import {
  certificates as allCertificates,
  type Certificate,
  type CertificateGrouping,
} from "@/features/certificates/data/certificates";
import { useCertificateHighlight } from "@/features/certificates/hooks/useCertificateHighlight";
import { preloadCertificateImages } from "@/features/certificates/lib/preloadCertificateImages";

interface CertificateListProps {
  /** Certificados já filtrados e ordenados. */
  certificates: readonly Certificate[];
  grouping: CertificateGrouping;
  /**
   * A lista mudou (filtro/ordem/agrupamento): os certificados entram com o
   * fade rápido em vez de refazer a cascata de digitação da primeira entrada.
   */
  skipCascade: boolean;
}

export function CertificateList({
  certificates,
  grouping,
  skipCascade,
}: CertificateListProps) {
  const { highlightedId, rowHighlight } = useCertificateHighlight();
  const hasPreloadedRef = useRef(false);

  const highlightedImage = certificates.find(
    (certificate) => certificate.id === highlightedId,
  )?.image;
  const listProps = { certificates, skipCascade, rowHighlight };

  return (
    <div
      // Primeiro contato com a lista (mouse ou toque): baixa as imagens.
      onPointerEnter={() => {
        if (!hasPreloadedRef.current) {
          hasPreloadedRef.current = true;
          preloadCertificateImages(allCertificates);
        }
      }}
    >
      <CertificatePreview image={highlightedImage} />
      {grouping === "institution" ? (
        <GroupedCertificateList {...listProps} />
      ) : (
        <FlatCertificateList {...listProps} />
      )}
    </div>
  );
}
