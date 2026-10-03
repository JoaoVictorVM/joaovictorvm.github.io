import { ConsentChoice } from "@/features/privacy/components/ConsentChoice";
import { PrivacySection } from "@/features/privacy/components/PrivacySection";
import { siteConfig } from "@/shared/config/site";
import { useI18n } from "@/shared/hooks/useI18n";

const listClassName = "marker:text-detail list-disc space-y-2 pl-5";
const linkClassName =
  "decoration-text/30 hover:decoration-text underline underline-offset-4 transition-colors";

export function PrivacyContent() {
  const { privacy } = useI18n();
  const { summary, analytics, storage, choice, rights } = privacy;

  return (
    <div className="text-text flex flex-col gap-12">
      <PrivacySection title={summary.title}>
        {summary.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PrivacySection>

      <PrivacySection title={analytics.title}>
        <p>{analytics.intro}</p>
        <ul className={listClassName}>
          {analytics.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{analytics.notCollected}</p>
        <p>{analytics.processor}</p>
      </PrivacySection>

      <PrivacySection title={storage.title}>
        <p className="text-detail text-sm">{storage.cookiesLabel}</p>
        <ul className={listClassName}>
          {storage.cookies.map((cookie) => (
            <li key={cookie.name}>
              <code className="bg-line/40 rounded-sm px-1.5 py-0.5 font-mono text-sm">
                {cookie.name}
              </code>{" "}
              <span className="text-detail">— {cookie.description}</span>
            </li>
          ))}
        </ul>
        <p className="text-detail text-sm">{storage.essentialLabel}</p>
        <ul className={listClassName}>
          {storage.essential.map((item) => (
            <li key={item.name}>
              {item.name}{" "}
              <span className="text-detail">— {item.description}</span>
            </li>
          ))}
        </ul>
      </PrivacySection>

      <PrivacySection title={choice.title}>
        <ConsentChoice />
      </PrivacySection>

      <PrivacySection title={rights.title}>
        <p>{rights.paragraph}</p>
        <p>
          {rights.contactPrefix}{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className={linkClassName}
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </PrivacySection>

      <p className="text-detail text-sm">
        {privacy.updatedLabel}: {privacy.updatedAt}
      </p>
    </div>
  );
}
