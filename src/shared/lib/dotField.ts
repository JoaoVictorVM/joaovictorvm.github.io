/** Distância entre os pontos da grade (px). */
const SPACING = 20;
/** Raio de um ponto em repouso (px). */
const DOT_RADIUS = 1;
/** Faixa ao lado da coluna em que os pontos vão de invisíveis a força total (px). */
const FADE_WIDTH = 96;

/** Brilho de repouso: cada ponto sorteia um valor nessa faixa (quase invisível). */
const BASE_ALPHA_MIN = 0.06;
const BASE_ALPHA_MAX = 0.16;
/** Fração dos pontos que cintilam, e o brilho extra no pico. */
const TWINKLE_RATIO = 0.08;
const TWINKLE_ALPHA = 0.55;
/** Dos que cintilam, fração que também cresce no pico, e quanto (px). */
const TWINKLE_GROW_RATIO = 0.3;
const TWINKLE_GROW = 0.8;
/** Velocidade da cintilação (radianos por segundo), sorteada nessa faixa. */
const TWINKLE_SPEED_MIN = 0.6;
const TWINKLE_SPEED_MAX = 1.6;

/** Raio de influência do mouse (px). */
const POINTER_RADIUS = 120;
/** Constante de tempo do rastro (s): em ~1s ele praticamente apagou. */
const TRAIL_DECAY = 0.33;
/** Brilho e crescimento (px) extras de um ponto com energia máxima. */
const ENERGY_ALPHA = 0.85;
const ENERGY_GROW = 1.5;

/** Onda do clique: velocidade (px/s), espessura do anel (px) e alcance (px). */
const RIPPLE_SPEED = 600;
const RIPPLE_WIDTH = 60;
const RIPPLE_REACH = 500;

/** Maior intervalo entre quadros considerado (s), para não saltar ao voltar à aba. */
const MAX_FRAME_STEP = 0.1;

export interface DotFieldOptions {
  /** Largura da coluna de conteúdo (px): os pontos só aparecem fora dela. */
  columnWidth: number;
  /** Cor dos pontos (qualquer cor CSS). */
  color: string;
  /** Sem animação: desenha só o repouso, sem cintilar nem reagir ao mouse. */
  isStatic: boolean;
}

export interface DotField {
  /** Posição do mouse na viewport. */
  setPointer: (x: number, y: number) => void;
  /** Mouse saiu da janela: para de acender pontos (o rastro apaga sozinho). */
  clearPointer: () => void;
  /** Solta uma onda a partir do ponto. */
  ripple: (x: number, y: number) => void;
  setColor: (color: string) => void;
  destroy: () => void;
}

interface Ripple {
  x: number;
  y: number;
  startedAt: number;
}

/**
 * Grade de pontos desenhada num canvas que cobre a viewport, só nas laterais
 * da coluna de conteúdo. Em repouso é quase invisível, com alguns pontos
 * cintilando; o mouse acende os pontos ao redor (deixando um rastro) e o
 * clique solta uma onda. Estado por ponto em arrays planos, sem objetos por
 * ponto, para o quadro ser barato.
 */
