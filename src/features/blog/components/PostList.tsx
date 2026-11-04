import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PostDate } from "@/features/blog/components/PostDate";
import { blogPosts } from "@/features/blog/data/posts";
import { useI18n } from "@/shared/hooks/useI18n";

export function PostList() {
  const { blog } = useI18n();

  return (
    <ul className="space-y-4">
      {blogPosts.map((post) => (
        <li key={post.slug}>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="hover:bg-line/40 group relative -mx-4 block rounded-lg px-4 py-5 transition-colors"
          >
            <ArrowUpRight
              size={16}
              aria-hidden
              className="text-detail absolute top-5 right-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="space-y-1.5 pr-7 sm:pr-0">
                <h2 className="type-primary text-text">{post.title}</h2>
                <p className="text-detail type-decoration">{post.summary}</p>
              </div>

              <div className="text-detail type-decoration flex shrink-0 items-center gap-3 pr-7">
                <PostDate date={post.date} format="short" />
                <span aria-hidden>·</span>
                <span>
                  {post.readingMinutes} {blog.readingTime}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
