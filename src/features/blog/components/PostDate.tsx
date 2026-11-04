import { usePreference } from "@/shared/hooks/usePreference";
import { formatDate, type DateFormat } from "@/shared/lib/date";
import { cn } from "@/shared/lib/cn";

interface PostDateProps {
  date: string;
  format?: DateFormat;
  className?: string;
}

export function PostDate({ date, format = "long", className }: PostDateProps) {
  const { language } = usePreference();

  return (
    <time
      dateTime={date}
      className={cn("text-detail type-decoration", className)}
    >
      {formatDate(date, language, format)}
    </time>
  );
}
