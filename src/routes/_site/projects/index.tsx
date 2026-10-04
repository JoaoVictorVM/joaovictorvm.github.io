import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectAccordion } from "@/features/projects/components/ProjectAccordion";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/projects/")({
  head: () => pageHead({ ...siteConfig.pages.projects, path: "/projects" }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, common } = useI18n();
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-16">
      <Container>
        <PageColumn backLabel={common.backToIndex}>
          <PageHeader title={projects.title} subtitle={projects.subtitle} />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <ProjectAccordion />
          </div>
        </PageColumn>
      </Container>
    </section>
  );
}
