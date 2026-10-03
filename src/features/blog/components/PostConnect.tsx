import { socialLinks } from "@/shared/data/socialLinks";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Convite para contato exibido junto ao post. Em telas largas ocupa a coluna
 * lateral direita, acompanhando a leitura; abaixo de `lg` — onde a margem já
 * não comporta a coluna — cai para o fim do texto, como um bloco comum.
 */
export function PostConnect() {
  const { blog } = useI18n();

  return (
    <aside
      aria-labelledby="post-connect-title"
      className="border-line mt-12 border-t pt-6 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-32 lg:translate-x-38 lg:border-t-0 lg:pt-0"
    >
      <div className="space-y-4 lg:sticky lg:top-16">
        <p id="post-connect-title" className="text-detail text-sm">
          {blog.connect}
        </p>

        <ul className="flex items-center gap-4 lg:gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="text-detail hover:text-text inline-flex transition-colors"
              >
                <Icon width={18} height={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
