import * as React from "react"
import { Search as SearchIcon, X } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"

type Props = {
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  setQuery: (value: string) => void;
  placeholderText: string;
};

export default function SearchBar({ onSearchInput, query, setQuery, placeholderText }: Props) {
  return (
    <InputGroup className="h-10 rounded-lg border-foreground/15 dark:border-white/25 bg-input/30 shadow-none *:data-[slot=input-group-addon]:pl-3">
      <InputGroupAddon>
        <SearchIcon className="size-4 shrink-0 opacity-50" />
      </InputGroupAddon>
      <InputGroupInput
        name="search"
        type="text"
        value={query}
        onChange={onSearchInput}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholderText}
        className="w-full text-sm"
      />
      {query.length > 0 && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}