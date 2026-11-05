import { useEffect, useState } from "react";
import { useI18n } from "@/shared/hooks/useI18n";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { cn } from "@/shared/lib/cn";

const sectionIds = [
  "inicio",
  "formacao",
  "projetos",
  "certificados",
  "blog",
  "agora",
  "atividade",
  "contato",
] as const;
type SectionId = (typeof sectionIds)[number];

export function HomeSectionMap() {
  const { sectionMap } = useI18n().home;
  const isDesktop = useMediaQuery("(min-width: 80rem)");
  const [activeId, setActiveId] = useState<SectionId>("inicio");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const sections = sectionIds.map((id) => ({
      id,
      element: document.getElementById(id),
    }));
    let frame = 0;
    let idleTimeout: number | undefined;

    const update = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.25, 128);
      let current: SectionId = "inicio";
      for (const { id, element } of sections) {
        if (element && element.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        current = "contato";
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onScroll = () => {
      schedule();
      setIsScrolling(true);
      window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    };
    const observer = new ResizeObserver(schedule);
    for (const { element } of sections) {
      if (element) observer.observe(element);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimeout);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, [isDesktop]);

  return (
    <nav
      aria-label={sectionMap.label}
      className="home-section-map fixed top-1/2 right-8 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col">
        {sectionIds.map((id, index) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={sectionMap.sections[id]}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  const target = document.getElementById(id);
                  if (!target) return;
                  event.preventDefault();
                  target.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                    block: "start",
                  });
                }}
                className="group relative flex h-4 w-9 items-center justify-end rounded-lg"
              >
                <span
                  aria-hidden
                  className={cn(
                    "home-section-map-label text-detail type-decoration pointer-events-none absolute right-7 flex items-center gap-2 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none",
                    isActive && isScrolling && "opacity-100",
                  )}
                >
                  <span className="text-detail text-xs tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {sectionMap.sections[id]}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "bg-detail/50 group-hover:bg-text group-focus-visible:bg-text h-0.5 w-3 rounded-full transition-all duration-200 group-hover:w-5 group-focus-visible:w-5 motion-reduce:transition-none",
                    isActive && "bg-text w-5",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
