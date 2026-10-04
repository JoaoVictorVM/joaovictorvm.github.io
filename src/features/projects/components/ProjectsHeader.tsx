import { Container } from "@/components/layout/Container";
import { PageColumn } from "@/components/layout/PageColumn";
import { PageHeader } from "@/components/layout/PageHeader";
import { useI18n } from "@/shared/hooks/useI18n";

/** Topo da página de projetos: "← Index", título e subtítulo. */
export function ProjectsHeader() {
  const { projects, common } = useI18n();

  return (
    <Container>
      <PageColumn backLabel={common.backToIndex}>
        <PageHeader title={projects.title} subtitle={projects.subtitle} />
      </PageColumn>
    </Container>
  );
}
