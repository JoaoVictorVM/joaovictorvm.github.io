import { useState } from "react";
import { useEasterEggs } from "@/shared/hooks/useEasterEggs";
import { useI18n } from "@/shared/hooks/useI18n";
import { asset } from "@/shared/lib/asset";

interface AboutPortraitProps {
  alt: string;
}

export function AboutPortrait({ alt }: AboutPortraitProps) {
  const [isDiscovered, setIsDiscovered] = useState(false);
  const { about } = useI18n();
  const { discover } = useEasterEggs();

  return (
    <div className="flex w-40 shrink-0 flex-col gap-2 sm:w-44">
      <button
        type="button"
        data-cursor="default"
        onClick={() => {
          discover("about-portrait");
          setIsDiscovered((current) => !current);
        }}
        aria-label={isDiscovered ? about.iconAlt : alt}
        className="block cursor-default rounded-lg"
      >
        <img
          src={asset(isDiscovered ? "images/jotta.webp" : "images/perfil.webp")}
          alt={isDiscovered ? about.iconAlt : alt}
          width={320}
          height={320}
          className="border-line w-full rounded-lg border object-cover"
        />
      </button>
    </div>
  );
}
