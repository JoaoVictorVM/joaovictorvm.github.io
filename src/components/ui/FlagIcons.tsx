import { useId, type SVGProps } from "react";

/* Bandeiras em SVG porque o Windows não renderiza emojis de bandeira (mostra
   "BR"/"US"). Simplificadas para leitura em tamanho de ícone e recortadas em
   círculo; as cores são as oficiais de cada bandeira, não tokens do tema. */

export function BrazilFlagIcon(props: SVGProps<SVGSVGElement>) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#009c3b" />
        <path d="M2 12 12 4.5 22 12 12 19.5Z" fill="#ffdf00" />
        <circle cx="12" cy="12" r="4.4" fill="#002776" />
        <path
          d="M7.8 11.1q4.4-1.4 8.3 1.6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}

const usStripeHeight = 24 / 13;
const usRedStripes = Array.from({ length: 7 }, (_, index) => index * 2);
const usStars = [
  [3, 3],
  [6, 3],
  [9, 3],
  [4.5, 6],
  [7.5, 6],
  [3, 9],
  [6, 9],
  [9, 9],
] as const;

export function UnitedStatesFlagIcon(props: SVGProps<SVGSVGElement>) {
  const clipId = useId();

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#ffffff" />
        {usRedStripes.map((stripe) => (
          <rect
            key={stripe}
            y={stripe * usStripeHeight}
            width="24"
            height={usStripeHeight}
            fill="#b22234"
          />
        ))}
        <rect width="12" height={usStripeHeight * 7} fill="#3c3b6e" />
        {usStars.map(([cx, cy]) => (
          <circle
            key={`${String(cx)}-${String(cy)}`}
            cx={cx}
            cy={cy}
            r="0.7"
            fill="#ffffff"
          />
        ))}
      </g>
    </svg>
  );
}
