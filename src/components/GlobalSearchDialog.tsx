import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Briefcase, FolderOpen, Home, Moon, Rss, Search, Sun } from "lucide-react";
import TagBadge from "@components/TagBadge";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	CommandSeparator,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import type { TagOption } from "@lib/simpleIconTags";

type SearchProject = {
	href: string;
	id: string;
	summary: string;
	tags: string[];
	tagOptions: TagOption[];
	title: string;
};

type Props = {
	projects: SearchProject[];
};

export const OPEN_GLOBAL_SEARCH_EVENT = "open-global-search";
const MAX_PROJECT_RESULTS = 6;

function isMacLikePlatform() {
	return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

function ProjectResultItem({
	project,
	onSelect,
}: {
	project: SearchProject;
	onSelect: (href: string) => void;
}) {
	return (
		<CommandItem
			value={`${project.title} ${project.summary} ${project.tags.join(" ")}`}
			onSelect={() => onSelect(project.href)}
			className="mb-3 items-start gap-3 rounded-xl border border-border/70 bg-muted/35 px-3 py-3 hover:cursor-pointer data-selected:border-foreground/15 data-selected:bg-muted/70 dark:border-white/8 dark:bg-white/[0.035] dark:data-selected:border-white/12 dark:data-selected:bg-white/8 last:mb-0"
		>
			<div className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/80 dark:border-white/10 dark:bg-white/5">
				<FolderOpen className="size-4" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="truncate text-sm font-medium text-foreground">
					{project.title}
				</div>
				<div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
					{project.summary}
				</div>
				{project.tagOptions.length > 0 ? (
					<div className="mt-2 flex flex-wrap gap-1.5">
						{project.tagOptions.map((tag) => (
							<span
								key={`${project.id}-${tag.label}`}
								className="rounded-lg border border-border/70 bg-muted/70 px-2 py-1 text-xs text-foreground/80 dark:border-white/10 dark:bg-white/5 dark:text-muted-foreground"
							>
								<TagBadge
									tag={tag}
									className="text-xs"
									iconClassName="size-3.5"
									labelClassName="text-xs"
								/>
							</span>
						))}
					</div>
				) : null}
			</div>
		</CommandItem>
	);
}

export default function GlobalSearchDialog({ projects }: Props) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [isMac, setIsMac] = useState(false);
	const [isDark, setIsDark] = useState(false);

	const fuse = useMemo(
		() =>
			new Fuse(projects, {
				keys: ["title", "summary", "tags", "id"],
				threshold: 0.35,
				minMatchCharLength: 2,
			}),
		[projects],
	);

	const results = useMemo(() => {
		if (query.trim().length < 2) {
			return projects.slice(0, MAX_PROJECT_RESULTS);
		}

		return fuse
			.search(query.trim())
			.slice(0, MAX_PROJECT_RESULTS)
			.map((result) => result.item);
	}, [fuse, projects, query]);

	useEffect(() => {
		setIsMac(isMacLikePlatform());
		setIsDark(document.documentElement.classList.contains("dark"));

		const onKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen((current) => !current);
			}
		};

		const onOpen = () => setOpen(true);
		const onNavigate = (event: Event) => {
			const customEvent = event as CustomEvent<{ href: string }>;
			const href = customEvent.detail?.href;
			if (!href) return;
			window.location.href = href;
		};
		const onToggleTheme = () => {
			const button = document.getElementById("header-theme-button");
			if (button instanceof HTMLButtonElement) {
				button.click();
				window.setTimeout(() => {
					setIsDark(document.documentElement.classList.contains("dark"));
				}, 0);
			}
		};
		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		window.addEventListener("keydown", onKeyDown);
		window.addEventListener(OPEN_GLOBAL_SEARCH_EVENT, onOpen);
		window.addEventListener("global-shortcut:navigate", onNavigate as EventListener);
		window.addEventListener("global-shortcut:toggle-theme", onToggleTheme);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener(OPEN_GLOBAL_SEARCH_EVENT, onOpen);
			window.removeEventListener("global-shortcut:navigate", onNavigate as EventListener);
			window.removeEventListener("global-shortcut:toggle-theme", onToggleTheme);
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!open) {
			setQuery("");
		}
	}, [open]);

	const openProject = (href: string) => {
		setOpen(false);
		window.location.href = href;
	};

	const shortcutPrefix = isMac ? "⌘" : "Alt";
	const commandActions = [
		{
			action: () => {
				setOpen(false);
				window.location.href = "/";
			},
			icon: Home,
			label: "Go to Home",
			shortcut: `${shortcutPrefix} 1`,
			value: "navigate home",
		},
		{
			action: () => {
				setOpen(false);
				window.location.href = "/work";
			},
			icon: Briefcase,
			label: "Go to Work",
			shortcut: `${shortcutPrefix} 2`,
			value: "navigate work",
		},
		{
			action: () => {
				setOpen(false);
				window.location.href = "/projects";
			},
			icon: FolderOpen,
			label: "Go to Projects",
			shortcut: `${shortcutPrefix} 3`,
			value: "navigate projects",
		},
		{
			action: () => {
				setOpen(false);
				window.open("/rss.xml", "_blank", "noopener,noreferrer");
			},
			icon: Rss,
			label: "Subscribe to RSS",
			shortcut: `${shortcutPrefix} 4`,
			value: "subscribe rss",
		},
			{
				action: () => {
					setOpen(false);
					window.dispatchEvent(new Event("global-shortcut:toggle-theme"));
				},
				icon: isDark ? Sun : Moon,
				label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
				shortcut: `${shortcutPrefix} D`,
				value: "toggle theme",
			},
	];

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			title="Search Projects"
			description="Search all projects from anywhere on the site."
			className="top-1/2 max-w-2xl! -translate-y-1/2"
		>
			<Command className="border border-border bg-background dark:border-white/10">
				<CommandInput
					value={query}
					onValueChange={setQuery}
					placeholder="Search projects by title, summary, or tag..."
				/>
				<CommandList className="max-h-[26rem] px-2 pb-2">
					<CommandEmpty>No matching projects found.</CommandEmpty>
					<CommandGroup heading="Actions" className="p-2">
						{commandActions.map((action) => {
							const Icon = action.icon;
							return (
								<CommandItem
									key={action.value}
									value={action.value}
									onSelect={action.action}
									className="mb-2 rounded-xl border border-border/70 bg-muted/35 px-3 py-2.5 hover:cursor-pointer data-selected:border-foreground/15 data-selected:bg-muted/70 dark:border-white/8 dark:bg-white/[0.03] dark:data-selected:border-white/12 dark:data-selected:bg-white/8 last:mb-0"
								>
									<Icon className="size-4" />
									<span>{action.label}</span>
									<CommandShortcut className="hidden sm:inline-flex">
										{action.shortcut}
									</CommandShortcut>
								</CommandItem>
							);
						})}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Projects" className="p-2">
						{results.map((project) => (
							<ProjectResultItem
								key={project.id}
								project={project}
								onSelect={openProject}
							/>
						))}
					</CommandGroup>
				</CommandList>
				<CommandSeparator />
				<div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
					<div className="flex items-center gap-2">
						<Search className="size-3.5" />
						<span>Search from anywhere</span>
					</div>
					<div className="hidden items-center gap-3 sm:flex">
						<div className="flex items-center gap-1.5">
							<KbdGroup>
								<Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
								<Kbd>K</Kbd>
							</KbdGroup>
						</div>
						<div className="flex items-center gap-1.5">
							<Kbd>Enter</Kbd>
							<span>open</span>
						</div>
					</div>
				</div>
			</Command>
		</CommandDialog>
	);
}
