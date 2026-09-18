import { Link } from "@tanstack/react-router";

import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

export function Brand() {
  const { header } = useI18n();
  const { identity } = header;

  return (
    <div>
      <Link
        to="/"
        aria-label={identity.homeLabel}
        className="text-text block text-lg"
      >
        {identity.name}
      </Link>
      <ul className="text-detail flex flex-col gap-x-2 text-sm font-normal italic sm:flex-row sm:flex-wrap sm:items-center">
        {identity.roles.map((role, index) => (
          <li key={role} className="flex items-center gap-x-2">
            <span aria-hidden="true" className={cn(index === 0 && "sm:hidden")}>
              &bull;
            </span>
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}
