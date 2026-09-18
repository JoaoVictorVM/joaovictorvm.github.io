import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { FooterNav } from "@/components/layout/FooterNav";
import { useI18n } from "@/shared/hooks/useI18n";

export function Footer() {
  const { footer } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-line bg-bg border-t">
      <Container>
        <div className="flex flex-col gap-6 py-4 text-sm sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xs">
            <Link
              to="/"
              aria-label={footer.logoLabel}
              className="text-text inline-block text-lg"
            >
              &lt;J/&gt;
            </Link>
            <p className="text-detail mt-2">
              {footer.location}
              <br />
              {year}
            </p>
          </div>
          <FooterNav />
        </div>
      </Container>
    </footer>
  );
}
