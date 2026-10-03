import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { IdentityHeading } from "@/features/home/components/IdentityHeading";
import { useI18n } from "@/shared/hooks/useI18n";
import { asset } from "@/shared/lib/asset";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export function IntroSection() {
  const { home } = useI18n();
  const { intro } = home;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="inicio"
      className={cn("section-fade pt-16", isVisible && "visible")}
    >
      <Container className="text-text">
        <IdentityHeading isVisible={isVisible} />

        <div
          className={cn(
            "text-appear space-y-4 text-base font-normal delay-300",
            isVisible && "visible",
          )}
        >
          <p>{intro.lead}</p>
          <p>
            {intro.summary} {intro.suffix}{" "}
            <a
              href={asset("pdf/CV-JoaoVictorVenturaMartins.pdf")}
              download
              className="decoration-text/30 hover:decoration-text underline underline-offset-4 transition-colors"
            >
              {intro.resumeLabel}
            </a>{" "}
            {intro.aboutPrefix}{" "}
            <Link
              to="/about"
              className="decoration-text/30 hover:decoration-text inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
            >
              <span>{intro.aboutLabel}</span>
              <ArrowUpRight size={14} aria-hidden className="text-detail" />
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
