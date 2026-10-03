import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

/** Distância mínima (px) para um gesto deixar de ser toque e virar arrasto. */
const DRAG_THRESHOLD = 5;
/** Folga mínima (px) entre o elemento e as bordas da viewport. */
const VIEWPORT_GUTTER = 8;

export interface DragOffset {
  x: number;
  y: number;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Gesture {
  pointerId: number;
  startX: number;
  startY: number;
  origin: DragOffset;
  /** Posição do elemento sem o deslocamento aplicado. */
  base: Box;
  isDragging: boolean;
}

interface UseDraggableOptions {
  /** Chamado quando o gesto ultrapassa o limiar e vira arrasto. */
  onDragStart?: () => void;
  /** Chamado quando o ponteiro é solto sem ter arrastado (um toque/clique). */
  onTap?: () => void;
}

function clampAxis(value: number, start: number, size: number, limit: number) {
  const min = VIEWPORT_GUTTER - start;
  const max = limit - VIEWPORT_GUTTER - start - size;
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function clampToViewport(offset: DragOffset, base: Box): DragOffset {
  const { clientWidth, clientHeight } = document.documentElement;
  return {
    x: clampAxis(offset.x, base.left, base.width, clientWidth),
    y: clampAxis(offset.y, base.top, base.height, clientHeight),
  };
}

function measureBase(element: HTMLElement, offset: DragOffset): Box {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left - offset.x,
    top: rect.top - offset.y,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Torna um elemento arrastável por mouse, toque ou caneta (Pointer Events),
 * mantendo-o dentro da viewport. O deslocamento é relativo à posição original
 * do elemento e deve ser aplicado via `transform`.
 */
export function useDraggable<T extends HTMLElement>({
  onDragStart,
  onTap,
}: UseDraggableOptions = {}) {
  const ref = useRef<T>(null);
  const gesture = useRef<Gesture | null>(null);
  const [offset, setOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<T>) => {
      const element = ref.current;
      if (!element || event.button !== 0) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      gesture.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origin: offset,
        base: measureBase(element, offset),
        isDragging: false,
      };
    },
    [offset],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const current = gesture.current;
      if (current?.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - current.startX;
      const deltaY = event.clientY - current.startY;

      if (!current.isDragging) {
        if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
          return;
        }
        current.isDragging = true;
        setIsDragging(true);
        onDragStart?.();
      }

      setOffset(
        clampToViewport(
          { x: current.origin.x + deltaX, y: current.origin.y + deltaY },
          current.base,
        ),
      );
    },
    [onDragStart],
  );

  const endGesture = useCallback(
    (event: ReactPointerEvent<T>, isCancelled: boolean) => {
      const current = gesture.current;
      if (current?.pointerId !== event.pointerId) {
        return;
      }

      gesture.current = null;
      setIsDragging(false);

      if (!current.isDragging && !isCancelled) {
        onTap?.();
      }
    },
    [onTap],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<T>) => {
      endGesture(event, false);
    },
    [endGesture],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<T>) => {
      endGesture(event, true);
    },
    [endGesture],
  );

  useEffect(() => {
    function keepInsideViewport() {
      const element = ref.current;
      if (!element) {
        return;
      }
      setOffset((current) =>
        clampToViewport(current, measureBase(element, current)),
      );
    }

    window.addEventListener("resize", keepInsideViewport);
    return () => {
      window.removeEventListener("resize", keepInsideViewport);
    };
  }, []);

  return {
    ref,
    offset,
    isDragging,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  };
}
