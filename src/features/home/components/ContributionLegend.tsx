import {
  contributionLevels,
  levelClasses,
} from "@/features/home/lib/contributionLevels";
import { cn } from "@/shared/lib/cn";

interface ContributionLegendProps {
  less: string;
  more: string;
}

/** "Menos ▪▪▪▪▪ Mais": a escala de cores do gráfico. Decorativa. */
export function ContributionLegend({ less, more }: ContributionLegendProps) {
  return (
    <div aria-hidden className="flex items-center gap-1">
      <span className="mr-1">{less}</span>
      {contributionLevels.map((level) => (
        <span
          key={level}
          className={cn("size-2.5 rounded-xs", levelClasses[level])}
        />
      ))}
      <span className="ml-1">{more}</span>
    </div>
  );
}
