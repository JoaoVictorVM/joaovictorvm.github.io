import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterResults } from "@/components/ui/FilterResults";
import { CertificateControls } from "@/features/certificates/components/CertificateControls";
import { CertificateList } from "@/features/certificates/components/CertificateList";
import {
  certificates as allCertificates,
  filterCertificates,
  sortCertificates,
} from "@/features/certificates/data/certificates";
import { useCertificateView } from "@/features/certificates/hooks/useCertificateView";
import { validateCertificateSearch } from "@/features/certificates/lib/certificateSearch";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/certificates")({
  validateSearch: validateCertificateSearch,
  head: () =>
    pageHead({ ...siteConfig.pages.certificates, path: "/certificates" }),
  component: CertificatesPage,
});

function CertificatesPage() {
  const { certificates, common } = useI18n();
  const { ref, isVisible } = useReveal();
  const view = useCertificateView();
  const shown = sortCertificates(
    filterCertificates(allCertificates, view.filter),
    view.sort,
  );

  return (
    <section className="py-16">
      <Container>
        <PageColumn backLabel={common.backToIndex}>
          <PageHeader
            title={certificates.title}
            subtitle={certificates.subtitle}
            action={<CertificateControls view={view} />}
          />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <FilterResults
              shown={shown.length}
              total={allCertificates.length}
              noun={certificates.count}
              isActive={!view.isDefault}
              onClear={view.reset}
            />
            {shown.length > 0 ? (
              <CertificateList
                certificates={shown}
                skipCascade={view.hasChanged}
              />
            ) : (
              <p className="text-detail text-sm">
                {certificates.controls.empty}
              </p>
            )}
          </div>
        </PageColumn>
      </Container>
    </section>
  );
}
