import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import ArrowCard from "@components/ArrowCard";
import TagBadge from "@components/TagBadge";
import { cn } from "@lib/utils";
import SearchBar from "@components/SearchBar";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpNarrowWide, ArrowDownNarrowWide, Funnel, Check, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import type { ProjectEntryWithPreview } from "@lib/projectPreviews";
import type { TagOption } from "@lib/simpleIconTags";

type Props = {
  entry_name: string;
  tags: TagOption[];
  data: ProjectEntryWithPreview[];
};

function getProjectEntryKey(entry: ProjectEntryWithPreview): string {
  return entry.id ?? entry.data.title;
}

export default function SearchCollection({ entry_name, data, tags }: Props) {
  const coerced = useMemo(() => data, [data]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Set<string>>(new Set());
  const [collection, setCollection] = useState<ProjectEntryWithPreview[]>(data);
  const [descending, setDescending] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(coerced, {
      keys: ["slug", "data.title", "data.summary", "data.tags"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    });
  }, [coerced]);

  useEffect(() => {
    const base = debouncedQuery.length < 2 ? coerced : fuse.search(debouncedQuery).map((r) => r.item);

    const results = base.filter((entry) => {
      // Tag filters
      const tagsOk = Array.from(filter).every((value) =>
        entry.data.tags.some((tag: string) => tag.toLowerCase() === String(value).toLowerCase()),
      );

      if (!tagsOk) return false;

      return true;
    });

    const sorted = descending ? [...results].reverse() : results;
    setCollection(sorted);
    // Reset pagination when the underlying collection changes (search/filter/sort)
    setCurrentPage(1);
  }, [debouncedQuery, filter, descending, coerced, fuse]);

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
            <p className="text-sm font-semibold uppercase my-4 text-foreground">Tags</p>

            <div className="flex items-center gap-2">
              {/* Filter Dialog Trigger - shows advanced tag list */}
              <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger render={<Button variant="outline" size="sm" className="flex items-center gap-2"><Funnel className="size-4" />Filter</Button>} />
                <DialogContent className="max-w-sm!">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Funnel className="size-4" />Filter tags</DialogTitle>
                    <DialogDescription>Select tags to filter the collection</DialogDescription>
                  </DialogHeader>

                  <ScrollArea className="my-2 max-h-[42vh]">
                    <div className="space-y-3 p-1">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                          const isSelected = filter.has(tag.label);

                          return (
                             <button
                               key={tag.label}
                               type="button"
                               onClick={() => toggleTag(tag.label)}
                               aria-pressed={isSelected}
                               aria-label={`Filter by ${tag.label}`}
                               className="group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                             >
                               <Badge
                                 variant="outline"
                                 className={cn(
                                   "inline-flex min-w-max px-3 py-2 group rounded-lg border flex gap-2 items-center border-border/50 bg-muted/40 dark:bg-muted/40 hover:bg-muted/60 hover:dark:bg-muted/60 blend cursor-pointer transition-all duration-200",
                                   isSelected && "border-foreground/20 bg-foreground text-background shadow-sm shadow-black/10 dark:shadow-black/40",
                                 )}
                               >
                                 <TagBadge tag={tag} className="text-[11px] text-foreground/90 dark:text-foreground/80" labelClassName="text-[11px]" />
                                 {isSelected && <Check className="size-3.5" />}
                               </Badge>
                             </button>
                          );
                        })}
                      </div>

                      {filter.size > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {filter.size} tag{filter.size === 1 ? "" : "s"} selected
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* footer action buttons – split evenly, avoid overflow */}
                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={clearFilters}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsFilterDialogOpen(false)}
                    >
                      <Check className="size-4" />
                      Done
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {filter.size > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex justify-center items-center h-full w-auto stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 z-50"
                  aria-label="Clear filters"
                >
                  {/* <X className="size-5" /> */}
                  Clear All
                </Button>
              )}
            </div>
          </div>

          <ul className="flex flex-wrap sm:flex-col gap-1.5">
            {tags.slice(0, 10).map((tag) => (
              <li className="sm:w-full" key={tag.label}>
                <Button
                  variant="outline"
                  onClick={() => toggleTag(tag.label)}
                  className={cn(
                    "w-full px-2 py-1 rounded",
                    "flex gap-2 items-center justify-start text-left",
                    "bg-muted/40 dark:bg-muted/20",
                    "hover:bg-muted/60 hover:dark:bg-muted/30",
                    "transition-colors duration-300 ease-in-out",
                    filter.has(tag.label) && "text-foreground",
                  )}
                >
                  <Checkbox
                    checked={filter.has(tag.label)}
                    onCheckedChange={() => toggleTag(tag.label)}
                    className="shrink-0 border-foreground/20 dark:border-foreground/30"
                  />
                  <TagBadge
                    tag={tag}
                    className="min-w-0 pt-0.5"
                    labelClassName="block min-w-0 text-left"
                  />
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
                value={String(pageSize)}
                onValueChange={(val) => {
                  setPageSize(Number(val));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger size="sm" className="w-22.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 50].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {String(n)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={toggleDescending} className='flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300'>
              <div className="text-sm">{descending ? "Descending" : "Ascending"}</div>
              {descending ? (
                <ArrowDownNarrowWide className="size-4 left-2 top-[0.45rem] stroke-neutral-400 dark:stroke-neutral-500" />
              ) : (
                <ArrowUpNarrowWide className="size-4 left-2 top-[0.45rem] stroke-neutral-400 dark:stroke-neutral-500" />
              )}
            </Button>
          </div>
          <ul className="flex flex-col gap-3">
            {/** Paginate the collection for rendering */}
            {collection.length > 0 ? (
              collection
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((entry) => (
                  <li key={getProjectEntryKey(entry)}>
                    <ArrowCard entry={entry} tagOptions={tags} />
                  </li>
                ))
            ) : (
              <li className="flex items-center justify-center min-h-[200px]">
                <Empty className="py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SearchX className="size-6" />
                    </EmptyMedia>
                    <EmptyTitle>No results found</EmptyTitle>
                    <EmptyDescription>
                      {query || filter.size > 0
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "No projects available yet."}
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </li>
            )}
          </ul>

          {/* Pagination controls - placed below the projects list */}
          {collection.length > 0 && (
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
                          window.scrollTo({ top: 0, behavior: 'smooth' });
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
                              window.scrollTo({ top: 0, behavior: 'smooth' });
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
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
