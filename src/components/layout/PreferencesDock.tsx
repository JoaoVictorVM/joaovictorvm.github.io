import { Container } from "@/components/layout/Container";
import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

/**
 * Camada fixa que posiciona o menu de preferências na margem direita da coluna,
 * na altura do primeiro título da página (todas começam em `pt-16`), e o mantém
 * visível durante o scroll. Só o botão recebe eventos de ponteiro; o resto da
 * camada deixa passar cliques para a página.
 */
export function PreferencesDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <Container>
        <div className="header-enter flex justify-end pt-16">
          <PreferencesMenu />
        </div>
      </Container>
    </div>
  );
}
