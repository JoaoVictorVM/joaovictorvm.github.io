import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { NotFound } from "@/components/layout/NotFound";
import { PageColumn } from "@/components/layout/PageColumn";
import { PostBody } from "@/features/blog/components/PostBody";
import { PostConnect } from "@/features/blog/components/PostConnect";
import { PostHeader } from "@/features/blog/components/PostHeader";
import { getPostBySlug } from "@/features/blog/data/posts";
import { pageTitle, siteConfig } from "@/shared/config/site";
import { pageHead } from "@/shared/lib/seo";
import { useI18n } from "@/shared/hooks/useI18n";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

export const Route = createFileRoute("/_site/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      return pageHead({
        ...siteConfig.pages.notFound,
        path: `/blog/${params.slug}`,
      });
    }

    return pageHead({
      title: pageTitle(post.title),
      description: post.summary,
      path: `/blog/${post.slug}`,
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { blog } = useI18n();
  const { ref, isVisible } = useReveal();
  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="py-16">
      <Container>
        <PageColumn backLabel={blog.backToBlog} backTo="/blog">
          <PostHeader title={post.title} date={post.date} />
          <div
            ref={ref}
            className={cn("content-reveal delay-300", isVisible && "visible")}
          >
            <PostBody>
              <post.Content />
            </PostBody>
          </div>
          <PostConnect />
        </PageColumn>
      </Container>
    </article>
  );
}
