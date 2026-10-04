import {
  allProjectsCallout,
  projects,
  type Project,
  type ProjectsCallout,
} from "@/features/projects/data/projects";

/** Item exibido na vitrine de projetos: um projeto ou o convite final para o GitHub. */
export type ShowcaseItem =
  | { kind: "project"; key: string; project: Project }
  | { kind: "callout"; key: string; callout: ProjectsCallout };

export const showcaseItems: readonly ShowcaseItem[] = [
  ...projects.map((project): ShowcaseItem => ({
    kind: "project",
    key: project.id,
    project,
  })),
  { kind: "callout", key: "all-projects", callout: allProjectsCallout },
];
