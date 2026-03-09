import { cn } from "@lib/utils";
import type { TagOption } from "@lib/simpleIconTags";

type Props = {
	className?: string;
	iconClassName?: string;
	labelClassName?: string;
	tag: TagOption;
};

export function TagIcon({
	tag,
	className,
}: {
	className?: string;
	tag: TagOption;
}) {
	if (!tag.iconPath) return null;

	const isInvertedBrand = tag.iconSlug === "nextdotjs" || tag.iconSlug === "shadcnui";

	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={cn(
				"size-3 shrink-0 align-middle",
				isInvertedBrand ? "text-black dark:text-white" : undefined,
				className,
			)}
			style={!isInvertedBrand && tag.iconHex ? { color: `#${tag.iconHex}` } : undefined}
		>
			<path fill="currentColor" d={tag.iconPath} />
		</svg>
	);
}

export default function TagBadge({
	tag,
	className,
	iconClassName,
	labelClassName,
}: Props) {
	return (
		<span
			className={cn(
				"inline-flex min-w-0 items-center justify-center gap-1.5 align-middle text-sm leading-none",
				className,
			)}
		>
			<TagIcon tag={tag} className={iconClassName} />
			<span className={cn("truncate leading-none", labelClassName)}>{tag.label}</span>
		</span>
	);
}
