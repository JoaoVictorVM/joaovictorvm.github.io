import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

/** Distância (px) para um gesto de ponteiro deixar de ser clique. */
const DRAG_THRESHOLD = 5;
/** Deslize vertical mínimo (px) para avançar um item no toque. */
const SWIPE_THRESHOLD = 40;
/** Rolagem acumulada mínima (px) para um gesto de roda/touchpad avançar um item. */
const WHEEL_THRESHOLD = 30;
/** Pausa (ms) sem eventos de roda que encerra um gesto (e o embalo do touchpad). */
const WHEEL_GESTURE_IDLE = 160;
/** Ângulo a partir do qual o card some (já saindo pelas bordas da tela). */
const MAX_VISIBLE_ANGLE = 75;
/** Raio da roda: o maior entre múltiplos da largura do card e da largura da tela. */
const RADIUS_PER_CARD = 2.4;
const RADIUS_PER_VIEWPORT = 0.55;
/** Espaço entre cards no topo do arco, proporcional à largura do card. */
const GAP_PER_CARD = 0.18;
/** Quanto a opacidade cai a cada posição de distância do centro, e o mínimo. */
const FADE_PER_STEP = 0.3;
const MIN_OPACITY = 0.2;
/** Folga vertical mínima (px) acima e abaixo do card central. */
const CARD_MARGIN = 16;
/** Proporção do card (16:9). */
const CARD_RATIO = 16 / 9;
/** Duração (ms) do giro animado. */
const SPIN_DURATION = 450;
/** Pixels por linha, para eventos de roda medidos em linhas (Firefox). */
const PIXELS_PER_LINE = 16;

interface WheelGeometry {
  radius: number;
  stepAngle: number;
  cardSpacing: number;
  circleY: number;
}

interface GestureState {
  pointerId: number;
  startX: number;
  startY: number;
  startSpin: number;
  mode: "pending" | "drag" | "swipe";
}

/**
 * Distância de um item ao centro dando a volta na lista, como num círculo: com o
 * primeiro no centro, os últimos aparecem à esquerda dele. Fica entre -count/2 e
 * count/2, e é também o caminho mais curto até ele.
 */
function circularOffset(index: number, position: number, count: number) {
  const half = count / 2;
  return ((((index - position + half) % count) + count) % count) - half;
}

function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Roda de projetos em arco, circular e sem fim, ocupando uma tela fixa (a página
 * não rola). Roda do mouse/touchpad e deslize vertical avançam um item por
 * gesto; o arrasto horizontal gira acompanhando o ponteiro e encaixa ao soltar;
 * clique e teclado trazem o item ao centro pelo caminho mais curto. Os cards são
 * posicionados direto pelo DOM, a cada frame, sem re-renderizar.
 */
