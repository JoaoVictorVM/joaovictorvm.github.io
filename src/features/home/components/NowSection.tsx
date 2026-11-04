import { Container } from "@/components/layout/Container";
import { stack } from "@/features/home/data/stack";
import { useI18n } from "@/shared/hooks/useI18n";
import { usePreference } from "@/shared/hooks/usePreference";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export function NowSection() {
  const { home } = useI18n();
  const { now } = home;
  const { language } = usePreference();
  const { ref, isVisible } = useReveal<HTMLElement>();
  const [firstParagraph, secondParagraph] = now.paragraphs;

  return (
    <section
      ref={ref}
      className={cn("section-fade py-20", isVisible && "visible")}
    >
      <Container className="text-text space-y-6">
        <h2 className="type-primary">{now.title}</h2>

        {firstParagraph && (
          <p className={cn("text-appear delay-300", isVisible && "visible")}>
            {firstParagraph}
          </p>
        )}

        <div
          className={cn(
            "text-appear space-y-4 delay-350",
            isVisible && "visible",
          )}
        >
          <p className="text-detail type-decoration">{now.stackLabel}</p>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-3">
            {stack.map((category) => (
              <div key={category.name.pt} className="space-y-1">
                <h3 className="type-primary text-text">
                  {category.name[language]}
                </h3>
                <p className="text-detail type-decoration">
                  {category.techs.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {secondParagraph && (
          <p className={cn("text-appear delay-350", isVisible && "visible")}>
            {secondParagraph}
          </p>
        )}
      </Container>
    </section>
  );
}
