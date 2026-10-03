import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";

interface RotatingTextProps {
  items: readonly string[];
  className?: string;
}

/**
 * Alterna entre os textos com efeito de digitar, esperar e apagar. A animação é
 * CSS (`.rotating-text` em animations.css); aqui só se mede a largura do texto
 * atual e se avança para o próximo quando o "apagar" termina. Leitores de tela
 * e quem prefere menos movimento recebem a lista inteira, estática.
 */
export function RotatingText({ items, className }: RotatingTextProps) {
  const [step, setStep] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const current = items[step % items.length] ?? "";

  useEffect(() => {
    const text = textRef.current;
    if (!text) {
      return;
    }

    // Acompanha a largura real do texto, que muda quando a fonte termina de carregar.
    const observer = new ResizeObserver(() => {
      setTextWidth(text.offsetWidth);
    });
    observer.observe(text);
    return () => {
      observer.disconnect();
    };
  }, [step]);

  if (items.length < 2) {
    return <span className={className}>{current}</span>;
  }

  return (
    <span className={cn("rotating-text-group", className)}>
      <span className="sr-only motion-reduce:not-sr-only">
        {items.join(" · ")}
      </span>
      <span
        key={step}
        aria-hidden
        data-first={step === 0 || undefined}
        className="rotating-text motion-reduce:hidden"
        style={
          {
            "--chars": current.length,
            "--text-width": `${String(textWidth)}px`,
          } as CSSProperties
        }
        onAnimationEnd={(event) => {
          if (event.animationName === "rotatingErase") {
            setStep((value) => value + 1);
          }
        }}
      >
        <span ref={textRef} className="inline-block">
          {current}
        </span>
      </span>
    </span>
  );
}
