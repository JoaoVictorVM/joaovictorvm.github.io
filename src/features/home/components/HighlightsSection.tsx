import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { WritingHighlights } from "@/features/blog/components/WritingHighlights";
import { CertificateHighlights } from "@/features/certificates/components/CertificateHighlights";
import {
  certificates,
  getFeaturedCertificates,
} from "@/features/certificates/data/certificates";
import { EducationBlock } from "@/features/home/components/EducationBlock";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import { projects } from "@/features/projects/data/projects";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

const featuredProjects = projects.filter((project) =>
  ["jotta", "lastro", "comporta", "gazua"].includes(project.id),
);

interface HighlightsColumnProps {
  id: string;
  title: string;
  ctaLabel: string;
  countLabel: string;
  ctaTo: "/certificates" | "/projects";
  isVisible: boolean;
  children: ReactNode;
}

function HighlightsColumn({
  id,
  title,
  ctaLabel,
  countLabel,
  ctaTo,
  isVisible,
  children,
}: HighlightsColumnProps) {
  return (
    <div
      id={id}
      className={cn(
        "text-appear flex scroll-mt-24 flex-col gap-6 delay-250",
        isVisible && "visible",
      )}
    >
      <h2 className="text-detail type-decoration">{title}</h2>

      {children}

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Link to={ctaTo} className={inlineLinkClass}>
          <span>{ctaLabel}</span>
          <ArrowUpRight size={14} aria-hidden className="text-detail" />
        </Link>
        <span className="text-detail type-decoration">{countLabel}</span>
      </div>
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

        <HighlightsColumn
          id="projetos"
          title={highlights.projectsTitle}
          ctaLabel={highlights.projectsCta}
          countLabel={highlights.projectsCount(
            projects.length - featuredProjects.length,
          )}
          ctaTo="/projects"
          isVisible={isVisible}
        >
          <ProjectGrid
            projects={featuredProjects}
            showAllProjectsLink={false}
          />
        </HighlightsColumn>

        <HighlightsColumn
          id="certificados"
          title={highlights.certificatesTitle}
          ctaLabel={highlights.certificatesCta}
          countLabel={highlights.certificatesCount(
            certificates.length - getFeaturedCertificates().length,
          )}
          ctaTo="/certificates"
          isVisible={isVisible}
        >
          <CertificateHighlights />
        </HighlightsColumn>

        <WritingHighlights isVisible={isVisible} />
      </Container>
    </section>
  );
}
