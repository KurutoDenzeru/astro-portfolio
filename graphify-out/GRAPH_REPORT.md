# Graph Report - .  (2026-08-11)

## Corpus Check
- Large corpus: 256 files · ~590,957 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 779 nodes · 1471 edges · 72 communities (42 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Card & Search Components
- Biome Linting Config
- Agent Discovery & URLs
- Avatar UI Component
- Input & Sidebar UI
- Astro Configuration
- Search & Button UI
- React UI Libraries
- Dropdown Menu UI
- Content & Layouts
- Button Group UI
- Global Search Dialog
- Component Aliases
- Share Actions
- Book a Call Dialog
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64

## God Nodes (most connected - your core abstractions)
1. `cn()` - 286 edges
2. `jsonResponse()` - 27 edges
3. `toAbsoluteUrl()` - 25 edges
4. `!!**/.astro` - 18 edges
5. `react` - 15 edges
6. `Button()` - 15 edges
7. `style` - 11 edges
8. `DialogContent()` - 8 edges
9. `DialogTitle()` - 8 edges
10. `DialogDescription()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `useComboboxAnchor()` --references--> `react`  [EXTRACTED]
  src/components/ui/combobox.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `SidebarProvider()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `ToggleGroupItem()` --references--> `react`  [EXTRACTED]
  src/components/ui/toggle-group.tsx → package.json

## Import Cycles
- None detected.

## Communities (72 total, 30 thin omitted)

### Community 0 - "Card & Search Components"
Cohesion: 0.05
Nodes (47): ArrowCard(), Props, getProjectEntryKey(), parsePageFromURL(), parseTagsFromURL(), Props, SearchCollection(), Props (+39 more)

### Community 1 - "Biome Linting Config"
Cohesion: 0.04
Nodes (48): source, assist, actions, noUnusedVariables, css, parser, files, ignoreUnknown (+40 more)

### Community 2 - "Agent Discovery & URLs"
Cohesion: 0.10
Nodes (28): !!**/.astro, getSiteBaseUrl(), jsonResponse(), toAbsoluteUrl(), AgentSkillArtifact, getAgentSkillArtifact(), getAgentSkillsIndex(), SKILL_ARTIFACTS (+20 more)

### Community 3 - "Avatar UI Component"
Cohesion: 0.09
Nodes (36): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+28 more)

### Community 4 - "Input & Sidebar UI"
Cohesion: 0.07
Nodes (33): Input(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+25 more)

### Community 5 - "Astro Configuration"
Cohesion: 0.06
Nodes (34): astro/tsconfigs/strict, .astro/types.d.ts, node_modules, ./src/assets/*, src/**/*.astro, ./src/components/*, ./src/consts/*, ./src/consts.ts (+26 more)

### Community 6 - "Search & Button UI"
Cohesion: 0.09
Nodes (27): Props, SearchBar(), Button(), buttonVariants, Calendar(), ComboboxChip(), ComboboxChips(), ComboboxChipsInput() (+19 more)

### Community 7 - "React UI Libraries"
Cohesion: 0.08
Nodes (29): react, react, CalendarDayButton(), Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps (+21 more)

### Community 8 - "Dropdown Menu UI"
Cohesion: 0.09
Nodes (26): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+18 more)

### Community 9 - "Content & Layouts"
Cohesion: 0.18
Nodes (16): decodeHtmlAttribute(), extractMetaImage(), fetchPreviewImage(), isGitHubUrl(), normalizeImageUrl(), previewCache, ProjectEntry, ProjectEntryWithPreview (+8 more)

### Community 10 - "Button Group UI"
Cohesion: 0.13
Nodes (17): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Item(), ItemActions(), ItemContent(), ItemDescription() (+9 more)

### Community 11 - "Global Search Dialog"
Cohesion: 0.17
Nodes (14): OPEN_GLOBAL_SEARCH_EVENT, Props, SearchProject, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput() (+6 more)

### Community 12 - "Component Aliases"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 13 - "Share Actions"
Cohesion: 0.14
Nodes (16): ArticleShareActions(), copyText(), Props, ShareLink(), facebookIcon, getEnabledSharePlatforms(), getShareIcon(), iconLookup (+8 more)

### Community 14 - "Book a Call Dialog"
Cohesion: 0.18
Nodes (13): BookACallDialogProps, MEETING_OPTIONS, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.18
Nodes (10): customSpriteIcons, Props, StackIcon(), buildTagOptions(), iconLookup, normalizeKey(), resolveTagIcon(), resolveTagOption() (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (15): @biomejs/biome, devDependencies, @biomejs/biome, @types/bun, engines, node, name, scripts (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubTrigger() (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (12): ALLOWED_ANALYTICS_ORIGINS, CategoryCardProps, ConsentValue, CookieConsent(), getDismissedState(), getStoredConsent(), loadAnalytics(), logConsent() (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (9): LINKS, NOT_FOUND_PAGE, SITE, SOCIALS, Context, Links, Page, Site (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (12): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (9): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+1 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (5): alignmentClasses, arrowClasses, positionClasses, subpath, Toaster()

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (8): navigationItems, navigationLd, pageURL, personId, personLd, structuredDataLd, websiteId, websiteLd

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (9): @astrojs/mdx, fuse.js, dependencies, @astrojs/mdx, fuse.js, lucide-react, tailwind-merge, lucide-react (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.44
Nodes (8): acceptsMarkdown(), AGENT_DISCOVERY_LINKS, appendVaryHeader(), decodeHtmlEntities(), estimateMarkdownTokens(), htmlToMarkdown(), onRequest(), stripHtmlTags()

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 30 - "Community 30"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (4): CopyCodeButton(), CopyCodeButtonProps, copyText(), MountedControl

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (4): PROJECTS, breadcrumbLd, tagOptions, tags

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): collections, legal, projects, work

## Knowledge Gaps
- **187 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Avatar UI Component` to `Card & Search Components`, `Input & Sidebar UI`, `Search & Button UI`, `React UI Libraries`, `Dropdown Menu UI`, `Button Group UI`, `Global Search Dialog`, `Share Actions`, `Book a Call Dialog`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 22`, `Community 24`, `Community 25`, `Community 29`, `Community 30`, `Community 31`, `Community 32`?**
  _High betweenness centrality (0.431) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 27` to `React UI Libraries`, `Community 16`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `react` connect `React UI Libraries` to `Community 27`, `Input & Sidebar UI`, `Community 30`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Card & Search Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05109126984126984 - nodes in this community are weakly interconnected._
- **Should `Biome Linting Config` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `Agent Discovery & URLs` be split into smaller, more focused modules?**
  _Cohesion score 0.10034013605442177 - nodes in this community are weakly interconnected._