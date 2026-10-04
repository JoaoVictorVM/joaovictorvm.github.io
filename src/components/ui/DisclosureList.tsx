import { useState, type CSSProperties } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface DisclosureLink {
  label: string;
  url: string;
}

export interface DisclosureItem {
  id: string;
  title: string;
  body: string;
  tags?: string[];
  tagsLabel?: string;
  links?: DisclosureLink[];
}

interface DisclosureListProps {
  items: DisclosureItem[];
}

export function DisclosureList({ items }: DisclosureListProps) {
  const [openId, setOpenId] = useState("");

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openId}
      onValueChange={setOpenId}
      className="space-y-2"
    >
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <Accordion.Item
            key={item.id}
            value={item.id}
            style={
              {
                "--seq-delay": `calc(var(--stagger) * ${String(index)})`,
                "--title-chars": item.title.length,
              } as CSSProperties
            }
          >
            <Accordion.Header asChild>
              <h2>
                <Accordion.Trigger className="group text-text hover:bg-line/30 hover:text-text/80 flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 text-left transition-colors">
                  <span className="project-title">{item.title}</span>
                  <span className="project-line flex-1" />
                  <ChevronDown
                    size={18}
                    aria-hidden
                    className={cn(
                      "project-chevron text-text shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </Accordion.Trigger>
              </h2>
            </Accordion.Header>
            <Accordion.Content className="accordion-content">
              <div className="text-detail space-y-3 px-2 pt-2 pb-3 text-sm">
                <p className="accordion-reveal">{item.body}</p>
                {item.tags && item.tags.length > 0 && (
                  <p className="accordion-reveal">
                    {item.tagsLabel ? `${item.tagsLabel}: ` : ""}
                    {item.tags.join(" · ")}
                  </p>
                )}
                {item.links && item.links.length > 0 && (
                  <div className="accordion-reveal flex flex-wrap gap-2">
                    {item.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="decoration-detail/50 hover:decoration-detail inline-flex items-center gap-1 p-2 underline underline-offset-4 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight size={12} aria-hidden />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
