import type { LinkItem } from "@/features/links/data/links";
import { usePreference } from "@/shared/hooks/usePreference";
import { cn } from "@/shared/lib/cn";

interface LinkCardProps {
  item: LinkItem;
}

export function LinkCard({ item }: LinkCardProps) {
  const { language } = usePreference();
  const Icon = item.icon;
  const isFeatured = item.variant === "featured";

  return (
    <a
      href={item.href}
      download={item.download}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={cn(
        "flex items-center gap-4 rounded-full border px-4 py-3 transition-colors",
        isFeatured
          ? "border-text/20 bg-line/40 hover:bg-line/60"
          : "border-line hover:bg-line/30",
      )}
    >
      <span className="border-line text-text flex size-12 shrink-0 items-center justify-center rounded-full border">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col gap-0.5 text-left">
        <span className="type-primary text-text">{item.title[language]}</span>
        <span className="text-detail type-decoration">
          {item.description[language]}
        </span>
      </span>
    </a>
  );
}
