import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { LinkCard } from "@/features/links/components/LinkCard";
import { links } from "@/features/links/data/links";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export function LinkTree() {
  const t = useI18n();
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24">
      <Container className="flex flex-col gap-10">
        <div
          className={cn(
            "fast-fade-up text-center delay-150",
            isVisible && "visible",
          )}
        >
          <p className="text-detail text-sm">{t.links.label}</p>
          <h1 className="text-text text-lg">{t.home.intro.name}</h1>
          <ul className="text-detail text-sm font-normal italic">
            {t.links.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
        <div
          className={cn(
            "fast-fade-up grid gap-4 delay-250",
            isVisible && "visible",
          )}
        >
          {links.map((item) => (
            <LinkCard key={item.title.pt} item={item} />
          ))}
        </div>
        {/* Esta página não tem a navegação do site (nem o menu com "Privacidade"):
            este link é o acesso à política e à troca da escolha de cookies. */}
        <Link
          to="/privacy"
          className={cn(
            "fast-fade-up text-detail hover:text-text self-center text-xs transition-colors delay-350",
            isVisible && "visible",
          )}
        >
          {t.links.privacy}
        </Link>
      </Container>
    </section>
  );
}