export function createDotField(
  canvas: HTMLCanvasElement,
  options: DotFieldOptions,
): DotField {
  const context = canvas.getContext("2d");
  if (!context) {
    return {
      setPointer: noop,
      clearPointer: noop,
      ripple: noop,
      setColor: noop,
      destroy: noop,
    };
  }
  const ctx = context;

  let color = options.color;
  let count = 0;
  let xs = new Float32Array(0);
  let ys = new Float32Array(0);
  /** Peso da lateral: 0 colado na coluna, 1 a partir de FADE_WIDTH dela. */
  let weights = new Float32Array(0);
  let baseAlphas = new Float32Array(0);
  /** Amplitude da cintilação (0 para quem não cintila). */
  let twinkles = new Float32Array(0);
  let twinkleGrows = new Float32Array(0);
  let phases = new Float32Array(0);
  let speeds = new Float32Array(0);
  /** Energia do mouse e das ondas, que decai com o tempo (o rastro). */
  let energies = new Float32Array(0);

  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;
  let ripples: Ripple[] = [];
  let frame = 0;
  let lastTime = 0;

  const layout = () => {
    const dpr = window.devicePixelRatio || 1;
    // Tamanho do próprio canvas (fixo em inset-0), que já desconta a barra de
    // rolagem; window.innerWidth a incluiria e esticaria o desenho.
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const columnHalf = options.columnWidth / 2;
    const center = width / 2;
    const columns = Math.ceil(width / SPACING);
    const rows = Math.ceil(height / SPACING);
    // Grade centralizada na viewport, simétrica dos dois lados da coluna.
    const offsetX = center - Math.floor(center / SPACING) * SPACING;
    const offsetY = (height - (rows - 1) * SPACING) / 2;

    const nextXs: number[] = [];
    const nextYs: number[] = [];
    const nextWeights: number[] = [];
    for (let column = 0; column <= columns; column++) {
      const x = offsetX + column * SPACING;
      const weight = smoothstep(
        (Math.abs(x - center) - columnHalf) / FADE_WIDTH,
      );
      if (weight <= 0) {
        continue;
      }
      for (let row = 0; row < rows; row++) {
        nextXs.push(x);
        nextYs.push(offsetY + row * SPACING);
        nextWeights.push(weight);
      }
    }

    count = nextXs.length;
    xs = Float32Array.from(nextXs);
    ys = Float32Array.from(nextYs);
    weights = Float32Array.from(nextWeights);
    baseAlphas = new Float32Array(count);
    twinkles = new Float32Array(count);
    twinkleGrows = new Float32Array(count);
    phases = new Float32Array(count);
    speeds = new Float32Array(count);
    energies = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      baseAlphas[i] = random(BASE_ALPHA_MIN, BASE_ALPHA_MAX);
      if (Math.random() < TWINKLE_RATIO) {
        twinkles[i] = TWINKLE_ALPHA * random(0.5, 1);
        twinkleGrows[i] = Math.random() < TWINKLE_GROW_RATIO ? TWINKLE_GROW : 0;
      }
      phases[i] = random(0, Math.PI * 2);
      speeds[i] = random(TWINKLE_SPEED_MIN, TWINKLE_SPEED_MAX);
    }
  };

  const draw = (time: number) => {
    const seconds = time / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    for (let i = 0; i < count; i++) {
      const weight = weights[i] ?? 0;
      let alpha = baseAlphas[i] ?? 0;
      let radius = DOT_RADIUS;

      if (!options.isStatic) {
        // Seno elevado ao cubo: o ponto passa a maior parte do tempo apagado
        // e acende em picos curtos.
        const wave = Math.max(
          0,
          Math.sin((phases[i] ?? 0) + seconds * (speeds[i] ?? 0)),
        );
        const twinkle = wave * wave * wave;
        const energy = energies[i] ?? 0;
        alpha += twinkle * (twinkles[i] ?? 0) + energy * ENERGY_ALPHA;
        radius += twinkle * (twinkleGrows[i] ?? 0) + energy * ENERGY_GROW;
      }

      alpha = Math.min(1, alpha) * weight;
      if (alpha < 0.01) {
        continue;
      }
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(xs[i] ?? 0, ys[i] ?? 0, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  /** Energia: decai (o rastro) e é reacendida pelo mouse e pelas ondas. */
  const updateEnergies = (time: number, step: number) => {
    const decay = Math.exp(-step / TRAIL_DECAY);
    const radiusSquared = POINTER_RADIUS * POINTER_RADIUS;
    const rippleRadius = (ripple: Ripple) =>
      Math.max(0, ((time - ripple.startedAt) / 1000) * RIPPLE_SPEED);
    // Ondas que já passaram do alcance acabaram.
    ripples = ripples.filter(
      (ripple) => rippleRadius(ripple) < RIPPLE_REACH + RIPPLE_WIDTH,
    );
    const waves = ripples.map((ripple) => ({
      x: ripple.x,
      y: ripple.y,
      radius: rippleRadius(ripple),
    }));

    for (let i = 0; i < count; i++) {
      const x = xs[i] ?? 0;
      const y = ys[i] ?? 0;
      let energy = (energies[i] ?? 0) * decay;

      if (hasPointer) {
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < radiusSquared) {
          const falloff = 1 - Math.sqrt(distanceSquared) / POINTER_RADIUS;
          energy = Math.max(energy, falloff * falloff);
        }
      }

      for (const wave of waves) {
        const distance = Math.hypot(x - wave.x, y - wave.y);
        const band = 1 - Math.abs(distance - wave.radius) / RIPPLE_WIDTH;
        if (band > 0) {
          const strength = Math.max(0, 1 - wave.radius / RIPPLE_REACH);
          energy = Math.max(energy, band * strength);
        }
      }

      energies[i] = energy;
    }
  };

  const tick = (time: number) => {
    const step = lastTime
      ? Math.min((time - lastTime) / 1000, MAX_FRAME_STEP)
      : 0;
    lastTime = time;
    updateEnergies(time, step);
    draw(time);
    frame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (options.isStatic) {
      draw(0);
      return;
    }
    if (!frame) {
      lastTime = 0;
      frame = window.requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
  };

  const onResize = () => {
    layout();
    if (options.isStatic) {
      draw(0);
    }
  };

  // Aba em segundo plano: nada a desenhar.
  const onVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  };

  layout();
  start();
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  return {
    setPointer: (x, y) => {
      pointerX = x;
      pointerY = y;
      hasPointer = true;
    },
    clearPointer: () => {
      hasPointer = false;
    },
    ripple: (x, y) => {
      if (!options.isStatic) {
        ripples.push({ x, y, startedAt: performance.now() });
      }
    },
    setColor: (next) => {
      color = next;
      if (options.isStatic) {
        draw(0);
      }
    },
    destroy: () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}

function noop() {
  // Sem canvas 2D: o fundo simplesmente não aparece.
}

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** 0 abaixo de 0, 1 acima de 1, curva suave entre os dois. */
function smoothstep(value: number): number {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}
