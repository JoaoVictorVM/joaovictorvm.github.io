import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { WritingHighlights } from "@/features/blog/components/WritingHighlights";
import { CertificateHighlights } from "@/features/certificates/components/CertificateHighlights";
import { EducationBlock } from "@/features/home/components/EducationBlock";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

interface HighlightsColumnProps {
  title: string;
  ctaLabel: string;
  ctaTo: "/certificates" | "/projects";
  isVisible: boolean;
  children: ReactNode;
}

function HighlightsColumn({
  title,
  ctaLabel,
  ctaTo,
  isVisible,
  children,
}: HighlightsColumnProps) {
  return (
    <div
      className={cn(
        "text-appear flex flex-col gap-6 delay-250",
        isVisible && "visible",
      )}
    >
      <h2 className="text-detail text-sm font-normal">{title}</h2>

      {children}

      <Link to={ctaTo} className={inlineLinkClass}>
        <span>{ctaLabel}</span>
        <ArrowUpRight size={14} aria-hidden className="text-detail" />
      </Link>
    </div>
  );
}

export function HighlightsSection() {
  const { home } = useI18n();
  const { highlights } = home;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn("section-fade pt-16", isVisible && "visible")}
    >
      <Container className="flex flex-col gap-12">
        <EducationBlock isVisible={isVisible} />

        <div className="grid gap-12 md:grid-cols-2">
          <HighlightsColumn
            title={highlights.certificatesTitle}
            ctaLabel={highlights.certificatesCta}
            ctaTo="/certificates"
            isVisible={isVisible}
          >
            <CertificateHighlights />
          </HighlightsColumn>
          <HighlightsColumn
            title={highlights.projectsTitle}
            ctaLabel={highlights.projectsCta}
            ctaTo="/projects"
            isVisible={isVisible}
          >
            <div className="space-y-6">
              {highlights.projects.map((project) => (
                <article key={project.title} className="space-y-1.5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={inlineLinkClass}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="text-detail"
                    />
                  </a>
                  <p className="text-detail text-sm">{project.description}</p>
                </article>
              ))}
            </div>
          </HighlightsColumn>
        </div>

        <WritingHighlights isVisible={isVisible} />
      </Container>
    </section>
  );
}
