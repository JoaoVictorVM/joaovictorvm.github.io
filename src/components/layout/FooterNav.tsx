import { Link } from "@tanstack/react-router";

import { siteNavItems } from "@/shared/config/navigation";
import { useI18n } from "@/shared/hooks/useI18n";

const ITEMS_PER_ROW = 3;

// Ordem de leitura natural no DOM (e no mobile). No desktop o alinhamento é à
// direita e a ordem é invertida visualmente via `sm:flex-row-reverse`.
const rows = [
  siteNavItems.slice(0, ITEMS_PER_ROW),
  siteNavItems.slice(ITEMS_PER_ROW),
];

export function FooterNav() {
  const { footer } = useI18n();

  return (
    <nav aria-labelledby="footer-nav-title">
      <h2
        id="footer-nav-title"
        className="text-text mb-2 text-sm sm:text-right"
      >
        {footer.nav.title}
      </h2>
      {rows.map((row) => (
        <ul
          key={row[0]?.to}
          className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:flex-row-reverse"
        >
          {row.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: true }}
                activeProps={{}}
                className="text-detail hover:text-text transition-colors"
              >
                {footer.nav[item.label]}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  );
}
