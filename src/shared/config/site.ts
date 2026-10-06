const NAME = "João Victor Ventura Martins";

/** Separador dos títulos das abas (nunca travessão). */
const TITLE_SEPARATOR = " :: ";

/** Título de aba: o nome da página (em inglês) seguido do nome do site. */
export function pageTitle(page: string): string {
  return `${page}${TITLE_SEPARATOR}${NAME}`;
}

export const siteConfig = {
  url: "https://joaovictorvm.github.io",
  name: NAME,
  shortName: "João Victor",
  jobTitle: "Software Engineer",
  locale: "pt_BR",
  themeColor: "#1a1a1a",
  ogImage: "/og-image.png",
  contactEmail: "jvmartinscv@gmail.com",
  /** Google Analytics 4 (fluxo Web do site publicado). Não é segredo: vai no HTML. */
  analyticsId: "G-5W15S3E20Y",
  sameAs: [
    "https://www.linkedin.com/in/jvvmartins/",
    "https://github.com/JoaoVictorVM",
    "https://www.instagram.com/jvvmartins.s/",
  ],
  pages: {
    home: {
      title: `${NAME}${TITLE_SEPARATOR}Software Engineer`,
      description:
        "Software Engineer com foco em Frontend. Conheça meus projetos, certificados e os jogos que crio por paixão.",
    },
    certificates: {
      title: pageTitle("Certificates"),
      description: "Certificados e formações de João Victor Ventura Martins.",
    },
    about: {
      title: pageTitle("About"),
      description:
        "Trajetória, forma de trabalhar e interesses de João Victor Ventura Martins além do currículo.",
    },
    projects: {
      title: pageTitle("Projects"),
      description:
        "Projetos de front-end e back-end desenvolvidos por João Victor Ventura Martins.",
    },
    blog: {
      title: pageTitle("Writing"),
      description:
        "Textos de João Victor Ventura Martins sobre desenvolvimento, estudos e o que anda gostando.",
    },
    games: {
      title: pageTitle("GameDev"),
      description:
        "Jogos que João Victor Ventura Martins vem criando por paixão.",
    },
    privacy: {
      title: pageTitle("Privacy"),
      description:
        "Como este site usa cookies e o Google Analytics, e como mudar a sua escolha.",
    },
    links: {
      title: pageTitle("Links"),
      description:
        "Todos os links de João Victor Ventura Martins em um só lugar.",
    },
    notFound: {
      title: pageTitle("Page not found"),
      description: "A página que você procura não existe ou foi movida.",
    },
  },
} as const;
