import { useEffect, useRef, useState } from "react";
import type {
  ProjectImage,
  ProjectVideo as ProjectVideoData,
} from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { asset } from "@/shared/lib/asset";
import { cn } from "@/shared/lib/cn";

interface ProjectVideoProps {
  video: ProjectVideoData;
  poster?: ProjectImage;
  /** Na grade, o hover de todo o card controla a reprodução. */
  isHovered?: boolean;
  className?: string;
}

export function ProjectVideo({
  video,
  poster,
  isHovered,
  className,
}: ProjectVideoProps) {
  const { language } = usePreference();
  const ref = useRef<HTMLVideoElement>(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const isPlaying = isHovered ?? isVideoHovered;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isPlaying) {
      // O navegador pode bloquear ou interromper play() ao sair rapidamente.
      void element.play().catch(() => undefined);
    } else {
      element.pause();
      element.currentTime = 0;
    }

    return () => {
      element.pause();
      element.currentTime = 0;
    };
  }, [isPlaying, video.src]);

  return (
    <div
      onMouseEnter={() => {
        setIsVideoHovered(true);
      }}
      onMouseLeave={() => {
        setIsVideoHovered(false);
      }}
      className={cn("relative aspect-video w-full overflow-hidden", className)}
    >
      {poster && (
        <img
          src={asset(poster.src)}
          alt={poster.alt[language]}
          width={poster.width}
          height={poster.height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <video
        ref={ref}
        src={asset(video.src)}
        poster={poster ? asset(poster.src) : undefined}
        aria-label={video.label[language]}
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={(event) => {
          if (!isPlaying) event.currentTarget.pause();
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          poster && !isPlaying && "invisible",
        )}
      />
    </div>
  );
}
