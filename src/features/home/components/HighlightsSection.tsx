import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { WritingHighlights } from "@/features/blog/components/WritingHighlights";
import { CertificateHighlights } from "@/features/certificates/components/CertificateHighlights";
import { EducationBlock } from "@/features/home/components/EducationBlock";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import { projects } from "@/features/projects/data/projects";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

const featuredProjects = projects.filter((project) =>
  ["jotta", "lastro", "code-whispers"].includes(project.id),
);

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
      <h2 className="text-detail type-decoration">{title}</h2>

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

        <HighlightsColumn
          title={highlights.projectsTitle}
          ctaLabel={highlights.projectsCta}
          ctaTo="/projects"
          isVisible={isVisible}
        >
          <ProjectGrid
            projects={featuredProjects}
            showAllProjectsLink={false}
          />
        </HighlightsColumn>

        <HighlightsColumn
          title={highlights.certificatesTitle}
          ctaLabel={highlights.certificatesCta}
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
