import type { CSSProperties } from "react";
import {
  contributionLevels,
  levelClasses,
} from "@/features/home/lib/contributionLevels";
import { cn } from "@/shared/lib/cn";

interface ContributionLegendProps {
  less: string;
  more: string;
  paletteLabel: string;
  isGitHubPalette: boolean;
  onTogglePalette: () => void;
}

/** A escala esconde um easter egg: o clique alterna a paleta do gráfico. */
export function ContributionLegend({
  less,
  more,
  paletteLabel,
  isGitHubPalette,
  onTogglePalette,
}: ContributionLegendProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="mr-1">{less}</span>
      <button
        type="button"
        data-cursor="default"
        aria-label={paletteLabel}
        aria-pressed={isGitHubPalette}
        onClick={onTogglePalette}
        className="contribution-legend flex cursor-default items-center gap-1"
      >
        {contributionLevels.map((level) => (
          <span
            key={level}
            aria-hidden
            style={{ "--palette-column": level } as CSSProperties}
            className={cn("size-2.5 rounded-xs", levelClasses[level])}
          />
        ))}
      </button>
      <span className="ml-1">{more}</span>
    </div>
  );
}