export function useProjectWheel(count: number) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const geometry = useRef<WheelGeometry | null>(null);
  /** Posição atual da roda (contínua) e o alvo do giro em andamento. */
  const spin = useRef(0);
  const spinTarget = useRef(0);
  const spinFrame = useRef(0);
  const gesture = useRef<GestureState | null>(null);
  const shouldSuppressClick = useRef(false);
  const activeIndexRef = useRef(0);
  /** Item que estava no centro quando o ponteiro tocou: decide se o clique navega. */
  const centerAtPress = useRef<number | null>(null);

  const measure = useCallback(() => {
    const wheel = wheelRef.current;
    const items = cardRefs.current;
    const firstItem = items[0];
    if (!wheel || !firstItem) {
      geometry.current = null;
      return;
    }

    // O card ocupa a largura do conteúdo, mas encolhe (mantendo 16:9) se a
    // altura disponível entre o título e a alça do rodapé não comportá-lo.
    items.forEach((item) => {
      item?.style.removeProperty("width");
    });
    const card = firstItem.firstElementChild;
    if (!(card instanceof HTMLElement)) {
      geometry.current = null;
      return;
    }
    const maxCardHeight = wheel.clientHeight - CARD_MARGIN * 2;
    if (card.offsetHeight > maxCardHeight) {
      const padding = firstItem.offsetWidth - card.offsetWidth;
      const width = `${String(maxCardHeight * CARD_RATIO + padding)}px`;
      items.forEach((item) => {
        item?.style.setProperty("width", width);
      });
    }

    const cardWidth = card.offsetWidth;
    const radius = Math.max(
      cardWidth * RADIUS_PER_CARD,
      wheel.clientWidth * RADIUS_PER_VIEWPORT,
    );
    const cardSpacing = cardWidth * (1 + GAP_PER_CARD);

    geometry.current = {
      radius,
      stepAngle: (cardSpacing / radius) * (180 / Math.PI),
      cardSpacing,
      circleY: wheel.clientHeight / 2 + radius,
    };
  }, []);

  const render = useCallback(() => {
    const current = geometry.current;
    if (!current) {
      return;
    }

    const position = spin.current;
    // O item que "dá a volta" (de um extremo ao outro) precisa estar invisível
    // nesse momento, então o limite visível fica antes do ponto de troca.
    const visibleLimit = Math.min(
      MAX_VISIBLE_ANGLE,
      (count / 2 - 0.5) * current.stepAngle,
    );

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }
      const offset = circularOffset(index, position, count);
      const angle = offset * current.stepAngle;
      const isVisible = Math.abs(angle) <= visibleLimit;
      card.style.top = `${String(current.circleY)}px`;
      card.style.transform = `translate(-50%, -50%) rotate(${String(angle)}deg) translateY(${String(-current.radius)}px)`;
      card.style.opacity = isVisible
        ? String(Math.max(MIN_OPACITY, 1 - Math.abs(offset) * FADE_PER_STEP))
        : "0";
      // Continua focável por teclado (o foco centraliza o card), só não recebe ponteiro.
      card.style.pointerEvents = isVisible ? "" : "none";
    });

    activeIndexRef.current = wrapIndex(Math.round(position), count);
  }, [count]);

  /** Gira a roda até `target` (animado; instantâneo com reduced-motion). */
  const spinTo = useCallback(
    (target: number) => {
      window.cancelAnimationFrame(spinFrame.current);
      spinTarget.current = target;

      if (prefersReducedMotion()) {
        spin.current = target;
        render();
        return;
      }

      const start = spin.current;
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / SPIN_DURATION);
        spin.current = start + (target - start) * easeOutCubic(t);
        render();
        if (t < 1) {
          spinFrame.current = window.requestAnimationFrame(step);
        }
      };
      spinFrame.current = window.requestAnimationFrame(step);
    },
    [render],
  );

  /** Avança `steps` itens a partir do alvo atual (giros seguidos se somam). */
  const stepBy = useCallback(
    (steps: number) => {
      spinTo(Math.round(spinTarget.current) + steps);
    },
    [spinTo],
  );

  /** Traz um item ao centro pelo caminho mais curto ao redor da roda. */
  const rotateTo = useCallback(
    (index: number) => {
      const from = spinTarget.current;
      spinTo(from + circularOffset(index, from, count));
    },
    [count, spinTo],
  );

  useEffect(() => {
    const remeasure = () => {
      measure();
      render();
    };
    remeasure();
    window.addEventListener("resize", remeasure);
    // Mudanças de tamanho sem resize da janela (fonte carregando, por exemplo).
    const observer = new ResizeObserver(remeasure);
    if (wheelRef.current) {
      observer.observe(wheelRef.current);
    }
    return () => {
      window.cancelAnimationFrame(spinFrame.current);
      window.removeEventListener("resize", remeasure);
      observer.disconnect();
    };
  }, [measure, render]);

  // Roda do mouse e touchpad: um gesto avança exatamente um item. Rolar para
  // baixo traz o item da direita ao centro; para cima, o da esquerda.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    let accumulated = 0;
    let isGestureLocked = false;
    let idleTimer = 0;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        isGestureLocked = false;
        accumulated = 0;
      }, WHEEL_GESTURE_IDLE);
      if (isGestureLocked) {
        return;
      }

      const scale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? PIXELS_PER_LINE
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const isVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      // Vertical: para baixo avança (+1), para cima volta. Horizontal: segue o gesto.
      accumulated += (isVertical ? event.deltaY : event.deltaX) * scale;
      if (Math.abs(accumulated) >= WHEEL_THRESHOLD) {
        stepBy(accumulated > 0 ? 1 : -1);
        isGestureLocked = true;
        accumulated = 0;
      }
    };

    // Não passivo: a roda gira os projetos em vez de rolar.
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(idleTimer);
    };
  }, [stepBy]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    // Um gesto anterior que terminou fora de um card não gerou clique a suprimir.
    shouldSuppressClick.current = false;
    centerAtPress.current = activeIndexRef.current;
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startSpin: spinTarget.current,
      mode: "pending",
    };
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const current = gesture.current;
      const shape = geometry.current;
      if (current?.pointerId !== event.pointerId || !shape) {
        return;
      }

      const deltaX = event.clientX - current.startX;
      const deltaY = event.clientY - current.startY;
      if (current.mode === "pending") {
        if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
          return;
        }
        // A captura só começa no gesto: capturar antes desviaria o clique do link.
        current.mode = Math.abs(deltaX) >= Math.abs(deltaY) ? "drag" : "swipe";
        event.currentTarget.setPointerCapture(event.pointerId);
        window.cancelAnimationFrame(spinFrame.current);
        spin.current = Math.round(spin.current);
        current.startSpin = spin.current;
      }

      if (current.mode === "drag") {
        // Arrastar para a direita traz os itens da esquerda.
        spin.current = current.startSpin - deltaX / shape.cardSpacing;
        spinTarget.current = spin.current;
        render();
      }
    },
    [render],
  );

  const endGesture = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const current = gesture.current;
      if (current?.pointerId !== event.pointerId) {
        return;
      }
      gesture.current = null;
      if (current.mode === "pending") {
        return;
      }
      shouldSuppressClick.current = true;

      if (current.mode === "drag") {
        // Encaixa no item mais próximo do centro.
        spinTo(Math.round(spin.current));
        return;
      }
      // Deslize vertical: dedo para cima equivale a rolar para baixo (avança).
      const deltaY = event.clientY - current.startY;
      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        stepBy(deltaY < 0 ? 1 : -1);
      }
    },
    [spinTo, stepBy],
  );

  /** Um gesto termina com pointerup sobre um card: esse clique não navega. */
  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (shouldSuppressClick.current) {
      shouldSuppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  /**
   * Clique num card: só o card central abre o projeto; os demais são trazidos
   * ao centro. Vale o centro do momento do toque (o foco já pode ter iniciado o
   * giro até o clique chegar); pelo teclado, vale o centro atual.
   */
  const onCardClick = useCallback(
    (index: number, event: ReactMouseEvent<HTMLElement>) => {
      const center = centerAtPress.current ?? activeIndexRef.current;
      centerAtPress.current = null;
      if (index !== center) {
        event.preventDefault();
        rotateTo(index);
      }
    },
    [rotateTo],
  );

  return {
    stageRef,
    wheelRef,
    cardRefs,
    rotateTo,
    onCardClick,
    wheelHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture,
      onClickCapture,
    },
  };
}
