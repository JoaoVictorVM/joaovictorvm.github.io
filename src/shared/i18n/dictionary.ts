import type { Language } from "@/types/preferences";

const pt = {
  skipToContent: "Pular para o conteúdo",
  header: {
    identity: {
      name: "João Victor Ventura Martins",
      roles: ["Engenheiro de Software", "Estudante de Cibersegurança"],
      homeLabel: "João Victor Ventura Martins — início",
    },
  },
  preferences: {
    label: "Preferências",
    language: {
      label: "Idioma",
      names: {
        pt: "Português",
        en: "English",
      },
    },
    theme: {
      label: "Tema",
      names: {
        light: "Claro",
        dark: "Escuro",
      },
    },
  },
  footer: {
    location: "Cabo Verde - MG 37880-000",
    logoLabel: "João Victor Ventura Martins — início",
    nav: {
      title: "Navegação",
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      certificates: "Certificados",
      blog: "Blog",
      gamedev: "GameDev",
    },
  },
  common: {
    backToIndex: "← Index",
  },
  certificates: {
    title: "Certificados",
    subtitle: "Qualidade e excelência comprovadas",
    count: {
      one: "certificado",
      other: "certificados",
    },
  },
  projects: {
    title: "Projetos",
    subtitle: "Abaixo alguns projetos selecionados",
  },
  blog: {
    title: "Blog",
    subtitle: "Textos sobre o que ando estudando e gostando",
    backToBlog: "← Blog",
    readingTime: "min de leitura",
    connect: "Achou interessante? Se quiser trocar uma ideia, me chama!",
    highlightsTitle: "Blog",
    highlightsCta: "Todos os posts",
  },
  about: {
    title: "Sobre mim",
    subtitle: "Um pouco além do currículo",
    photoAlt: "Retrato de João Victor Ventura Martins",
    intro: [
      "Sou João Victor Ventura Martins, um cara apaixonado por videogame desde pequeno, que entrou no mundo da programação por um sonho de um dia criar um jogo.",
      "Durante a faculdade de Ciência da Computação, fiquei apaixonado por programação e o sonho de lançar um jogo virou o sonho de ser um desenvolvedor.",
    ],
    timelineTitle: "Linha do tempo",
    timeline: [
      {
        period: "2018",
        title: "Primeiro contato com programação",
        description:
          "Conheci a programação através do curso de desenvolvimento de games da Danki Code, onde tive meu primeiro contato com Java e C# através da Unity.",
      },
      {
        period: "2020",
        title: "Técnico em Eletrônica — Pelicano",
        description:
          "Aqui comecei a ter contato com a programação fora do universo de desenvolvimento de games, através de algoritmos e projetos simples realizados no curso, junto com conhecimentos elétricos.",
      },
      {
        period: "2022",
        title: "Ciência da Computação — PUC Minas",
        description:
          "Aqui foi quando percebi que minha vida seria no mundo da programação, onde aprendi os conceitos e práticas sobre algoritmos, estrutura de dados e engenharia de software.",
      },
      {
        period: "2026",
        title: "Cibersegurança — Cruzeiro do Sul",
        description:
          "Atualmente comecei a graduação em Cibersegurança para melhorar meus conceitos de segurança de software, com o intuito de aprimorar meus conhecimentos em arquitetura de softwares seguros e complexos.",
      },
    ],
    beyondTitle: "Fora do trabalho",
    gamedev: {
      blurb:
        "No meu tempo livre, gosto de colocar meu conhecimento em prática com uma paixão pelo GameDev, criando protótipos e pequenos jogos para experimentar mecânicas, level design, game design e ideias no geral.",
      teaser:
        "Esses são alguns dos protótipos nos quais estou trabalhando atualmente, mas possuo outros jogos feitos e em desenvolvimento, fique à vontade para",
      teaserLink: "saber mais.",
    },
  },
  games: {
    title: "GameDev",
    subtitle: "Jogos que venho criando por paixão",
    intro: [
      "Desde criança sempre quis criar jogos, e foi essa vontade que acabou me levando a escolher ser desenvolvedor. Mesmo não trabalhando diretamente com GameDev no dia a dia, de uns tempos pra cá decidi criar alguns protótipos e jogos pequenos, atualmente utilizando React ou Go para colocar em prática, com essa paixão, o conhecimento que tenho nas linguagens com as quais trabalho e estudo.",
      "No início, eu costumava fazer jogos bem simples, mas de um tempo pra cá tenho me cobrado mais e buscado criar projetos um pouco mais complexos, com animações e mais atenção aos detalhes, principalmente na parte de arte, onde venho aprendendo a usar o Aseprite para criar sprites e animações. Tudo isso é feito puramente por hobby e por paixão, e caso queira conhecer mais, você pode",
    ],
    introLink: "visitar meu perfil no itch.io",
  },
  notFound: {
    code: "404",
    title: "Página não encontrada",
    message: "A página que você procura não existe ou foi movida.",
    backHome: "← Voltar ao início",
  },
  error: {
    title: "Algo deu errado",
    message: "Ocorreu um erro inesperado. Tente novamente.",
    retry: "Tentar novamente",
  },
  links: {
    label: "Linktree",
    roles: ["Engenheiro de Software", "Desenvolvedor FullStack"],
  },
  home: {
    intro: {
      name: "João Victor Ventura Martins",
      lead: "Software Engineer com foco em Go e React, desenvolvendo aplicações com ênfase em arquitetura, performance, escalabilidade, manutenibilidade e organização de código.",
      summary:
        "Sinta-se a vontade para conhecer mais sobre minha trajetória, o que venho estudando e os projetos em que estou trabalhando.",
      suffix: "Caso queira, você também pode acessar meu",
      resumeLabel: "currículo",
      aboutPrefix: "ou",
      aboutLabel: "saber mais sobre mim",
    },
    education: {
      title: "Formação",
      items: [
        {
          course: "Cibersegurança",
          institution: "Cruzeiro do Sul",
          period: "2026 — Atual",
        },
        {
          course: "Ciência da Computação",
          institution: "PUC Minas",
          period: "2022 — 2026",
        },
      ],
    },
    highlights: {
      certificatesTitle: "Certificados",
      projectsTitle: "Projetos",
      certificatesCta: "Todos os Certificados",
      projectsCta: "Demais Projetos",
      certificates: [
        {
          title: "Front End & UX/UI Design",
          description:
            "Certificação concluída pela Origamid em 06/02/2026, validando conhecimentos na área.",
        },
        {
          title: "NLW Operator - FullStack",
          description:
            "Certificação concluída pela Rocketseat em 17/03/2026, validando conhecimentos na área.",
        },
      ],
      projects: [
        {
          title: "Focuzen",
          description: "App de foco minimalista (Go + React), com web e TUI.",
          url: "https://github.com/JoaoVictorVM/focuzen",
        },
        {
          title: "Leaks & Promo",
          description: "Bot de Discord em Go: preços de jogos e vazamentos.",
          url: "https://github.com/JoaoVictorVM/leaks-n-promo",
        },
        {
          title: "Gofetch",
          description: "CLI em Go para exibir informações do sistema.",
          url: "https://github.com/JoaoVictorVM/gofetch",
        },
      ],
    },
    now: {
      title: "Atualmente",
      stackLabel: "Stack",
      paragraphs: [
        "Tenho interesse especial em arquitetura de software, tanto na idealização de System Designs quanto na construção de Design Systems, e venho me aproximando da área de segurança da informação, ampliando meus conhecimentos através de uma graduação em Cybersegurança.",
      ],
    },
    connect: {
      title: "Contato",
      prefix: "Me encontre em",
      orWord: "ou",
    },
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  skipToContent: "Skip to content",
  header: {
    identity: {
      name: "João Victor Ventura Martins",
      roles: ["Software Engineer", "Cybersecurity Student"],
      homeLabel: "João Victor Ventura Martins — home",
    },
  },
  preferences: {
    label: "Preferences",
    language: {
      label: "Language",
      names: {
        pt: "Português",
        en: "English",
      },
    },
    theme: {
      label: "Theme",
      names: {
        light: "Light",
        dark: "Dark",
      },
    },
  },
  footer: {
    location: "Cabo Verde - MG, Brazil",
    logoLabel: "João Victor Ventura Martins — home",
    nav: {
      title: "Navigation",
      home: "Home",
      about: "About",
      projects: "Projects",
      certificates: "Certificates",
      blog: "Writing",
      gamedev: "GameDev",
    },
  },
  common: {
    backToIndex: "← Index",
  },
  certificates: {
    title: "Certificates",
    subtitle: "Proven quality and excellence",
    count: {
      one: "certificate",
      other: "certificates",
    },
  },
  projects: {
    title: "Projects",
    subtitle: "Below are some selected projects",
  },
  blog: {
    title: "Writing",
    subtitle: "Notes on what I've been studying and enjoying",
    backToBlog: "← Writing",
    readingTime: "min read",
    connect: "Enjoyed this? If you want to talk it over, reach out!",
    highlightsTitle: "Writing",
    highlightsCta: "All posts",
  },
  about: {
    title: "About me",
    subtitle: "A bit beyond the resume",
    photoAlt: "Portrait of João Victor Ventura Martins",
    intro: [
      "I'm João Victor Ventura Martins, a guy who has loved video games since he was a kid and got into programming chasing the dream of one day creating a game.",
      "During my Computer Science degree, I fell in love with programming, and the dream of releasing a game turned into the dream of becoming a developer.",
    ],
    timelineTitle: "Timeline",
    timeline: [
      {
        period: "2018",
        title: "First contact with programming",
        description:
          "I discovered programming through Danki Code's game development course, where I had my first contact with Java and C# through Unity.",
      },
      {
        period: "2020",
        title: "Electronics Technician — Pelicano",
        description:
          "This is where I started to touch programming outside the game development world, through algorithms and simple projects built during the course, alongside electrical knowledge.",
      },
      {
        period: "2022",
        title: "Computer Science — PUC Minas",
        description:
          "This is when I realized my life would be in the programming world, learning the concepts and practices of algorithms, data structures and software engineering.",
      },
      {
        period: "2026",
        title: "Cybersecurity — Cruzeiro do Sul",
        description:
          "I recently started a Cybersecurity degree to sharpen my software security fundamentals, aiming to improve how I architect secure and complex software.",
      },
    ],
    beyondTitle: "Outside work",
    gamedev: {
      blurb:
        "In my free time, I like to put my knowledge into practice through a passion for GameDev, creating prototypes and small games to experiment with mechanics, level design, game design and ideas in general.",
      teaser:
        "These are some of the prototypes I'm currently working on, but I also have other games finished and in development, feel free to",
      teaserLink: "learn more.",
    },
  },
  games: {
    title: "GameDev",
    subtitle: "Games I build for fun",
    intro: [
      "Ever since I was a kid, I always wanted to create games, and that desire ended up leading me to choose to become a developer. Even though I don't work directly with GameDev on a daily basis, for some time now I have been creating small prototypes and games, currently using React or Go to put into practice, through this passion, the knowledge I have in the languages I work and study with.",
      "At first, I used to make pretty simple games, but for some time now I have been pushing myself more and trying to create slightly more complex projects, with animations and more attention to detail, especially on the art side, where I have been learning to use Aseprite to create sprites and animations. All of this is done purely out of hobby and passion, and if you'd like to see more, feel free to",
    ],
    introLink: "visit my itch.io profile",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    message: "The page you are looking for does not exist or was moved.",
    backHome: "← Back home",
  },
  error: {
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
    retry: "Try again",
  },
  links: {
    label: "Linktree",
    roles: ["Software Engineer", "FullStack Developer"],
  },
  home: {
    intro: {
      name: "João Victor Ventura Martins",
      lead: "Software Engineer focused on Go for backend and React for frontend, building applications with an emphasis on architecture, performance, scalability, maintainability and clean code organization.",
      summary:
        "Feel free to explore my journey, what I am currently studying, and the projects I am working on.",
      suffix: "If you wish, you can also download my",
      resumeLabel: "resume",
      aboutPrefix: "or",
      aboutLabel: "learn more about me",
    },
    education: {
      title: "Education",
      items: [
        {
          course: "Cybersecurity",
          institution: "Cruzeiro do Sul",
          period: "2026 — Present",
        },
        {
          course: "Computer Science",
          institution: "PUC Minas",
          period: "2022 — 2026",
        },
      ],
    },
    highlights: {
      certificatesTitle: "Certificates",
      projectsTitle: "Projects",
      certificatesCta: "All Certificates",
      projectsCta: "Other Projects",
      certificates: [
        {
          title: "Front End & UX/UI Design",
          description:
            "Origamid certification completed on 02/06/2026, confirming practical knowledge.",
        },
        {
          title: "NLW Operator - FullStack",
          description:
            "Rocketseat certification completed on 03/17/2026, confirming practical knowledge.",
        },
      ],
      projects: [
        {
          title: "Focuzen",
          description: "Minimalist focus app (Go + React), web and TUI.",
          url: "https://github.com/JoaoVictorVM/focuzen",
        },
        {
          title: "Leaks & Promo",
          description: "Go Discord bot for game prices and leaks.",
          url: "https://github.com/JoaoVictorVM/leaks-n-promo",
        },
        {
          title: "Gofetch",
          description: "Go CLI to display system information.",
          url: "https://github.com/JoaoVictorVM/gofetch",
        },
      ],
    },
    now: {
      title: "Now",
      stackLabel: "Stack",
      paragraphs: [
        "I have a particular interest in software architecture, both in designing systems (System Design) and in building Design Systems, and I have been getting closer to the field of information security, expanding my knowledge through a Cybersecurity degree.",
      ],
    },
    connect: {
      title: "Connect",
      prefix: "Reach me at",
      orWord: "or",
    },
  },
};

export const dictionary: Record<Language, Dictionary> = { pt, en };
