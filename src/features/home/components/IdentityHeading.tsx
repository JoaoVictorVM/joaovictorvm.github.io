import type { CSSProperties } from "react";
import { RotatingText } from "@/components/ui/RotatingText";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

interface IdentityHeadingProps {
  isVisible: boolean;
}

/** Nome e roles no topo da home, no mesmo padrão do título das páginas internas. */
export function IdentityHeading({ isVisible }: IdentityHeadingProps) {
  const { intro } = useI18n().home;

  return (
    <hgroup className="mb-10">
      <h1
        className={cn(
          "fast-fade-up text-text text-lg delay-200",
          isVisible && "visible",
        )}
      >
        {intro.name}
      </h1>
      <p
        className={cn(
          "fast-fade-up text-detail text-sm delay-250",
          isVisible && "visible",
        )}
        // A primeira role começa a ser digitada depois que esta linha aparece.
        style={
          {
            "--rotating-start": "calc(var(--delay-250) + var(--duration-fast))",
          } as CSSProperties
        }
      >
        <RotatingText items={intro.roles} />
      </p>
    </hgroup>
  );
}
