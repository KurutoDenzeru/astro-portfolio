import type { CollectionEntry } from "astro:content";
import { formatDate } from "@lib/utils";

type BlogEntry = CollectionEntry<"blog">;
type ProjectEntry = CollectionEntry<"projects">;

type Props<T extends "blog" | "projects"> = {
	entry: T extends "blog" ? BlogEntry : ProjectEntry;
	pill?: boolean;
};

export default function ArrowCard<T extends "blog" | "projects">({
	entry,
	pill,
}: Props<T>) {
	return (
		<a
			href={`/${entry.collection}/${entry.slug}`}
			class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
		>
			<div class="w-full group-hover:text-black group-hover:dark:text-white blend">
				<div class="flex flex-wrap items-center gap-2 ">
					{pill && (
						<div class="text-sm capitalize mb-4 px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
							{entry.collection === "blog" ? "post" : "project"}
						</div>
					)}
				</div>

				{entry.collection === "projects" && (
					<img
						src={entry.data.coverImage?.src ?? ""}
						alt={entry.data.coverAlt}
						loading="lazy"
						class="h-full w-80 rounded-lg shadow-md object-cover object-center"
					/>
				)}

				<div class="tracking-[-.05em] text-black dark:text-white mt-3">
					<span class="font-semibold">{entry.data.title}</span> |{" "}
					<span class="font-normal">{formatDate(entry.data.date)}</span>
				</div>
				<div class="text-sm line-clamp-2">{entry.data.summary}</div>
				<ul class="flex flex-wrap mt-2 gap-1">
					{entry.data.tags.map((tag: string) => (
						<li class="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
							{tag}
						</li>
					))}
				</ul>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"
			>
				<title>Arrow Right</title>
				<line
					x1="5"
					y1="12"
					x2="19"
					y2="12"
					class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
				/>
				<polyline
					points="12 5 19 12 12 19"
					class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
				/>
			</svg>
		</a>
	);
}
