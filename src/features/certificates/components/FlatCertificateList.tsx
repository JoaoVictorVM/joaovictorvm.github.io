import { usePreference } from "@/shared/hooks/usePreference";
import { CertificateRow } from "@/features/certificates/components/CertificateRow";
import {
  formatCertificateDate,
  type Certificate,
} from "@/features/certificates/data/certificates";
import type { CertificateRowHighlight } from "@/features/certificates/hooks/useCertificateHighlight";
import {
  cascadeDelays,
  revealStyle,
} from "@/features/certificates/lib/certificateReveal";
import { cn } from "@/shared/lib/cn";

interface FlatCertificateListProps {
  /** Certificados já filtrados e ordenados. */
  certificates: readonly Certificate[];
  skipCascade: boolean;
  rowHighlight: (id: string) => CertificateRowHighlight;
}

/**
 * Certificados numa lista única, na ordem recebida, com a instituição em cada
 * linha: na coluna da esquerda (como no modo agrupado) ou, no celular, acima
 * do título.
 */
export function FlatCertificateList({
  certificates,
  skipCascade,
  rowHighlight,
}: FlatCertificateListProps) {
  const { language } = usePreference();
  const delays = cascadeDelays(certificates, language);
  const total = certificates.length;

  return (
    <>
      <div className="group-line" />
      <ul>
        {certificates.map((certificate, index) => {
          const title = certificate.title[language];
          const date = formatCertificateDate(certificate.issuedAt, language);

          return (
            <li
              key={certificate.id}
              className={cn(
                "md:grid-certificate md:grid",
                skipCascade && "fast-fade-up visible",
              )}
              style={revealStyle(
                { title, date, institution: certificate.institution },
                skipCascade ? null : (delays.get(certificate.id) ?? 0),
              )}
            >
              <span className="project-institution text-detail inline-block px-2 pt-4 text-xs md:justify-self-start md:px-0 md:py-4 md:text-sm">
                {certificate.institution}
              </span>
              <div className="min-w-0">
                <CertificateRow
                  title={title}
                  date={date}
                  className="pt-1 md:pt-4"
                  {...rowHighlight(certificate.id)}
                />
                {index < total - 1 && (
                  <div className="project-line ml-6 md:ml-0" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
