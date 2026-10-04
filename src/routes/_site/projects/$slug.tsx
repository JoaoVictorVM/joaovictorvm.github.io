import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { NotFound } from "@/components/layout/NotFound";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectDetail } from "@/features/projects/components/ProjectDetail";
import { getProjectBySlug } from "@/features/projects/data/projects";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/projects/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);

    if (!project) {
      return pageHead({
        ...siteConfig.pages.notFound,
        path: `/projects/${params.slug}`,
      });
    }

    return pageHead({
      title: `${project.title.pt} — ${siteConfig.name}`,
      description: project.summary.pt,
      path: `/projects/${project.id}`,
    });
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { projects } = useI18n();
  const { language } = usePreference();
  const { ref, isVisible } = useReveal();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <article className="py-16">
      <Container>
        <PageColumn backLabel={projects.backToProjects} backTo="/projects">
          <PageHeader
            title={project.title[language]}
            subtitle={project.summary[language]}
          />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <ProjectDetail project={project} />
          </div>
        </PageColumn>
      </Container>
    </article>
  );
}
