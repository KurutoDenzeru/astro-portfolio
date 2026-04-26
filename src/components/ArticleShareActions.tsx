import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Linkedin, Share2 } from "lucide-react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SHARE_DIALOG_CONFIG, getEnabledSharePlatforms } from "@/lib/sharePlatforms";
import { cn } from "@/lib/utils";

type Props = {
	title: string;
	summary: string;
	url: string;
	className?: string;
};

async function copyText(text: string) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute("readonly", "true");
	textArea.style.position = "absolute";
	textArea.style.opacity = "0";
	textArea.style.pointerEvents = "none";
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}

function ShareLink({
	href,
	iconHex,
	iconPath,
	label,
	lucideIconName,
	themeAwareIcon,
}: {
	href: string;
	iconHex?: string;
	iconPath?: string;
	label: string;
	lucideIconName?: "linkedin";
	themeAwareIcon?: boolean;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			aria-label={label}
			className="group flex h-10 items-center gap-2 rounded-xl border border-black/15 px-3 py-1.5 text-sm text-black transition-colors duration-300 hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
		>
			{lucideIconName === "linkedin" ? (
				<span
					className="inline-flex size-4 shrink-0 items-center justify-center text-[#0A66C2]"
					aria-hidden="true"
				>
					<Linkedin className="size-4" strokeWidth={2.1} />
				</span>
			) : iconHex && iconPath ? (
				<span
					className={cn(
						"inline-flex size-4 shrink-0 items-center justify-center",
						themeAwareIcon ? "text-foreground" : "",
					)}
					style={themeAwareIcon ? undefined : { color: `#${iconHex}` }}
					aria-hidden="true"
				>
					<svg
						viewBox="0 0 24 24"
						className="size-4 fill-current"
						focusable="false"
						aria-hidden="true"
					>
						<path d={iconPath} />
					</svg>
				</span>
			) : null}
			<span>{label}</span>
		</a>
	);
}

export default function ArticleShareActions({
	title,
	summary,
	url,
	className,
}: Props) {
	const [copied, setCopied] = useState(false);
	const [activeUrl, setActiveUrl] = useState(url);
	const resetTimerRef = useRef<number | null>(null);
	const shareLinks = useMemo(() => {
		return {
			native: { title, text: `${title}\n\n${summary}`, url: activeUrl },
			copy: activeUrl,
		};
	}, [activeUrl, summary, title]);
	const enabledPlatforms = useMemo(
		() =>
			getEnabledSharePlatforms().map((platform) => ({
				...platform,
				href: platform.getHref({ title, summary, url: activeUrl }),
			})),
		[activeUrl, summary, title],
	);

	const canUseNativeShare =
		typeof navigator !== "undefined" &&
		"share" in navigator &&
		SHARE_DIALOG_CONFIG.enableNativeShare;

	useEffect(() => {
		if (typeof window !== "undefined") {
			setActiveUrl(window.location.href);
		}

		return () => {
			if (resetTimerRef.current !== null) {
				window.clearTimeout(resetTimerRef.current);
			}
		};
	}, []);

	const handleNativeShare = async () => {
		if (!("share" in navigator)) {
			return;
		}

		try {
			await navigator.share(shareLinks.native);
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				return;
			}

			toast.error("Share failed. Please try again.");
		}
	};

	const handleCopyLink = async () => {
		try {
			await copyText(shareLinks.copy);
			setCopied(true);
			toast.success("Article link copied");
			if (resetTimerRef.current !== null) {
				window.clearTimeout(resetTimerRef.current);
			}
			resetTimerRef.current = window.setTimeout(() => {
				setCopied(false);
				resetTimerRef.current = null;
			}, 1800);
		} catch {
			toast.error("Copy failed. Please try again.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger
				render={
					<button
						type="button"
						className={cn(
							"group flex cursor-pointer gap-2 items-center px-3 py-1.5 truncate rounded-lg text-sm md:text-sm lg:text-base border border-foreground/25 dark:border-foreground/25 hover:bg-foreground/5 hover:dark:bg-foreground/15 blend",
							className,
						)}
					>
						<Share2
							size={16}
							strokeWidth={2}
							className="size-4 shrink-0 stroke-current group-hover:stroke-black group-hover:dark:stroke-white"
							aria-hidden="true"
						/>
						<span className="text-current group-hover:text-foreground group-hover:dark:text-foreground blend">
							Share
						</span>
					</button>
				}
			/>
			<DialogContent className="max-w-md! border border-border bg-background p-5 dark:border-white/10">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-base text-foreground">
						<Share2 className="size-4" />
						Share this article
					</DialogTitle>
					<DialogDescription>
						Share <span className="font-medium text-foreground">{title}</span> on
						your preferred platform.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-2">
					{canUseNativeShare ? (
						<button
							type="button"
							onClick={handleNativeShare}
							className="group flex h-10 items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-sm text-foreground transition-colors duration-300 hover:bg-muted"
						>
							<Share2 className="size-4 shrink-0" />
							<span>Share using device</span>
						</button>
					) : null}

					{enabledPlatforms.map((platform) => (
						<ShareLink
							key={platform.id}
							href={platform.href}
							iconHex={platform.iconHex}
							iconPath={platform.iconPath}
							label={platform.label}
							lucideIconName={platform.lucideIconName}
							themeAwareIcon={platform.themeAwareIcon}
						/>
					))}

					<div className="mt-1 flex items-center gap-2 rounded-xl border border-border p-2 dark:border-white/20">
						<Input
							readOnly
							aria-label="Article link"
							value={shareLinks.copy}
							onFocus={(event) => event.currentTarget.select()}
							className="h-10 border-0 bg-muted text-sm text-foreground selection:bg-foreground/15 focus-visible:ring-0"
						/>
						<button
							type="button"
							onClick={handleCopyLink}
							className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
							aria-label="Copy article link"
						>
							<span className="relative size-4">
								<Copy
									className={cn(
										"absolute inset-0 size-4 transition-all duration-300",
										copied ? "scale-75 -rotate-12 opacity-0" : "scale-100 opacity-100",
									)}
								/>
								<Check
									className={cn(
										"absolute inset-0 size-4 transition-all duration-300",
										copied ? "scale-100 opacity-100" : "scale-75 rotate-12 opacity-0",
									)}
								/>
							</span>
							<span>{copied ? "Copied" : "Copy"}</span>
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
