export interface GameLink {
  label: {
    pt: string;
    en: string;
  };
  url: string;
}

export interface Game {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  summary: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  links?: GameLink[];
}

export const itchProfileUrl = "https://joaovictorvm.itch.io";

export const games: Game[] = [
  {
    id: "code-whispers",
    title: { pt: "Code Whispers", en: "Code Whispers" },
    summary: {
      pt: "O telefone sem fio do código: jogo multiplayer no navegador com Duelo para 2 e Telefone sem fio para 3 a 8 jogadores.",
      en: "A coding telephone game: browser multiplayer with Duel mode for 2 and Telephone mode for 3 to 8 players.",
    },
    description: {
      pt: "Escreva código, explique o que recebeu e descubra como a ideia original muda no caminho. No Duelo, dois jogadores trocam trechos de código e avaliam as explicações um do outro. No Telefone sem fio, de 3 a 8 participantes alternam entre código e descrições, vendo apenas a etapa anterior até a revelação coletiva. As salas são compartilhadas por código, com conexão via WebRTC, sem cadastro ou instalação. Os trechos de código nunca são executados.",
      en: "Write code, explain what you received and discover how the original idea changes along the way. In Duel mode, two players exchange code snippets and judge each other's explanations. In Telephone mode, 3 to 8 participants alternate between code and descriptions, seeing only the previous step until the shared reveal. Rooms are shared through a code, with WebRTC connections and no registration or installation. Code snippets are never executed.",
    },
    links: [
      {
        label: { pt: "Jogar", en: "Play" },
        url: "https://joaovictorvm.itch.io/code-whispers",
      },
      {
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/code-whispers",
      },
    ],
  },
  {
    id: "game-1",
    title: { pt: "Protótipo Auto-Battle", en: "Auto-Battler Prototype" },
    summary: {
      pt: "Protótipo de auto-battler roguelike com mecânicas de card game, onde heróis lutam automaticamente contra waves de inimigos enquanto você gerencia posicionamento, upgrades e merge de cartas.",
      en: "Roguelike auto-battler prototype with card game mechanics, where heroes fight automatically against waves of enemies while you manage positioning, upgrades and card merging.",
    },
    description: {
      pt: "Protótipo de auto-battler roguelike com mecânicas de card game, onde heróis lutam automaticamente contra waves de inimigos enquanto você gerencia posicionamento, upgrades e merge de cartas.",
      en: "Roguelike auto-battler prototype with card game mechanics, where heroes fight automatically against waves of enemies while you manage positioning, upgrades and card merging.",
    },
    links: [
      {
        label: { pt: "Jogar", en: "Play" },
        url: "https://joaovictorvm.itch.io/autobattle",
      },
      {
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/Prototipo-AutoBattle",
      },
    ],
  },
  {
    id: "game-2",
    title: { pt: "Protótipo Shooter 2D", en: "2D Shooter Prototype" },
    summary: {
      pt: "Jogo de tiro por ondas construído com Phaser, onde o core da experiência é a movimentação e o game feel, com double jump, dash e efeitos de feedback para tornar a jogabilidade mais responsiva e satisfatória.",
      en: "Wave-based shooter built with Phaser, where movement and game feel are the core of the experience, featuring double jump, dash and feedback effects to make gameplay more responsive and satisfying.",
    },
    description: {
      pt: "Jogo de tiro por ondas construído com Phaser, onde o core da experiência é a movimentação e o game feel, com double jump, dash e efeitos de feedback para tornar a jogabilidade mais responsiva e satisfatória.",
      en: "Wave-based shooter built with Phaser, where movement and game feel are the core of the experience, featuring double jump, dash and feedback effects to make gameplay more responsive and satisfying.",
    },
    links: [
      {
        label: { pt: "Jogar", en: "Play" },
        url: "https://github.com/JoaoVictorVM/2d-Shooter",
      },
      {
        label: { pt: "Repositório", en: "Repository" },
        url: "https://github.com/JoaoVictorVM/2d-Shooter",
      },
    ],
  },
];
