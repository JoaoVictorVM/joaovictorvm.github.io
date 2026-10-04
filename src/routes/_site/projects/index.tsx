import { createFileRoute } from "@tanstack/react-router";
import { ProjectWheel } from "@/features/projects/components/ProjectWheel";
import { siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";

export const Route = createFileRoute("/_site/projects/")({
  head: () => pageHead({ ...siteConfig.pages.projects, path: "/projects" }),
  // A roda ocupa a tela toda; o rodapé fica recolhido numa gaveta.
  staticData: { footer: "drawer" },
  component: ProjectWheel,
});
