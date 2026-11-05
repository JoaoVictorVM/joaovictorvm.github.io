import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { PostDate } from "@/features/blog/components/PostDate";
import { getFeaturedPosts } from "@/features/blog/data/posts";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

interface WritingHighlightsProps {
  isVisible: boolean;
}

const featuredPosts = getFeaturedPosts();

export function WritingHighlights({ isVisible }: WritingHighlightsProps) {
  const { blog } = useI18n();

  return (
    <div
      id="blog"
      className={cn(
        "text-appear flex scroll-mt-24 flex-col gap-6 delay-300",
        isVisible && "visible",
      )}
    >
      <h2 className="text-detail type-decoration">{blog.highlightsTitle}</h2>

      <div className="space-y-6">
        {featuredPosts.map((post) => (
          <article key={post.slug} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={inlineLinkClass}
              >
                <span>{post.title}</span>
                <ArrowUpRight size={14} aria-hidden className="text-detail" />
              </Link>
              <PostDate date={post.date} />
            </div>
            <p className="text-detail type-decoration">{post.summary}</p>
          </article>
        ))}
      </div>

      <Link to="/blog" className={inlineLinkClass}>
        <span>{blog.highlightsCta}</span>
        <ArrowUpRight size={14} aria-hidden className="text-detail" />
      </Link>
    </div>
  );
}
