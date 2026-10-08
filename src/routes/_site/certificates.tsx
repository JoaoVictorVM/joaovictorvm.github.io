import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { CertificateList } from "@/features/certificates/components/CertificateList";
import {
  certificates as allCertificates,
  sortCertificates,
} from "@/features/certificates/data/certificates";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/certificates")({
  head: () =>
    pageHead({ ...siteConfig.pages.certificates, path: "/certificates" }),
  component: CertificatesPage,
});

function CertificatesPage() {
  const { certificates, common } = useI18n();
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-16">
      <Container>
        <PageColumn backLabel={common.backToIndex}>
          <PageHeader
            title={certificates.title}
            subtitle={certificates.subtitle}
          />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <CertificateList
              certificates={sortCertificates(allCertificates, "recent")}
              skipCascade={false}
            />
          </div>
        </PageColumn>
      </Container>
    </section>
  );
}
