import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import { CertificateGroup } from "@/features/certificates/components/CertificateGroup";
import { CertificateRow } from "@/features/certificates/components/CertificateRow";
import {
  certificates as allCertificates,
  formatCertificateDate,
  groupCertificates,
  type Certificate,
} from "@/features/certificates/data/certificates";
import type { CertificateRowHighlight } from "@/features/certificates/hooks/useCertificateHighlight";
import {
  cascadeDelays,
  revealStyle,
} from "@/features/certificates/lib/certificateReveal";
import { cn } from "@/shared/lib/cn";

const allGroupIds = groupCertificates(allCertificates).map(
  (group) => group.institutionId,
);

interface GroupedCertificateListProps {
  /** Certificados já filtrados e ordenados. */
  certificates: readonly Certificate[];
  skipCascade: boolean;
  rowHighlight: (id: string) => CertificateRowHighlight;
}

/** Certificados em grupos recolhíveis, um por instituição. */
export function GroupedCertificateList({
  certificates,
  skipCascade,
  rowHighlight,
}: GroupedCertificateListProps) {
  const { language } = usePreference();
  const { count } = useI18n().certificates;
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
  const delays = cascadeDelays(
    certificateGroups.flatMap((group) => group.certificates),
    language,
  );

  return (
    <Accordion.Root
      type="multiple"
      value={openIds}
      onValueChange={changeOpenIds}
    >
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
            revealDelay={delays.get(firstId) ?? 0}
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
                  style={revealStyle(
                    { title, date },
                    isInstant ? null : (delays.get(certificate.id) ?? 0),
                  )}
                >
                  <CertificateRow
                    title={title}
                    date={date}
                    {...rowHighlight(certificate.id)}
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
