import React, { useEffect, useMemo, useState } from "react";
import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import ArrowCard from "@components/ArrowCard";
import { cn } from "@lib/utils";
import SearchBar from "@components/SearchBar";
import { X, Square, SquareCheck, ArrowUpNarrowWide, ArrowDownNarrowWide, Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Select from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [showMoreTags, setShowMoreTags] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(coerced, {
      keys: ["slug", "data.title", "data.summary", "data.tags"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    });
  }, [coerced]);

  useEffect(() => {
    const results = (debouncedQuery.length < 2 ? coerced : fuse.search(debouncedQuery).map((r) => r.item)).filter((entry) =>
      Array.from(filter).every((value) =>
        entry.data.tags.some((tag: string) => tag.toLowerCase() === String(value).toLowerCase()),
      ),
    );

    const sorted = descending ? [...results].reverse() : results;
    setCollection(sorted);
    // Reset pagination when the underlying collection changes (search/filter/sort)
    setCurrentPage(1);
  }, [query, filter, descending, coerced, fuse]);

  // Debounce the search input to avoid running Fuse on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Memoize pagination calculations
  const totalPages = useMemo(() => Math.max(1, Math.ceil(collection.length / pageSize)), [collection.length, pageSize]);

  const pages = useMemo(() => {
    const arr: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (currentPage > 4) arr.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) arr.push(i);
      if (currentPage < totalPages - 3) arr.push("...");
      arr.push(totalPages);
    }
    return arr;
  }, [totalPages, currentPage]);

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
          <div className="relative flex flex-row justify-between w-full items-center">
            <p className="text-sm font-semibold uppercase my-4 text-black dark:text-white">Tags</p>

            <div className="flex items-center gap-2">
              {/* Filter Dialog Trigger - shows advanced tag list */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2 flex items-center gap-2">
                    <Funnel className="size-4" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Funnel className="size-4" />Filter tags</DialogTitle>
                    <DialogDescription>Select tags to filter the collection</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-2 max-h-[50vh] overflow-auto my-2">
                    {/* Show first 10 tags by default */}
                    {(showMoreTags ? tags : tags.slice(0, 10)).map((tag) => (
                      <label key={tag} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filter.has(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {tags.length > 10 && (
                      <Button variant="ghost" size="sm" onClick={() => setShowMoreTags((s) => !s)}>
                        {showMoreTags ? "Show less" : `Show more (${tags.length - 10})`}
                      </Button>
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" onClick={() => { setShowMoreTags(false); }}>Done</Button>
                        </DialogClose>
                    </DialogFooter>
                  </div>

                  <DialogClose />
                </DialogContent>
              </Dialog>

              {filter.size > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex justify-center items-center h-full w-10 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
                  aria-label="Clear filters"
                >
                  <X className="size-5" />
                </Button>
              )}
            </div>
          </div>
          <ul className="flex flex-wrap sm:flex-col gap-1.5">
            {tags.slice(0, 10).map((tag) => (
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
            <div className="flex items-center gap-2">
              <div className="text-sm uppercase">Items per page</div>
              <Select
                options={[5, 10, 15, 20, 50].map((n) => ({ value: String(n), label: String(n) }))}
                defaultValue={String(pageSize)}
                onValueChange={(val) => {
                  setPageSize(Number(val));
                  setCurrentPage(1);
                }}
                placeholder="Items"
                size="sm"
                triggerClassName="w-[90px]"
              />
            </div>
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
            {/** Paginate the collection for rendering */}
            {collection
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((entry) => (
                <li key={`${(entry as any).slug ?? (entry as any).id ?? entry.data.title}`}>
                  <ArrowCard entry={entry} />
                </li>
              ))}
          </ul>

          {/* Pagination controls - placed below the projects list */}
          <div className="flex flex-row items-center justify-between mt-4">
            {/* Left side intentionally left blank (select moved to top) */}
            <div />

            {/* Pagination on the right */}
            <div className="ml-auto">
              <Pagination aria-label="Projects pagination">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.max(1, p - 1));
                      }}
                    />
                  </PaginationItem>

                  {/** Render memoized pages */}
                  {pages.map((p, idx) => (
                    <PaginationItem key={String(p) + idx}>
                      {p === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={p === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(Number(p));
                          }}
                        >
                          {p}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}