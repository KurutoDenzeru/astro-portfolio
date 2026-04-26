import { useEffect, useRef, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { formatDate } from "@lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectEntryWithPreview } from "@lib/projectPreviews";
import type { TagOption } from "@lib/simpleIconTags";
import TagBadge from "@components/TagBadge";

type Props = {
	entry: ProjectEntryWithPreview | CollectionEntry<"projects">;
	pill?: boolean;
	tagOptions?: TagOption[];
};

export default function ArrowCard({
	entry,
	pill,
	tagOptions,
}: Props) {
	const [loaded, setLoaded] = useState(false);
	const previewImage = "previewImage" in entry.data
		? entry.data.previewImage
		: entry.data.coverImage?.src;
	const hasImage = Boolean(previewImage);
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		const img = imgRef.current;
		if (!img) return;
		// If the image already finished loading before React hydrated, mark it loaded
		if (img.complete) {
			setLoaded(true);
			return;
		}

		const handleLoad = () => setLoaded(true);
		const handleError = () => setLoaded(true);

		img.addEventListener("load", handleLoad);
		img.addEventListener("error", handleError);

		return () => {
			img.removeEventListener("load", handleLoad);
			img.removeEventListener("error", handleError);
		};
	}, []);

	return (
		<a
			href={`/projects/${entry.id}`}
			className="group p-4 gap-3 flex items-center border rounded-lg hover:bg-muted border-border transition-colors duration-300 ease-in-out"
		>
			<div className="w-full group-hover:text-foreground group-hover:dark:text-foreground blend">
				<div className="flex flex-wrap items-center gap-2 ">
					{pill && (
						<div className="text-sm capitalize mb-4 px-2 py-0.5 rounded-full border border-border">
							projects
						</div>
					)}
				</div>

				{hasImage && (
					<div className="relative w-80 h-48 rounded-lg overflow-hidden">
						{/* Skeleton stays visible until the image has fully loaded */}
						{!loaded && (
							<Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
						)}

						<img
							ref={imgRef}
							src={previewImage}
							alt={entry.data.coverAlt}
							loading="lazy"
							className={`h-full w-full rounded-lg shadow-md object-cover object-center transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
							onLoad={() => setLoaded(true)}
							onError={() => setLoaded(true)}
						/>
					</div>
				)}

				<div className="tracking-[-.05em] text-foreground mt-3">
					<span className="font-semibold">{entry.data.title}</span> |{" "}
					<span className="font-normal">{formatDate(entry.data.date)}</span>
				</div>
				<div className="text-sm line-clamp-2">{entry.data.summary}</div>
				<ul className="mt-3 flex flex-wrap gap-1.5">
					{entry.data.tags.map((tag: string) => (
						<li
							key={tag}
							className="inline-flex min-w-max px-3 py-2 rounded-lg border flex gap-2 items-center border-muted/70 dark:border-muted bg-muted/40 dark:bg-muted/40 hover:bg-muted/60 hover:dark:bg-muted/60 blend"
						>
							<TagBadge
								className="text-xs whitespace-nowrap normal-case text-foreground/80 dark:text-muted-foreground group-hover:text-foreground group-hover:dark:text-foreground blend"
								iconClassName="size-4"
								labelClassName="text-xs"
								tag={tagOptions?.find((option) => option.label === tag) ?? { label: tag }}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className="flex items-center gap-1">
				{/* the icon subtree sometimes gets mutated by browser extensions like DarkReader
				    which inject attributes during hydration; suppress warnings for this section */}
				<div
					className="relative w-6 h-6 flex items-center justify-center"
					suppressHydrationWarning
				>
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
