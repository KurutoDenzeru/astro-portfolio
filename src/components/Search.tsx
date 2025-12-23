import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CollectionEntry } from "astro:content";
import ArrowCard from "@components/ArrowCard";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react";

type Props = {
	data: CollectionEntry<"projects">[];
};

export default function Search({ data }: Props) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<CollectionEntry<"projects">[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const fuse = useMemo(() => {
		return new Fuse(data, {
			keys: ["slug", "data.title", "data.summary", "data.tags"],
			includeMatches: true,
			minMatchCharLength: 2,
			threshold: 0.4,
		});
	}, [data]);

	useEffect(() => {
		if (query.length < 2) {
			setResults([]);
		} else {
			setResults(fuse.search(query).map((r) => r.item));
		}
	}, [query, fuse]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className="flex flex-col">
			<div className="relative">
				<Input
					ref={inputRef}
					name="search"
					type="text"
					value={query}
					onChange={onInput}
					autoComplete="on"
					spellCheck={false}
					placeholder="What are you looking for?"
					className="w-full px-2.5 py-1.5 pl-10 rounded-lg outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white focus:outline-none focus:ring"
				/>
				<SearchIcon className="absolute size-5 left-2.5 top-1/2 -translate-y-1/2 stroke-neutral-400 dark:stroke-neutral-500" />
			</div>

			{query.length >= 2 && results.length >= 1 && (
				<div className="mt-12">
					<div className="text-sm uppercase mb-2">
						Found {results.length} results for {`'${query}'`}
					</div>
					<ul className="flex flex-col gap-3">
						{results.map((result) => (
							<li key={`${(result as any).slug ?? (result as any).id ?? result.data.title}`}>
								<ArrowCard entry={result} pill={true} />
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
