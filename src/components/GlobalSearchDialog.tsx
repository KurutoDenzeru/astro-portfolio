import TagBadge from "@components/TagBadge";
import type { TagOption } from "@lib/simpleIconTags";
import Fuse from "fuse.js";
import { Briefcase, FolderOpen, Home, Moon, Rss, Search, SearchX, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

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
      className="mb-1.5 flex-col items-start gap-1 rounded-lg border-2 border-transparent px-3 py-2.5 transition-all duration-150
        data-[selected=true]:border-foreground/15 data-[selected=true]:bg-muted/80 data-[selected=true]:text-foreground
        hover:bg-muted/50 hover:dark:bg-white/[0.04]
        last:mb-0"
    >
      <div className="flex w-full items-center gap-2.5">
        <div className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border-2 border-border/60 bg-background/80 transition-colors group-data-[selected]/command-item:border-foreground/15 group-data-[selected]/command-item:bg-muted/60 dark:border-white/10 dark:bg-white/5">
          <FolderOpen className="size-3.5 text-muted-foreground transition-colors group-data-[selected]/command-item:text-foreground" />
        </div>
        <span className="truncate text-sm font-medium">{project.title}</span>
        <span className="ml-auto shrink-0 text-[10px] text-muted-foreground opacity-0 transition-opacity group-data-[selected]/command-item:opacity-100">
          Enter
        </span>
      </div>
      <p className="ml-9.5 line-clamp-1 text-xs leading-relaxed text-muted-foreground">
        {project.summary}
      </p>
      {project.tagOptions.length > 0 && (
        <div className="ml-9.5 mt-1.5 flex flex-wrap gap-1">
          {project.tagOptions.map((tag) => (
            <span
              key={`${project.id}-${tag.label}`}
              className="inline-flex items-center gap-1 rounded-md border border-border/40 bg-muted/30 px-1.5 py-0.5 dark:border-white/8 dark:bg-white/[0.03]"
            >
              <TagBadge
                tag={tag}
                className="text-[10px] whitespace-nowrap normal-case text-muted-foreground"
                iconClassName="size-3"
                labelClassName="text-[10px]"
              />
            </span>
          ))}
        </div>
      )}
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
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
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

  const shortcutPrefix = isMac ? "\u2318" : "Ctrl";
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
      className="top-[20%] max-w-2xl! -translate-y-0"
    >
      <Command className="border border-border bg-background dark:border-white/10">
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search projects by title, summary, or tag..."
          aria-label="Search projects"
        />
        <CommandList className="max-h-[28rem] px-2 pb-2" aria-label="Search results">
          <CommandEmpty>
            <Empty className="py-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchX className="size-6" />
                </EmptyMedia>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search to find what you're looking for.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CommandEmpty>

          <CommandGroup heading="Actions" className="p-2" aria-label="Quick actions">
            {commandActions.map((action) => {
              const Icon = action.icon;
              return (
                <CommandItem
                  key={action.value}
                  value={action.value}
                  onSelect={action.action}
                  className="mb-1 rounded-lg border-2 border-transparent px-3 py-2 transition-all duration-150
                    data-[selected=true]:border-foreground/15 data-[selected=true]:bg-muted/80 data-[selected=true]:text-foreground
                    hover:bg-muted/50 hover:dark:bg-white/[0.04]
                    last:mb-0"
                >
                  <Icon className="size-4 text-muted-foreground group-data-[selected]/command-item:text-foreground" />
                  <span>{action.label}</span>
                  <CommandShortcut className="hidden sm:inline-flex">
                    {action.shortcut}
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects" className="p-2" aria-label="Project results">
            {results.map((project) => (
              <ProjectResultItem key={project.id} project={project} onSelect={openProject} />
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between border-t border-border/60 px-3 py-2 text-xs text-muted-foreground dark:border-white/5">
          <div className="flex items-center gap-2">
            <Search className="size-3.5" />
            <span>Search from anywhere</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>{"\u2191"}</Kbd>
                <Kbd>{"\u2193"}</Kbd>
              </KbdGroup>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>{"\u21B5"}</Kbd>
              </KbdGroup>
              <span>select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>Esc</Kbd>
              </KbdGroup>
              <span>close</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <KbdGroup>
                <Kbd>{isMac ? "\u2318" : "Ctrl"}</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </div>
        </div>
      </Command>
    </CommandDialog>
  );
}
