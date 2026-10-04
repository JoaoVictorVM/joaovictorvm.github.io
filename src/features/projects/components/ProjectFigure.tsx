import type { ProjectImage } from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { asset } from "@/shared/lib/asset";
import { cn } from "@/shared/lib/cn";

interface ProjectFigureProps {
  image: ProjectImage;
  /** Primeira imagem visível da página (capa): carrega na hora e com prioridade. */
  isPriority?: boolean;
  className?: string;
}

/** Imagem de projeto no padrão do site, com dimensões fixas para não deslocar o layout. */
export function ProjectFigure({
  image,
  isPriority = false,
  className,
}: ProjectFigureProps) {
  const { language } = usePreference();

  return (
    <img
      src={asset(image.src)}
      alt={image.alt[language]}
      width={image.width}
      height={image.height}
      loading={isPriority ? "eager" : "lazy"}
      fetchPriority={isPriority ? "high" : "auto"}
      decoding="async"
      className={cn(
        "border-line h-auto w-full rounded-lg border object-cover",
        className,
      )}
    />
  );
}
