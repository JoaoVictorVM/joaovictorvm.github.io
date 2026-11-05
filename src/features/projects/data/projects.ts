export interface LocalizedText {
  pt: string;
  en: string;
}

/** `repository`: código no GitHub; `live`: o projeto no ar (site, jogo). */
export type ProjectLinkKind = "repository" | "live";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: LocalizedText;
  url: string;
}

export interface ProjectImage {
  /** Caminho a partir de `public/` (ex.: "media/projects/jotta/cover.webp"). */
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
}

export interface ProjectVideo {
  /** Caminho do vídeo a partir de `public/`. */
  src: string;
  label: LocalizedText;
}

/** Tecnologias principais, usadas no filtro da página de projetos. */
export const projectTechnologies = [
  "go",
  "react",
  "typescript",
  "javascript",
  "nestjs",
  "python",
] as const;
export type ProjectTechnology = (typeof projectTechnologies)[number];

/** Nomes próprios: iguais em PT e EN. */
export const technologyLabels: Record<ProjectTechnology, string> = {
  go: "Go",
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  nestjs: "NestJS",
  python: "Python",
};

export interface Project {
  /** Também é o slug da página: `/projects/<id>`. */
  id: string;
  title: LocalizedText;
  /** Uma frase: subtítulo da página e descrição de SEO. */
  summary: LocalizedText;
  details: LocalizedText;
  /** Linguagens e frameworks principais (o filtro); a lista completa é `stack`. */
  technologies: ProjectTechnology[];
  stack?: string[];
  links?: ProjectLink[];
  /** Capa do card na grade e da página do projeto. */
  cover?: ProjectImage;
  previewVideo?: ProjectVideo;
  gallery?: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "jotta",
    title: { pt: "Jotta", en: "Jotta" },
    summary: {
      pt: "Harness open-source para desenvolvimento com IA guiado por especificações, com contexto progressivo e controle de orçamento.",
      en: "Open-source harness for spec-driven AI development, with progressive context and budget controls.",
    },
    details: {
      pt: "Harness open-source que estrutura o desenvolvimento assistido por IA, conectando PRD, especificações, planos, implementação e entrega verificada. Combina instruções para agentes, skills e um runtime em Python, com carregamento progressivo de contexto para fornecer a cada tarefa apenas as informações necessárias. Mantém estado recuperável em JSON e checkpoints locais para retomar o trabalho entre sessões. Oferece três perfis de execução (manual-classic, lean e strict), validações de qualidade configuráveis, limites de orçamento e roteamento de modelos entre OpenAI, Anthropic ou o provedor herdado da plataforma. Integra GitHub e worktrees gerenciadas pelo Orca para entregas autônomas, preservando o trabalho bloqueado para inspeção. Documentos de planejamento e estado de execução permanecem locais ao projeto consumidor, e o instalador verifica conflitos antes de copiar os arquivos. Inclui verificações de repositório, autotestes e CI com GitHub Actions.",
      en: "Open-source harness that structures AI-assisted development, connecting PRDs, specifications, plans, implementation and verified delivery. Combines agent instructions, skills and a Python runtime, with progressive context loading to give each task only the information it needs. Keeps recoverable JSON state and local checkpoints to resume work across sessions. Offers three execution profiles (manual-classic, lean and strict), configurable quality checks, budget limits and model routing across OpenAI, Anthropic or the provider inherited from the platform. Integrates GitHub and Orca-managed worktrees for autonomous delivery, preserving blocked work for inspection. Planning documents and execution state stay local to the consumer project, and the installer checks for conflicts before copying files. Includes repository checks, self-tests and CI with GitHub Actions.",
    },
    technologies: ["python"],
    cover: {
      src: "media/projects/jotta/jotta.webp",
      alt: { pt: "Apresentação do Jotta", en: "Jotta overview" },
      width: 1672,
      height: 941,
    },
    stack: [
      "Python",
      "Markdown",
      "JSON",
      "YAML",
      "Git",
      "Orca CLI",
      "GitHub Actions",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/jotta",
      },
    ],
  },
  {
    id: "lastro",
    title: { pt: "Lastro", en: "Lastro" },
    summary: {
      pt: "Harness open-source em Python para testes exploratórios supervisionados por IA em aplicações web, com foco em evidências.",
      en: "Open-source Python harness for supervised AI exploratory testing of web applications, focused on evidence.",
    },
    details: {
      pt: "Projeto open-source em desenvolvimento para estruturar testes exploratórios de aplicações web com agentes de IA supervisionados e conclusões apoiadas em evidências. Construído em Python, reúne uma CLI com Typer, configuração tipada com Pydantic, autenticação por scripts Playwright e histórico local em SQLite. Inclui uma aplicação de demonstração em FastAPI com defeitos intencionais para exercitar fluxos de teste, além de missões em texto ou Markdown e skills de exploração, heurísticas de QA e reprodução. A arquitetura contempla ferramentas de navegador via MCP, políticas de execução, memória persistente e relatórios rastreáveis. O runtime completo de execução de missões e as etapas de aprovação humana seguem em desenvolvimento, conforme o roadmap do projeto.",
      en: "Open-source project in development to structure exploratory testing of web applications with supervised AI agents and evidence-backed conclusions. Built in Python, it brings together a Typer CLI, typed configuration with Pydantic, authentication through Playwright scripts and local SQLite history. Includes a FastAPI demo application with intentionally seeded defects to exercise test flows, alongside text or Markdown missions and skills for exploration, QA heuristics and reproduction. The architecture covers browser tools through MCP, execution policies, persistent memory and traceable reports. The full mission execution runtime and human approval stages remain in development, following the project roadmap.",
    },
    technologies: ["python"],
    cover: {
      src: "media/projects/lastro/lastro.webp",
      alt: { pt: "Apresentação do Lastro", en: "Lastro overview" },
      width: 1672,
      height: 941,
    },
    stack: [
      "Python",
      "Typer",
      "Pydantic",
      "Playwright",
      "MCP",
      "FastAPI",
      "SQLite",
      "pytest",
      "Ruff",
      "uv",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/lastro",
      },
    ],
  },
  {
    id: "comporta",
    title: { pt: "Comporta", en: "Comporta" },
    summary: {
      pt: "LLM Gateway open-source em Desenvolvimento",
      en: "Open-source LLM Gateway in Development",
    },
    details: {
      pt: "LLM Gateway open-source em Desenvolvimento",
      en: "Open-source LLM Gateway in Development",
    },
    technologies: [],
    cover: {
      src: "media/projects/comporta/comporta.webp",
      alt: { pt: "Apresentação do Comporta", en: "Comporta overview" },
      width: 1672,
      height: 941,
    },
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/comporta",
      },
    ],
  },
  {
    id: "code-whispers",
    title: { pt: "Code Whispers", en: "Code Whispers" },
    summary: {
      pt: "Jogo multiplayer de telefone sem fio do código, com Duelo e partidas de até 8 jogadores via WebRTC.",
      en: "Multiplayer coding telephone game, with Duel mode and matches for up to 8 players over WebRTC.",
    },
    details: {
      pt: "Jogo multiplayer no navegador em que os participantes escrevem, explicam e reescrevem código para descobrir como a ideia original muda no caminho. No Duelo, dois jogadores trocam trechos de código, explicam o que receberam e avaliam a interpretação do outro. No Telefone sem fio, de 3 a 8 jogadores alternam entre código e descrições, vendo apenas a etapa anterior até a revelação coletiva. Construído com TypeScript strict, Vite e Tailwind CSS, sem backend próprio, usa WebRTC via Trystero com sinalização por relays Nostr públicos. No modo em grupo, o host coordena as etapas, valida as respostas e envia a cada participante apenas o conteúdo necessário. A arquitetura separa regras puras de protocolo, sincronização de rede, estado e telas. Inclui editor CodeMirror 6 com destaque de sintaxe para oito linguagens, animações com GSAP, sons sintetizados via Web Audio API e testes com Vitest e jsdom. Distribuído como pacote estático no itch.io, sem cadastro ou instalação; os trechos de código nunca são executados.",
      en: "Browser multiplayer game where participants write, explain and rewrite code to discover how the original idea changes along the way. In Duel mode, two players exchange code snippets, explain what they received and judge each other's interpretation. In Telephone mode, 3 to 8 players alternate between code and descriptions, seeing only the previous step until the shared reveal. Built with strict TypeScript, Vite and Tailwind CSS, with no dedicated backend, it uses WebRTC through Trystero with signaling over public Nostr relays. In group mode, the host coordinates steps, validates answers and sends each participant only the content they need. The architecture separates pure protocol rules, network synchronization, state and screens. Includes a CodeMirror 6 editor with syntax highlighting for eight languages, GSAP animations, sounds synthesized through the Web Audio API and tests with Vitest and jsdom. Distributed as a static package on itch.io, with no registration or installation; code snippets are never executed.",
    },
    technologies: ["typescript"],
    cover: {
      src: "media/projects/code-whispers/cover.webp",
      alt: { pt: "Capa do Code Whispers", en: "Code Whispers cover" },
      width: 1260,
      height: 1000,
    },
    previewVideo: {
      src: "media/projects/code-whispers/code-whispers.mp4",
      label: {
        pt: "Demonstração do Code Whispers",
        en: "Code Whispers demo",
      },
    },
    stack: [
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "CodeMirror 6",
      "Trystero",
      "WebRTC",
      "Nostr",
      "GSAP",
      "canvas-confetti",
      "Web Audio API",
      "Vitest",
      "jsdom",
      "Bun",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/code-whispers",
      },
      {
        kind: "live",
        label: { pt: "Jogo", en: "Game" },
        url: "https://joaovictorvm.itch.io/code-whispers",
      },
    ],
  },
  {
    id: "focuzen",
    title: { pt: "Focuzen", en: "Focuzen" },
    summary: {
      pt: "Aplicação de foco minimalista com tela web e TUI de terminal, em um monorepo Go + React.",
      en: "Minimalist focus app with a web screen and a terminal TUI, in a Go + React monorepo.",
    },
    details: {
      pt: "Aplicação de foco minimalista construída como monorepo (Go + React), com duas frentes que compõem o mesmo produto: uma tela de foco na web (relógio em destaque, busca no YouTube e player de áudio embutido com o vídeo oculto) e uma TUI de terminal com rádios de foco via streams MP3. MVP deliberadamente enxuto, sem contas de usuário e sem banco de dados, com estado local, priorizando qualidade de engenharia acima de features: testes automatizados em todos os módulos, backend em Go servindo a SPA via embed.FS com chi e log/slog, imagem Docker distroless non-root, deploy via Blueprint na Render, CI/CD com GitHub Actions e versionamento automatizado com Conventional Commits e release-please. Arquitetura documentada com diagramas C4 e ADRs, cobrindo desde o contexto de negócio até decisões técnicas específicas.",
      en: "Minimalist focus application built as a Go and React monorepo, with two fronts making up the same product: a web focus screen (a prominent clock, YouTube search and an embedded audio player with the video hidden) and a terminal TUI with focus radios streamed as MP3. Deliberately lean MVP, with no user accounts and no database, relying on local state instead, prioritizing engineering quality over feature count: automated tests across all modules, a Go backend serving the SPA via embed.FS with chi and log/slog, a non-root distroless Docker image, deployment through a Render Blueprint, CI/CD with GitHub Actions and automated versioning with Conventional Commits and release-please. Architecture documented through C4 diagrams and ADRs, covering everything from business context to specific technical decisions.",
    },
    technologies: ["go", "react", "typescript"],
    stack: [
      "Go",
      "chi",
      "Bubble Tea",
      "Lip Gloss",
      "Beep",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Vite",
      "Docker (distroless)",
      "GitHub Actions",
      "release-please",
      "YouTube Data API v3",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/focuzen",
      },
      {
        kind: "live",
        label: { pt: "Site", en: "Site" },
        url: "https://focuzen.onrender.com/",
      },
    ],
  },
  {
    id: "leaks-n-promo",
    title: { pt: "Leaks & Promo", en: "Leaks & Promo" },
    summary: {
      pt: "Bot de Discord em Go que reúne preços de jogos de PC e vazamentos do mercado de games.",
      en: "Go Discord bot that brings together PC game prices and gaming industry leaks.",
    },
    details: {
      pt: "Bot de Discord open-source escrito em Go, voltado ao universo gamer, que unifica consulta de preços de jogos de PC (integração com a API CheapShark) e agregação de vazamentos e rumores do mercado de games via feeds RSS e Reddit. Construído sobre uma arquitetura pull-only e stateless, com fontes de dados desacopladas por trás de interfaces (PriceProvider, LeakSource), permitindo trocar provedores sem reescrever o núcleo. O projeto prioriza excelência de engenharia, cache em memória com TTL, resiliência via context, timeouts e retry com backoff, pipeline de CI/CD com GitHub Actions e GoReleaser publicando no GHCR, além de imagem Docker multi-stage non-root, tudo com custo zero de operação e foco em privacidade (não persiste dados de usuário).",
      en: "Open-source Discord bot written in Go for the gaming community, combining PC game price lookups (via the CheapShark API) with real-time aggregation of game leaks and rumors from RSS feeds and Reddit. Built on a pull-only, stateless architecture with data sources decoupled behind interfaces (PriceProvider, LeakSource), allowing providers to be swapped without rewriting the core. The project emphasizes engineering excellence, in-memory caching with TTL, resilience through context, timeouts and retry with backoff, a full CI/CD pipeline using GitHub Actions and GoReleaser publishing to GHCR, and a multi-stage non-root Docker image, all with zero operating cost and a privacy-first design that persists no user data.",
    },
    technologies: ["go"],
    stack: [
      "Go",
      "discordgo",
      "log/slog",
      "Docker (multi-stage)",
      "GitHub Actions",
      "GoReleaser",
      "GHCR",
      "CheapShark",
      "API",
      "RSS/Reddit",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/leaks-n-promo",
      },
    ],
  },
  {
    id: "gofetch",
    title: { pt: "Gofetch", en: "Gofetch" },
    summary: {
      pt: "Ferramenta de terminal em Go que exibe informações do sistema, inspirada no neofetch.",
      en: "Go terminal tool that displays system information, inspired by neofetch.",
    },
    details: {
      pt: "Ferramenta de terminal inspirada em neofetch e fastfetch, escrita em Go, focada em exibir informações do sistema (SO, CPU, memória, disco, placa-mãe) com logo ASCII e cores, priorizando velocidade e simplicidade. Arquitetura organizada como pipeline (coletar, agregar concorrentemente, renderizar, imprimir), com componentes desacoplados por interfaces: coletores por subsistema implementam uma interface `Collector` comum, com o código específico de cada sistema operacional isolado via build tags, permitindo suporte futuro a Linux e macOS sem reescrever o núcleo. Coleta paralela com `errgroup` sob `context.WithTimeout`, com degradação graciosa (um coletor que falha exibe `N/A` sem derrubar a execução). Binário único e estático, sem dependências de runtime e sem CGO, com pipeline de CI, linting via golangci-lint e releases automatizados com GoReleaser.",
      en: "Terminal tool inspired by neofetch and fastfetch, written in Go, focused on displaying system information (OS, CPU, memory, disk, motherboard) alongside an ASCII logo and colors, prioritizing speed and simplicity. Architecture organized as a pipeline (collect, aggregate concurrently, render, print), with components decoupled through interfaces: subsystem collectors implement a shared `Collector` interface, with OS-specific code isolated via build tags, allowing future Linux and macOS support without rewriting the core. Parallel collection with `errgroup` under `context.WithTimeout`, with graceful degradation (a failing collector prints `N/A` instead of breaking the run). Single static binary, no runtime dependencies and no CGO, with a CI pipeline, linting through golangci-lint and automated releases with GoReleaser.",
    },
    technologies: ["go"],
    stack: [
      "Go",
      "gopsutil",
      "lipgloss",
      "errgroup",
      "GitHub Actions",
      "GoReleaser",
      "golangci-lint",
      "WMI",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/gofetch",
      },
    ],
  },
  {
    id: "lp-expedition33",
    title: {
      pt: "Clair Obscur: Expedition 33 (Landing Page)",
      en: "Clair Obscur: Expedition 33 (Landing Page)",
    },
    summary: {
      pt: "Landing page de estudo inspirada em Clair Obscur: Expedition 33, com animações em GSAP.",
      en: "Study landing page inspired by Clair Obscur: Expedition 33, with GSAP animations.",
    },
    details: {
      pt: "Landing page de estudo e homenagem inspirada em Clair Obscur: Expedition 33, construída em HTML, CSS e JavaScript puros, sem frameworks ou etapa de build. Foco em direção visual e composição de interface: hero com CTA externo, animações de entrada, scroll suave e efeitos de movimento com GSAP (ScrollTrigger, ScrollSmoother, SplitText), cards de novidades, bloco de depoimentos e footer institucional. Estrutura organizada com separação clara entre marcação (`index.html`), estilos (`src/styles/style.css`) e comportamento (`src/scripts/script.js`), com assets segmentados em subpastas. Escopo deliberadamente enxuto, priorizando acabamento visual, clareza de organização e fundamentos sólidos de front-end acima de complexidade técnica.",
      en: "Study and tribute landing page inspired by Clair Obscur: Expedition 33, built with plain HTML, CSS and JavaScript, with no frameworks or build step. Focused on visual direction and interface composition: a hero section with an external CTA, entrance animations, smooth scrolling and motion effects with GSAP (ScrollTrigger, ScrollSmoother, SplitText), news cards, a testimonials block and an institutional footer. Structure organized with a clear separation between markup (`index.html`), styles (`src/styles/style.css`) and behavior (`src/scripts/script.js`), with assets split into subfolders. Deliberately lean scope, prioritizing visual polish, clear organization and solid front-end fundamentals over technical complexity.",
    },
    technologies: ["javascript"],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GSAP",
      "ScrollTrigger",
      "ScrollSmoother",
      "SplitText",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/LP-Expedition33",
      },
      {
        kind: "live",
        label: { pt: "Site", en: "Site" },
        url: "https://joaovictorvm.github.io/LP-Expedition33/",
      },
    ],
  },
  {
    id: "scheduling-api",
    title: { pt: "Scheduling API", en: "Scheduling API" },
    summary: {
      pt: "API REST de agendamentos com NestJS, autenticação JWT e controle de acesso por roles.",
      en: "Scheduling REST API with NestJS, JWT authentication and role-based access control.",
    },
    details: {
      pt: "API REST para gerenciamento de agendamentos desenvolvida com foco em aplicar conceitos de arquitetura backend e segurança. Construída com NestJS, Prisma ORM e PostgreSQL, a aplicação implementa autenticação com JWT, controle de acesso baseado em roles (RBAC) e organização modular. O projeto fortaleceu minha experiência em desenvolvimento de APIs escaláveis, boas práticas de segurança e estruturação de aplicações backend.",
      en: "REST API targeting scheduling workflows, built to evolve backend architecture and security patterns. With NestJS, Prisma ORM, and PostgreSQL, it layers JWT auth, RBAC-style access control, and modular organization to deliver scalable, secure endpoints.",
    },
    technologies: ["nestjs", "typescript"],
    stack: ["NestJS", "Prisma ORM", "PostgreSQL", "JWT"],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/SchedulingAPI",
      },
    ],
  },
  {
    id: "autobattle",
    title: { pt: "Auto Battle", en: "Auto Battle" },
    summary: {
      pt: "Protótipo de auto-battler roguelike com mecânicas de card game, em JavaScript puro.",
      en: "Roguelike auto-battler prototype with card game mechanics, in plain JavaScript.",
    },
    details: {
      pt: "Protótipo de auto-battler roguelike com mecânicas de card game, construído em HTML, CSS e JavaScript puros, sem frameworks, bundler ou etapa de build. Heróis lutam automaticamente contra waves crescentes de inimigos, enquanto o jogador gerencia posicionamento via drag-and-drop, upgrades, habilidades especiais e merge infinito de cartas, além de coletar XP orbs com atração magnética em torno do cursor. Arquitetura modular em ES6 com separação estrita de responsabilidades (estado centralizado em `state.js` como única fonte de verdade, lógica de combate em `combat.js` sem nenhum acesso ao DOM, renderização isolada em `ui.js`), loop principal com `requestAnimationFrame` e delta time independente de FPS, e todo o balanceamento do jogo centralizado em `constants.js`, sem magic numbers espalhados pelo código. Efeitos sonoros sintetizados em runtime via Web Audio API, sem nenhum asset de áudio.",
      en: "Roguelike auto-battler prototype with card game mechanics, built with plain HTML, CSS and JavaScript, with no frameworks, bundler or build step. Heroes fight automatically against increasingly difficult waves of enemies, while the player manages positioning through drag-and-drop, upgrades, special abilities and infinite card merging, along with collecting XP orbs that get magnetically pulled toward the cursor. Modular ES6 architecture with strict separation of concerns (centralized state in `state.js` as the single source of truth, combat logic in `combat.js` with no DOM access whatsoever, rendering isolated in `ui.js`), a main loop driven by `requestAnimationFrame` with frame-rate independent delta time, and all game balancing centralized in `constants.js`, with no magic numbers scattered across the codebase. Sound effects synthesized at runtime through the Web Audio API, with no audio assets at all.",
    },
    technologies: ["javascript"],
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "ES6 Modules",
      "Web Audio API",
      "requestAnimationFrame",
    ],
    links: [
      {
        kind: "repository",
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/Prototipo-AutoBattle",
      },
      {
        kind: "live",
        label: { pt: "Jogo", en: "Game" },
        url: "https://joaovictorvm.itch.io/autobattle",
      },
    ],
  },
];

/** Todos os repositórios, para o link abaixo da grade. */
export const allProjectsUrl =
  "https://github.com/JoaoVictorVM?tab=repositories";

/** `undefined` = todas as tecnologias. */
export function filterProjects(
  list: readonly Project[],
  technology: ProjectTechnology | undefined,
): Project[] {
  return technology
    ? list.filter((project) => project.technologies.includes(technology))
    : [...list];
}

/** Tecnologias com a quantidade de projetos, das mais usadas para as menos. */
export function countTechnologies(
  list: readonly Project[],
): { technology: ProjectTechnology; count: number }[] {
  return projectTechnologies
    .map((technology) => ({
      technology,
      count: filterProjects(list, technology).length,
    }))
    .filter(({ count }) => count > 0)
    .sort(
      (a, b) =>
        b.count - a.count ||
        technologyLabels[a.technology].localeCompare(
          technologyLabels[b.technology],
        ),
    );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.id === slug);
}

/** Link de um tipo (repositório ou projeto no ar), se o projeto tiver. */
export function getProjectLink(
  project: Project,
  kind: ProjectLinkKind,
): ProjectLink | undefined {
  return project.links?.find((link) => link.kind === kind);
}
