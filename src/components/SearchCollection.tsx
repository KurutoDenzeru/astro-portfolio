import React, { useEffect, useMemo, useState } from "react";
import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import ArrowCard from "@components/ArrowCard";
import { cn } from "@lib/utils";
import SearchBar from "@components/SearchBar";
import { X, Search, Square, SquareCheck, ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  entry_name: string;
  tags: string[];
  data: CollectionEntry<"blog">[] | CollectionEntry<'projects'>[];
};

export default function SearchCollection({ entry_name, data, tags }: Props) {
  const coerced = useMemo(
    () => data.map((entry) => entry as CollectionEntry<'blog'>),
    [data],
  );

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Set<string>>(new Set());
  const [collection, setCollection] = useState<CollectionEntry<'blog'>[]>([]);
  const [descending, setDescending] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(coerced, {
      keys: ["slug", "data.title", "data.summary", "data.tags"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    });
  }, [coerced]);

  useEffect(() => {
    const results = (query.length < 2 ? coerced : fuse.search(query).map((r) => r.item)).filter((entry) =>
      Array.from(filter).every((value) =>
        entry.data.tags.some((tag: string) => tag.toLowerCase() === String(value).toLowerCase()),
      ),
    );

    setCollection(descending ? [...results].reverse() : results);
  }, [query, filter, descending, coerced, fuse]);

  function toggleDescending() {
    setDescending((d) => !d);
  }

  function toggleTag(tag: string) {
    setFilter((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearFilters() {
    setFilter(new Set<string>());
  }

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) wrapper.style.minHeight = "unset";
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Control Panel*/}
      <div className="col-span-3 sm:col-span-1">
  <div className="sticky top-24 mt-7" suppressHydrationWarning>
          {/* Search Bar */}
          <SearchBar onSearchInput={onSearchInput} query={query} setQuery={setQuery} placeholderText={`Search ${entry_name}`} />
          {/* Tag Filters */}
          <div className="relative flex flex-row justify-between w-full">
            <p className="text-sm font-semibold uppercase my-4 text-black dark:text-white">Tags</p>
            {filter.size > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
                aria-label="Clear filters"
              >
                <X className="size-5" />
              </Button>
            )}
          </div>
          <ul className="flex flex-wrap sm:flex-col gap-1.5">
            {tags.map((tag) => (
              <li className="sm:w-full" key={tag}>
                <Button
                  variant="outline"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "w-full px-2 py-1 rounded",
                    "flex gap-2 items-center justify-start text-left",
                    "bg-black/5 dark:bg-white/10",
                    "hover:bg-black/10 hover:dark:bg-white/15",
                    "transition-colors duration-300 ease-in-out",
                    filter.has(tag) && "text-black dark:text-white",
                  )}
                >
                  {!filter.has(tag) ? (
                    <Square
                      className={cn(
                        "shrink-0 size-5 text-black/50 dark:text-white/50",
                        "transition-colors duration-300 ease-in-out",
                      )}
                    />
                  ) : (
                    <SquareCheck
                      className={cn(
                        "shrink-0 size-5 text-black dark:text-white",
                        "transition-colors duration-300 ease-in-out",
                      )}
                    />
                  )}

                  <span className="truncate block min-w-0 pt-[2px] text-left">{tag}</span>
                </Button>

              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Posts */}
      <div className="col-span-3 sm:col-span-2">
        <div className="flex flex-col">
          {/* Info Bar */}
          <div className='flex justify-between flex-row mb-2'>
            <div className="text-sm uppercase">SHOWING {collection.length} OF {data.length} {entry_name}</div>
            <Button variant="outline" onClick={toggleDescending} className='flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300'>
              <div className="text-sm uppercase">{descending ? "DESCENDING" : "ASCENDING"}</div>
              {descending ? (
                <ArrowDownNarrowWide className="size-5 left-2 top-[0.45rem]" />
              ) : (
                <ArrowUpNarrowWide className="size-5 left-2 top-[0.45rem]" />
              )}
            </Button>
          </div>
          <ul className="flex flex-col gap-3">
            {collection.map((entry) => (
              <li key={`${(entry as any).slug ?? (entry as any).id ?? entry.data.title}`}>
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}