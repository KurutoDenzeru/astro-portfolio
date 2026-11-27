import { List, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type OutlineHeading = {
  depth: number;
  slug: string;
  text: string;
};

type Props = {
  headings: OutlineHeading[];
};

/** Section headings that contain an emoji render an empty label, so fall back to the slug. */
function labelFor(heading: OutlineHeading): string {
  const text = heading.text.trim();
  return text.length > 0 ? text : heading.slug.replace(/-/g, " ").trim();
}

const HEADER_OFFSET = 96;

function ArticleOutline({ headings }: Props) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState("");
  const listRef = useRef<HTMLUListElement | null>(null);

  const entries = useMemo(
    () =>
      headings.flatMap((heading) =>
        heading.depth === 2 || heading.depth === 3
          ? [{ ...heading, label: labelFor(heading) }]
          : [],
      ),
    [headings],
  );

  // Keep an h3 visible only while its parent h2 matches the query.
  const visibleSlugs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return new Set(entries.map((entry) => entry.slug));
    }

    const visible = new Set<string>();
    let parentVisible = false;

    for (const entry of entries) {
      const matches = entry.label.toLowerCase().includes(needle);
      if (entry.depth === 2) {
        parentVisible = matches;
        if (matches) {
          visible.add(entry.slug);
        }
        continue;
      }
      if (matches) {
        visible.add(entry.slug);
      } else if (parentVisible) {
        visible.add(entry.slug);
      }
    }

    return visible;
  }, [entries, query]);

  useEffect(() => {
    if (typeof window === "undefined" || entries.length === 0) {
      return undefined;
    }

    const targets = entries
      .map((entry) => document.getElementById(entry.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [entries]);

  const handleJump = (slug: string) => {
    const target = document.getElementById(slug);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${slug}`);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      const links = Array.from(list.querySelectorAll<HTMLAnchorElement>("a[href]"));
      if (links.length === 0) {
        return;
      }

      event.preventDefault();
      const index = links.findIndex((link) => link === document.activeElement);
      const nextIndex =
        event.key === "ArrowDown" ? Math.min(index + 1, links.length - 1) : Math.max(index - 1, 0);

      links[index === -1 ? 0 : nextIndex]?.focus();
    };

    list.addEventListener("keydown", handleKeyDown);
    return () => list.removeEventListener("keydown", handleKeyDown);
  }, [entries]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Table of contents"
            className="text-foreground/70"
          >
            <List className="size-4" strokeWidth={2} />
          </Button>
        }
      />
      <DialogContent className="max-w-md gap-0 p-0">
        <DialogHeader className="border-b border-border p-4 dark:border-white/10">
          <DialogTitle className="text-base">Contents</DialogTitle>
        </DialogHeader>

        <div className="p-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              strokeWidth={2}
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter headings"
              aria-label="Filter headings"
              className="pl-8"
            />
          </div>
        </div>

        <ul ref={listRef} className="max-h-[60vh] overflow-y-auto px-2 pb-3">
          {entries
            .filter((entry) => visibleSlugs.has(entry.slug))
            .map((entry) => (
              <li key={entry.slug} className={cn(entry.depth === 3 && "pl-4")}>
                <a
                  href={`#${entry.slug}`}
                  aria-current={activeSlug === entry.slug ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleJump(entry.slug);
                  }}
                  className={cn(
                    "flex rounded-md px-2 py-1.5 text-sm text-foreground/75 transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "aria-[current=location]:bg-muted aria-[current=location]:font-medium aria-[current=location]:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  )}
                >
                  {entry.label}
                </a>
              </li>
            ))}
          {visibleSlugs.size === 0 ? (
            <li className="px-2 py-3 text-sm text-muted-foreground">No headings match.</li>
          ) : null}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleOutline;
