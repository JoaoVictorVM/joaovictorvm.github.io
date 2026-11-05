import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { useEasterEggs } from "@/shared/hooks/useEasterEggs";
import { useI18n } from "@/shared/hooks/useI18n";

function DiscoveryToast() {
  const [isVisible, setIsVisible] = useState(true);
  const { easterEggs } = useI18n();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <p className="fast-fade-up text-detail type-decoration visible max-w-80 text-right">
      {easterEggs.found}
    </p>
  );
}

export function EasterEggCounter() {
  const { foundCount, totalCount } = useEasterEggs();

  if (foundCount === 0) {
    return null;
  }

  return (
    <div
      role="status"
      aria-atomic="true"
      className="fixed right-8 bottom-16 z-40 hidden flex-col items-end gap-3 xl:flex"
    >
      <DiscoveryToast key={foundCount} />
      <p className="fast-fade-up border-line bg-bg text-detail type-decoration visible flex h-9 items-center gap-2 rounded-lg border px-3 text-xs">
        <span>
          {foundCount} / {totalCount} Easter eggs
        </span>
        {foundCount === totalCount && (
          <Trophy size={16} aria-hidden className="text-text shrink-0" />
        )}
      </p>
    </div>
  );
}
