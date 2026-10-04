import {
  DisclosureList,
  type DisclosureItem,
} from "@/components/ui/DisclosureList";
import {
  allProjectsCallout,
  projects,
} from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";

export function ProjectAccordion() {
  const { language } = usePreference();

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
