import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { socialLinks } from "@/shared/data/socialLinks";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export function ConnectSection() {
  const { home } = useI18n();
  const { connect } = home;
  const { ref, isVisible } = useReveal<HTMLElement>();
  const groups = [
    {
      id: "connect",
      title: connect.title,
      labels: ["Linkedin", "Instagram", "GitHub"],
    },
    {
      id: "contact",
      title: connect.contactTitle,
      labels: ["Email", "WhatsApp"],
    },
  ];

  return (
    <section
      ref={ref}
      className={cn("section-fade pb-16", isVisible && "visible")}
    >
      <Container className="text-text">
        <h2 className="mb-6 text-lg">{connect.sectionTitle}</h2>
        {groups.map((group) => (
          <div key={group.id}>
            <div className="group-line" />
            <div className="md:grid-certificate md:grid">
              <h3
                id={`home-${group.id}`}
                className="text-detail px-2 pt-4 pb-3 text-sm md:px-0 md:py-4"
              >
                {group.title}
              </h3>
              <ul aria-labelledby={`home-${group.id}`} className="min-w-0">
                {group.labels
                  .flatMap((label) =>
                    socialLinks.filter((link) => link.label === label),
                  )
                  .map((link, index) => {
                    const isExternal = link.href.startsWith("https://");
                    const content = (
                      <>
                        {link.label}
                        <ArrowUpRight
                          size={16}
                          aria-hidden
                          className="shrink-0"
                        />
                      </>
                    );
                    const rowClassName =
                      "flex items-center justify-between gap-3 px-2 py-4 md:px-3";

                    return (
                      <li key={link.href}>
                        {index > 0 && <div className="group-line" />}
                        <a
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="contact-link relative block text-sm"
                        >
                          <span className={rowClassName}>{content}</span>
                          <span
                            aria-hidden
                            className={cn(
                              "contact-link-fill absolute inset-0",
                              rowClassName,
                            )}
                          >
                            {content}
                          </span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ))}
        <div className="group-line md:ml-35" />
      </Container>
    </section>
  );
}
