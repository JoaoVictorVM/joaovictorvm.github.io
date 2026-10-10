import { useRef, useState, type CSSProperties } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import { CertificateGroup } from "@/features/certificates/components/CertificateGroup";
import { CertificatePreview } from "@/features/certificates/components/CertificatePreview";
import { CertificateRow } from "@/features/certificates/components/CertificateRow";
import {
  certificates as allCertificates,
  formatCertificateDate,
  groupCertificates,
  type Certificate,
} from "@/features/certificates/data/certificates";
import { asset } from "@/shared/lib/asset";
import { cn } from "@/shared/lib/cn";
import { MOUSE_QUERY } from "@/shared/lib/pointer";

const allGroupIds = groupCertificates(allCertificates).map(
  (group) => group.institutionId,
);

/** Baixa as imagens de uma vez, para a troca no hover ser instantânea. */
function preloadImages(list: readonly Certificate[]) {
  for (const certificate of list) {
    if (certificate.image) {
      new Image().src = asset(certificate.image.src);
    }
  }
}

const TYPE_CHAR = 35;
const CASCADE_OVERLAP = 0.55;
const CASCADE_GAP = 80;

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
  const { language } = usePreference();
  const { count } = useI18n().certificates;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // O preview com a imagem do certificado só existe com mouse.
  const hasMouse = useMediaQuery(MOUSE_QUERY);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const hasPreloadedRef = useRef(false);
  const [openIds, setOpenIds] = useState<string[]>(allGroupIds);
  // Grupos já recolhidos ao menos uma vez: ao reabrir, os certificados entram
  // com um fade rápido em vez de esperar de novo a cascata de digitação.
  const [collapsedIds, setCollapsedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  function changeOpenIds(nextIds: string[]) {
    const closedIds = openIds.filter((id) => !nextIds.includes(id));
    if (closedIds.length > 0) {
      setCollapsedIds((current) => new Set([...current, ...closedIds]));
    }
    setOpenIds(nextIds);
  }

  const certificateGroups = groupCertificates(certificates);
  const seqDelayById = new Map<string, number>();
  let cascadeDelay = 0;
  for (const group of certificateGroups) {
    for (const certificate of group.certificates) {
      seqDelayById.set(certificate.id, cascadeDelay);
      cascadeDelay +=
        certificate.title[language].length * TYPE_CHAR * CASCADE_OVERLAP +
        CASCADE_GAP;
    }
  }

  const hoveredImage = certificates.find(
    (certificate) => certificate.id === hoveredId,
  )?.image;

  return (
    <Accordion.Root
      type="multiple"
      value={openIds}
      onValueChange={changeOpenIds}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") {
          return;
        }
        setIsPointerInside(true);
        if (!hasPreloadedRef.current) {
          hasPreloadedRef.current = true;
          preloadImages(allCertificates);
        }
      }}
      onPointerLeave={() => {
        setIsPointerInside(false);
      }}
    >
      {hasMouse && (
        <CertificatePreview image={hoveredImage} isTracking={isPointerInside} />
      )}
      {certificateGroups.map((group) => {
        const total = group.certificates.length;
        const isInstant = skipCascade || collapsedIds.has(group.institutionId);
        const firstId = group.certificates[0]?.id ?? "";

        return (
          <CertificateGroup
            key={group.institutionId}
            value={group.institutionId}
            institution={group.institution}
            summary={`${String(total)} ${total === 1 ? count.one : count.other}`}
            isOpen={openIds.includes(group.institutionId)}
            revealDelay={seqDelayById.get(firstId) ?? 0}
            onExpand={() => {
              changeOpenIds([...openIds, group.institutionId]);
            }}
          >
            {group.certificates.map((certificate, index) => {
              const title = certificate.title[language];
              const date = formatCertificateDate(
                certificate.issuedAt,
                language,
              );

              return (
                <div
                  key={certificate.id}
                  className={cn(isInstant && "accordion-reveal")}
                  style={
                    {
                      "--seq-delay": `${String(isInstant ? 0 : (seqDelayById.get(certificate.id) ?? 0))}ms`,
                      "--title-chars": isInstant ? 0 : title.length,
                      "--date-chars": isInstant ? 0 : date.length,
                    } as CSSProperties
                  }
                >
                  <CertificateRow
                    title={title}
                    date={date}
                    isDimmed={
                      hoveredId !== null && hoveredId !== certificate.id
                    }
                    onHoverChange={(isHovered) => {
                      setHoveredId(isHovered ? certificate.id : null);
                    }}
                  />
                  {index < total - 1 && (
                    <div className="project-line ml-6 md:ml-0" />
                  )}
                </div>
              );
            })}
          </CertificateGroup>
        );
      })}
    </Accordion.Root>
  );
}
