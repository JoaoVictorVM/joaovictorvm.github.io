import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { ActivityEntry } from "@/features/home/components/ActivityEntry";
import { ContributionGraph } from "@/features/home/components/ContributionGraph";
import { ContributionLegend } from "@/features/home/components/ContributionLegend";
import { reading, studying } from "@/features/home/data/activity";
import { githubActivity } from "@/features/home/data/githubActivity";
import { useI18n } from "@/shared/hooks/useI18n";
import { usePreference } from "@/shared/hooks/usePreference";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";
import { formatNumber } from "@/shared/lib/number";

/**
 * Atividade recente: o gráfico de contribuições e o último repositório com
 * push (buscados no build), mais o que estou estudando e lendo. Sem os dados
 * do build, a seção sai só com estudo e leitura.
 */
export function ActivitySection() {
  const { activity } = useI18n().home;
  const { language } = usePreference();
  const { ref, isVisible } = useReveal<HTMLElement>();
  const latestRepository = githubActivity?.latestRepository;
  const total =
    githubActivity &&
    activity.total(formatNumber(githubActivity.totalContributions, language));

  return (
    <section
      ref={ref}
      className={cn("section-fade pb-20", isVisible && "visible")}
    >
      <Container className="text-text space-y-6">
        <h2 className="text-lg">{activity.title}</h2>

        {githubActivity && total && (
          <div className="space-y-3">
            <ContributionGraph
              weeks={githubActivity.weeks}
              label={total}
              language={language}
            />
            <div
              className={cn(
                "text-appear text-detail flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs delay-300",
                isVisible && "visible",
              )}
            >
              {/* O gráfico já anuncia o total: aqui ele é só visual. */}
              <p aria-hidden>{total}</p>
              <ContributionLegend
                less={activity.legendLess}
                more={activity.legendMore}
              />
            </div>
          </div>
        )}

        <dl
          className={cn(
            "text-appear grid gap-x-6 gap-y-4 delay-350 sm:grid-cols-3",
            isVisible && "visible",
          )}
        >
          <ActivityEntry label={activity.studying}>
            <dd>{studying.title[language]}</dd>
            <dd className="text-detail text-sm">{studying.detail[language]}</dd>
          </ActivityEntry>
          <ActivityEntry label={activity.reading}>
            <dd>{reading.title[language]}</dd>
            <dd className="text-detail text-sm">{reading.detail[language]}</dd>
          </ActivityEntry>
          {latestRepository && (
            <ActivityEntry label={activity.latestRepository}>
              <dd>
                <a
                  href={latestRepository.url}
                  target="_blank"
                  rel="noreferrer"
                  className={inlineLinkClass}
                >
                  <span>{latestRepository.name}</span>
                  <ArrowUpRight size={14} aria-hidden className="text-detail" />
                </a>
              </dd>
              {latestRepository.description && (
                <dd className="text-detail text-sm">
                  {latestRepository.description}
                </dd>
              )}
            </ActivityEntry>
          )}
        </dl>
      </Container>
    </section>
  );
}
