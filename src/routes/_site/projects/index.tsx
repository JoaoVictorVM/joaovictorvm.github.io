import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterResults } from "@/components/ui/FilterResults";
import { ProjectControls } from "@/features/projects/components/ProjectControls";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import {
  filterProjects,
  projects as allProjects,
} from "@/features/projects/data/projects";
import { useProjectView } from "@/features/projects/hooks/useProjectView";
import { validateProjectSearch } from "@/features/projects/lib/projectSearch";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/projects/")({
  validateSearch: validateProjectSearch,
  head: () => pageHead({ ...siteConfig.pages.projects, path: "/projects" }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, common } = useI18n();
  const { ref, isVisible } = useReveal();
  const view = useProjectView();
  const shown = filterProjects(allProjects, view.filter);

  return (
    <section className="py-16">
      <Container>
        <PageColumn backLabel={common.backToIndex}>
          <PageHeader
            title={projects.title}
            subtitle={projects.subtitle}
            action={<ProjectControls view={view} />}
          />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <FilterResults
              shown={shown.length}
              total={allProjects.length}
              noun={projects.count}
              isActive={view.filter !== undefined}
              onClear={() => {
                view.setFilter(undefined);
              }}
            />
            <ProjectGrid projects={shown} />
          </div>
        </PageColumn>
      </Container>
    </section>
  );
}
