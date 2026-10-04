/**
 * Nome da View Transition que liga o card central da roda à coluna da página do
 * projeto (o card "cresce" até virar a página e encolhe na volta). Precisa casar
 * com o seletor `.project-hero` em animations.css.
 */
export const PROJECT_HERO_TRANSITION = "project-hero";

/**
 * Último projeto aberto, em memória durante a navegação: a roda volta centralizada
 * nele. Não sobrevive a um reload, e nem precisa, porque só serve para a volta.
 */
let lastViewedProject: string | null = null;

export function rememberProject(slug: string) {
  lastViewedProject = slug;
}

export function getLastViewedProject(): string | null {
  return lastViewedProject;
}
