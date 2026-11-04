import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

interface EducationBlockProps {
  isVisible: boolean;
}

export function EducationBlock({ isVisible }: EducationBlockProps) {
  const { home } = useI18n();
  const { education } = home;

  return (
    <div
      className={cn(
        "text-appear flex flex-col gap-6 delay-200",
        isVisible && "visible",
      )}
    >
      <h2 className="text-detail type-decoration">{education.title}</h2>

      <div className="space-y-3">
        {education.items.map((item) => (
          <article key={item.course}>
            <h3 className="type-primary text-text">
              {item.course}{" "}
              <span className="text-detail type-decoration">
                · {item.institution} · {item.period}
              </span>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}
