import { PostDate } from "@/features/blog/components/PostDate";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

interface PostHeaderProps {
  title: string;
  date: string;
}

export function PostHeader({ title, date }: PostHeaderProps) {
  const { ref, isVisible } = useReveal();

  return (
    <div ref={ref} className="mb-10">
      <h1
        className={cn(
          "fast-fade-up type-primary text-text delay-200",
          isVisible && "visible",
        )}
      >
        {title}
      </h1>
      <PostDate
        date={date}
        className={cn("fast-fade-up block delay-250", isVisible && "visible")}
      />
    </div>
  );
}
