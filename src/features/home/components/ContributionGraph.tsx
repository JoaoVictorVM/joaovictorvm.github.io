import type { CSSProperties } from "react";
import type { ContributionDay } from "@/features/home/data/githubActivity";
import { levelClasses } from "@/features/home/lib/contributionLevels";
import { formatDate } from "@/shared/lib/date";
import { cn } from "@/shared/lib/cn";
import type { Language } from "@/types/preferences";

/** No celular só cabem as semanas mais recentes (~6 meses). */
const MOBILE_WEEKS = 26;

/** Dia da semana (0 = domingo) de uma data `"AAAA-MM-DD"`, sem depender do fuso. */
function weekday(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

/** Mês que começa nesta semana (a que contém o dia 1), para o rótulo. */
function monthStartingIn(week: readonly ContributionDay[]) {
  return week.find((day) => day.date.endsWith("-01"))?.date;
}

interface ContributionGraphProps {
  weeks: readonly ContributionDay[][];
  /** Resumo lido por leitores de tela no lugar das células. */
  label: string;
  language: Language;
}

/**
 * Calendário de contribuições do GitHub: uma coluna por semana (domingo a
 * sábado), com o rótulo do mês acima da semana em que ele começa.
 */
export function ContributionGraph({
  weeks,
  label,
  language,
}: ContributionGraphProps) {
  const firstMobileWeek = weeks.length - MOBILE_WEEKS;
  const weekClassName = (index: number) =>
    cn("flex-col gap-0.5", index < firstMobileWeek ? "hidden sm:flex" : "flex");

  return (
    <div role="img" aria-label={label} className="space-y-1">
      <div aria-hidden className="flex gap-0.5">
        {weeks.map((week, index) => {
          const month = monthStartingIn(week);
          return (
            <div
              key={week[0]?.date ?? index}
              className={cn(weekClassName(index), "relative h-4 w-2.5")}
            >
              {month && (
                <span className="text-detail absolute left-0 text-xs whitespace-nowrap">
                  {formatDate(month, language, "month").replace(".", "")}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div aria-hidden className="flex gap-0.5">
        {weeks.map((week, index) => {
          const firstDay = week[0];
          // A primeira semana pode começar no meio: as células vazias no topo
          // mantêm cada dia na linha do seu dia da semana.
          const offset = index === 0 && firstDay ? weekday(firstDay.date) : 0;
          return (
            <div
              key={firstDay?.date ?? index}
              className={cn(weekClassName(index), "graph-column")}
              style={{ "--column": index } as CSSProperties}
            >
              {Array.from({ length: offset }, (_, slot) => (
                <span key={slot} className="size-2.5" />
              ))}
              {week.map((day) => (
                <span
                  key={day.date}
                  className={cn("size-2.5 rounded-xs", levelClasses[day.level])}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
