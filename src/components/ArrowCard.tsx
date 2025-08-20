import type { CollectionEntry } from "astro:content";
import { formatDate } from "@lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";

type BlogEntry = CollectionEntry<"blog">;
type ProjectEntry = CollectionEntry<"projects">;

type Props = {
	entry: BlogEntry | ProjectEntry;
	pill?: boolean;
};

export default function ArrowCard({
	entry,
	pill,
}: Props) {
	return (
		<a
			href={`/${entry.collection}/${entry.slug}`}
			className="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
		>
			<div className="w-full group-hover:text-black group-hover:dark:text-white blend">
				<div className="flex flex-wrap items-center gap-2 ">
					{pill && (
						<div className="text-sm capitalize mb-4 px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
							{entry.collection === "blog" ? "post" : "project"}
						</div>
					)}
				</div>

				{entry.collection === "projects" && (
					<img
						src={entry.data.coverImage?.src ?? ""}
						alt={entry.data.coverAlt}
						loading="lazy"
						className="h-full w-80 rounded-lg shadow-md object-cover object-center"
					/>
				)}

				<div className="tracking-[-.05em] text-black dark:text-white mt-3">
					<span className="font-semibold">{entry.data.title}</span> |{" "}
					<span className="font-normal">{formatDate(entry.data.date)}</span>
				</div>
				<div className="text-sm line-clamp-2">{entry.data.summary}</div>
				<ul className="flex flex-wrap mt-2 gap-1">
					{entry.data.tags.map((tag: string) => (
						<li key={tag} className="text-xs uppercase py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
							{tag}
						</li>
					))}
				</ul>
			</div>
			<div className="flex items-center gap-1">
				<div className="relative w-6 h-6 flex items-center justify-center">
					{/* background 'button' that appears behind and slightly under the arrow on hover (no fill) */}
					<span className="absolute w-6 h-6 rounded-full bg-transparent opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:-translate-x-1" />

					{/* Chevron visible by default, fades/translates out on hover */}
					<ChevronRight
						size={20}
						strokeWidth={2.5}
						className="absolute z-20 stroke-current opacity-100 transform transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:-translate-x-1"
					/>

					{/* Arrow visible on hover, hidden by default */}
					<ArrowRight
						size={20}
						strokeWidth={2.5}
						className="absolute z-30 stroke-current opacity-0 transform transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-1"
					/>
				</div>
			</div>
		</a>
	);
}
