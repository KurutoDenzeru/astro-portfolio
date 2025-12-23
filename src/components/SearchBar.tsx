import * as React from "react"
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

type Props = {
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  setQuery: (value: string) => void;
  placeholderText: string;
};

export default function SearchBar({ onSearchInput, query, setQuery, placeholderText }: Props) {
  return (
    <div className="relative">
      <SearchIcon className="absolute size-6 left-2 top-[0.45rem] stroke-neutral-400 dark:stroke-neutral-500 pointer-events-none" />
      <Input
        name="search"
        type="text"
        value={query}
        onChange={onSearchInput}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholderText}
        className="w-full px-10 py-1.5 rounded outline-none placeholder-neutral-400 dark:placeholder-neutral-500 text-black dark:text-white bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 focus:bg-black/10 focus:dark:bg-white/15 border border-black/10 dark:border-white/10 focus:border-black/40 focus:dark:border-white/40"
      />
      {query.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => setQuery("")}
          className="absolute flex justify-center items-center h-full w-10 right-0 top-0 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300 hover:bg-transparent"
        >
          <X className="size-5" />
        </Button>
      )}
    </div>
  );
}