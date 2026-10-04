import { ArrowUpRight } from "lucide-react";
import type { ProjectImage } from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { asset } from "@/shared/lib/asset";

interface ProjectCardProps {
  /** Posição na vitrine, exibida como "01", "02"... */
  position: number;
  title: string;
  cover?: ProjectImage;
  isExternal?: boolean;
}

/**
 * Face visual do card de um projeto. Com capa, a imagem ocupa o card; sem capa
 * (provisório), mostra o número e o nome. O link que o envolve fica a cargo de
 * quem usa o card.
 */
export function ProjectCard({
  position,
  title,
  cover,
  isExternal = false,
}: ProjectCardProps) {
  const { language } = usePreference();

  if (cover) {
    return (
      <span className="border-line group-hover:border-text block aspect-video overflow-hidden rounded-2xl border transition-colors">
        <img
          src={asset(cover.src)}
          alt={cover.alt[language]}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className="border-line bg-bg group-hover:border-text flex aspect-video flex-col justify-between rounded-2xl border p-5 transition-colors">
      <span className="text-detail text-xs">
        {String(position).padStart(2, "0")}
      </span>
      <span className="text-text flex items-center gap-1 text-lg">
        {title}
        {isExternal && (
          <ArrowUpRight size={16} aria-hidden className="text-detail" />
        )}
      </span>
    </span>
  );
}
