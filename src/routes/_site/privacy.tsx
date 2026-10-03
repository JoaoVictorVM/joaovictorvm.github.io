import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrivacyContent } from "@/features/privacy/components/PrivacyContent";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/privacy")({
  head: () => pageHead({ ...siteConfig.pages.privacy, path: "/privacy" }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { privacy, common } = useI18n();
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-16">
      <Container>
        <PageColumn backLabel={common.backToIndex}>
          <PageHeader title={privacy.title} subtitle={privacy.subtitle} />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <PrivacyContent />
          </div>
        </PageColumn>
      </Container>
    </section>
  );
}
