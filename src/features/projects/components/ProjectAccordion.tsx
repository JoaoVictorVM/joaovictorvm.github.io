import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  DisclosureList,
  type DisclosureItem,
} from "@/components/ui/DisclosureList";
import {
  allProjectsCallout,
  projects,
} from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";

export function ProjectAccordion() {
  const { language } = usePreference();
  const t = useI18n().projects;

  const items: DisclosureItem[] = projects.map((project) => ({
    id: project.id,
    title: project.title[language],
    body: project.details[language],
    tags: project.stack,
    tagsLabel: "Stack",
    links: project.links?.map((link) => ({
      label: link.label[language],
      url: link.url,
    })),
    // Acesso temporário à página do projeto, até a lista virar o carrossel.
    cta: (
      <Link
        to="/projects/$slug"
        params={{ slug: project.id }}
        className="text-text decoration-text/30 hover:decoration-text inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
      >
        {t.viewProject}
        <ArrowRight size={14} aria-hidden />
      </Link>
    ),
  }));

  items.push({
    id: "all-projects",
    title: allProjectsCallout.title[language],
    body: allProjectsCallout.details[language],
    links: [
      {
        label: allProjectsCallout.link.label[language],
        url: allProjectsCallout.link.url,
      },
    ],
  });

  return <DisclosureList items={items} />;
}
