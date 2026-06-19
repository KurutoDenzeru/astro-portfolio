import type { CollectionEntry } from "astro:content";
import TagBadge from "@components/TagBadge";
import type { ProjectEntryWithPreview } from "@lib/projectPreviews";
import type { TagOption } from "@lib/simpleIconTags";
import { formatDate } from "@lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  entry: ProjectEntryWithPreview | CollectionEntry<"projects">;
  pill?: boolean;
  tagOptions?: TagOption[];
  truncateTags?: boolean;
};

export default function ArrowCard({ entry, pill, tagOptions, truncateTags }: Props) {
  const [loaded, setLoaded] = useState(false);
  const previewImage =
    "previewImage" in entry.data ? entry.data.previewImage : entry.data.coverImage?.src;
  const hasImage = Boolean(previewImage);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      setLoaded(true);
      return;
    }

    const handleLoad = () => setLoaded(true);
    const handleError = () => setLoaded(true);

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <a
      href={`/projects/${entry.id}`}
      className="group relative flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 ease-out hover:border-accent/40 hover:shadow-[0_1px_3px_0_oklch(0.672_0.1308_38.76/0.25)]"
    >
      {/* Image */}
      {hasImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}

          <img
            ref={imgRef}
            src={previewImage}
            alt={entry.data.coverAlt}
            loading="lazy"
            className={`h-full w-full object-cover object-center ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />

          {/* Subtle gradient overlay at bottom for text legibility if needed */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {pill && (
          <div className="text-xs font-medium uppercase tracking-widest text-accent">projects</div>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground line-clamp-1 group-hover:text-accent transition-colors duration-300">
              {entry.data.title}
            </h3>
            <time className="mt-1 block text-sm text-muted-foreground">
              {formatDate(entry.data.date)}
            </time>
          </div>

          {/* Arrow indicator */}
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {entry.data.summary}
        </p>

        {/* Tags */}
        <ul
          className={`mt-auto pt-1 flex gap-1.5 ${truncateTags ? "flex-nowrap overflow-hidden" : "flex-wrap"}`}
        >
          {entry.data.tags.map((tag: string) => (
            <li
              key={tag}
              className="inline-flex min-w-max px-2.5 py-1 rounded-md border border-border/50 bg-muted/30 transition-colors duration-200 hover:bg-muted/60"
            >
              <TagBadge
                className="text-[11px] whitespace-nowrap normal-case text-muted-foreground"
                iconClassName="size-3.5"
                labelClassName="text-[11px]"
                tag={tagOptions?.find((option) => option.label === tag) ?? { label: tag }}
              />
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
