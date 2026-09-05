---
title: "Fontora - Curated Catalog of Open-Source Typefaces"
summary: "✒️ Curated catalog of 1,900+ open-source fonts — live specimens, variable playgrounds, pairings, and embed snippets. Built with Astro, React, TypeScript, Tailwind, & shadcn/ui, served by the Fontsource CDN."
date: "Aug 20, 2026"
draft: false
tags:
- Astro
- React
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://fontora.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/fontora
coverAlt: 'Fontora - Curated Catalog of Open-Source Typefaces'
---

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/fontora">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/fontora">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</div>

---

## ✨ Features

- **Live Specimen Previews:** Adjustable specimen sizing with instant "Aa" glyph samples across 1,976 font families.
- **Variable Font Support:** Dedicated playgrounds, badges, and axis controls for 565 variable families.
- **Shareable Filters:** Writing system, category, style, and style-count filters encoded in the URL for easy sharing.
- **Font Detail Pages:** Per-family routes with specimen tabs, glyph grids, style lists, and language coverage.
- **Pairings & Embed Snippets:** Suggested font pairings plus ready-to-paste embed code for every family.
- **Curated Collections:** Six themed groups — Grotesque Essentials, Editorial Serifs, Display & Impact, Terminal & Code, Friendly Geometrics, and Classic Revivals.
- **Selection Bag:** Collect and compare favorite families while browsing.

---

## 🧱 Tech Stack

- [Astro](https://astro.build/): Static site generation and content-driven routing.
- [React](https://reactjs.org/): Component-driven interactive UI.
- [TypeScript](https://www.typescriptlang.org/): Static typing and developer tooling.
- [Tailwind](https://tailwindcss.com/): Utility-first styling system.
- [shadcn/ui](https://ui.shadcn.com/): UI primitives, composition patterns, and design tokens.

---

## 🔌 Font Resources

- [Fontsource CDN](https://fontsource.org/): Self-hosted font delivery for every cataloged family.
- [Google Fonts](https://fonts.google.com/): Catalog reference and upstream metadata.
- [Open Font License](https://openfontlicense.org/): Licensing covering the open-source typefaces.

---

## 🚀 Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/fontora.git
cd fontora
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## 📦 Build for Production

```bash
bun run build
bun run preview
```

---

## 🗂️ Configuration

The site is implemented under `src/`. Key areas to customize and extend are:

```text
src/
  components/
    catalog/                      # Browse grid, filter sidebar, hero, and specimen cards
    font-detail/                  # Family detail tabs: specimen, glyphs, pairings, embed
    selection/                    # Selection bag for collecting and comparing families
    dock-nav.tsx                  # Dock navigation shell
    site-footer.tsx               # Global footer
    theme-selector.tsx            # Theme switching controls
  data/
    fonts.json                    # Synced catalog of 1,900+ families
    variable-axis-map.json        # Variable font axis metadata
    curation.ts                   # Curated collection definitions
  lib/
    font-loader.ts                # Fontsource CDN loading
    fonts.ts                      # Catalog access, filtering, and sorting helpers
  layouts/
    main.astro                    # Base layout shell
  pages/
    index.astro                   # Catalog home
    fonts/[id].astro              # Family detail route
  styles/
    global.css                    # Global styles and theme tokens
scripts/
  sync-fonts.ts                   # Refreshes fonts.json from upstream sources (`bun run sync:fonts`)
```

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

Licensing details are available in the [repository](https://github.com/KurutoDenzeru/fontora).
