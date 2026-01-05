---
title: "Personal Online Portfolio Website"
summary: "🌐 Dynamic portfolio showcasing projects, skills and expertise, powered by Astro, Tailwind, shadcn/ui, TypeScript, MDX, RSS, and React for seamless content management."
date: "December 31, 2023"
draft: false
tags:
- Astro.js
- Javascript
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://kurtcalacday.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/astro-portfolio
coverImage: '@assets/Projects/2023/portfolio.webp'
coverAlt: 'Personal Online Portfolio Website'
---

![coverImage](@assets/Projects/2023/portfolio.webp)

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/astro-portfolio" target="_blank" rel="noopener">
    <img src="../../../_deploy_vercel.svg" alt="Deploy with Vercel" style="height:30px;">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/astro-portfolio" target="_blank" rel="noopener">
    <img src="../../../_deploy_netlify.svg" alt="Deploy with Netlify" style="height:30px;">
  </a>
</div>

---

## ✨ Features

- **Interactive Portfolio** — Showcase your work, projects, and professional accomplishments in an engaging way.
- **Responsive Design** — Optimized for all devices, from mobile to desktop.
- **Dark/Light Mode** — Seamless theme switching with user preference persistence.
- **Search Functionality** — Quickly find projects and work experiences with a built-in search bar.
- **Content Collections** — Easily manage and update projects and work experiences using Markdown files.
- **Fast Performance** — Built with Astro for lightning-fast static site generation.
- **Accessible UI** — Components from Shadcn UI ensure a11y compliance and great UX.
- **Open Source** — MIT licensed; customize and deploy your own version freely.

---

## 🧱 Tech Stack

- [Astro](https://astro.build/): Modern static site generator for building fast, content-focused websites.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Shadcn UI](https://ui.shadcn.com/): Re-usable components built using Radix UI and Tailwind CSS.
- [TypeScript](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript.
- [Biome](https://biomejs.dev/): Fast linter, formatter, and more for JavaScript, TypeScript, and JSON.
- [Content Collections](https://docs.astro.build/en/guides/content-collections/): Astro's built-in content management system for type-safe Markdown and MDX.

---

## ⚡ Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/astro-portfolio.git
cd astro-portfolio
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the app.

---

## 📦 Build for Production

```bash
bun run build
bun start
```

---

## 🗺️ Roadmap

A few features I plan to implement

- 🏆 Honors and Awards page
- 🔍 Command component feature
- ⬜ Article Pages - Share on social media

---

## 🗂️ Configuration

The editor is componentized under `src/components`. Key areas to customize are:

```text
src/                        # Source directory for the Astro project
  layouts/                  # Astro layout components for structuring pages
  pages/                    # Page routes and endpoints
    index.astro             # Homepage
    projects/               # Projects listing and individual project pages
    work/                   # Work experiences listing
  content/                  # Content collections for dynamic content
    config.ts               # Content collection configuration
    projects/               # Markdown files for projects
    work/                   # Markdown files for work experiences
public/                     # Static assets served directly
  icons/                    # Favicon and app icons
  js/                       # Client-side JavaScript files
    theme.js                # Theme switching logic
    drawer.js               # Mobile drawer functionality
    animate.js              # Animation scripts
```

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the MIT License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the `MIT` file.

