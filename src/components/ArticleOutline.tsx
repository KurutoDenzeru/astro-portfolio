import { List, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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

/** Headings that hold only an emoji render an empty label, so fall back to the slug. */
function labelFor(heading: OutlineHeading): string {
  const text = heading.text.trim();
  return text.length > 0 ? text : heading.slug.replace(/-/g, " ").trim();
}

const linkClass = cn(
  "block truncate rounded-md px-2 py-1.5 text-sm text-foreground/70 transition-colors",
  "hover:bg-muted hover:text-foreground",
  "aria-[current=location]:bg-muted aria-[current=location]:font-medium aria-[current=location]:text-foreground",
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

function ArticleOutline({ headings }: Props) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const isOpenRef = useRef(false);

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
      if (matches || parentVisible) {
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

    let frame = 0;

    const sync = () => {
      frame = 0;
      // The drawer locks body scroll, which fires a reset to the top of the page.
      if (isOpenRef.current) {
        return;
      }
      const line = window.scrollY + 96;
      const current = targets
        .filter((target) => target.getBoundingClientRect().top + window.scrollY <= line)
        .at(-1);
      setActiveSlug(current?.id ?? targets[0].id);
    };

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entries]);

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

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Reopening must land on the current section, not the top of the list.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const list = listRef.current;
    if (!list) {
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      const active =
        list.querySelector('[aria-current="location"]') ?? list.querySelector("a[href]");
      active?.scrollIntoView({ block: "center" });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [isOpen]);

  if (entries.length === 0) {
    return null;
  }

  const renderLink = (entry: (typeof entries)[number], onNavigate?: () => void) => (
    <li key={entry.slug} className={cn(entry.depth === 3 && "pl-3")}>
      <a
        href={`#${entry.slug}`}
        aria-current={activeSlug === entry.slug ? "location" : undefined}
        onClick={onNavigate}
        className={cn(linkClass, "outline-item")}
        title={entry.label}
      >
        <span className="outline-label">{entry.label}</span>
      </a>
    </li>
  );

  return (
    <>
      {/* Rail pinned to the left gutter, only where it clears the article column */}
      {typeof document !== "undefined" &&
        createPortal(
          <nav
            aria-label="Contents"
            className="fixed left-6 top-1/2 hidden max-h-[calc(100vh-9rem)] w-48 -translate-y-1/2 overflow-y-auto min-[1400px]:block"
          >
            <ul>{entries.map((entry) => renderLink(entry))}</ul>
          </nav>,
          document.body,
        )}

      {/* Drawer trigger: portalled, because transform ancestors break position: fixed */}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="min-[1400px]:hidden">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  aria-label="Table of contents"
                  className="fixed bottom-26 left-0 z-30 size-auto rounded-r-xl rounded-l-none border-l-0 border border-foreground/10 bg-background/70 px-2.5 py-3 text-foreground/80 backdrop-blur-xl saturate-150 md:bottom-8 dark:border-foreground/20 dark:bg-background/50 dark:text-white/80"
                >
                  <List className="size-4" strokeWidth={2} />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="border-b border-border pb-3 text-left dark:border-white/10">
                  <DrawerTitle className="text-base">Contents</DrawerTitle>
                </DrawerHeader>

                <div className="px-4 pt-3">
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

                <ul ref={listRef} className="overflow-y-auto px-3 py-3">
                  {entries.flatMap((entry) =>
                    visibleSlugs.has(entry.slug) ? [renderLink(entry, () => setIsOpen(false))] : [],
                  )}
                  {visibleSlugs.size === 0 ? (
                    <li className="px-2 py-3 text-sm text-muted-foreground">No headings match.</li>
                  ) : null}
                </ul>
              </DrawerContent>
            </Drawer>
          </div>,
          document.body,
        )}
    </>
  );
}

export default ArticleOutline;
