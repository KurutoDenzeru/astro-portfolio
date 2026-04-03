---
title: "Ketch - AI Startup Idea Lab"
summary: "✨ Idea workshop for instant brainstorming, local save/slug sharing, powered by React, TypeScript, Tailwind, TanStack Router, and shadcn/ui."
date: "Feb 28, 2026"
draft: false
tags:
- Tanstack
- Typescript
- React
- Tailwind
- Shadcn/ui
- AI
demoUrl: https://ketch.krtclcdy.workers.dev/
repoUrl: https://github.com/KurutoDenzeru/Ketch
coverAlt: 'Ketch - AI Startup Idea Lab'
---

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/Ketch">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/Ketch">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</div>

---

## ✨ Features

- **Idea Generator** — Generate creative brand ideas in real time from a seed prompt.
- **Idea Lab** — Create, evaluate, and refine idea briefs using AI-powered workflow components.
- **Saved Ideas** — Save and revisit high-potential ideas in a persistent local store.
- **Shared Ideas** — Share idea pages publicly with unique slugs and social links.
- **Mobile + Desktop Nav** — Responsive tabbed navigation and top navbar with active-state routes.
- **Theme Switching** — Supports light/dark theme preference across devices.
- **Rate Limiting** — Built-in generation rate control to prevent misuse and keep request flow safe.
- **Accessible UI** — Uses shadcn-inspired components with keyboard-friendly controls.
- **Open Source** — MIT licensed; fully customizable and easy to fork.

---

## 🧱 Tech Stack

- [React](https://react.dev/): UI framework for declarative component rendering.
- [TanStack Router](https://tanstack.com/router): Declarative client-side routing with nested layouts.
- [TypeScript](https://www.typescriptlang.org/): Strong typing for safer maintenance and refactoring.
- [Tailwind](https://tailwindcss.com/): Utility-first styling used across components.
- [Shadcn UI](https://ui.shadcn.com/): Base design primitives for consistent interface components.

---

## 🚀 Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/Ketch.git
cd Ketch
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Build for Production

```bash
bun run build
bun start
```

---

## 🗂️ Configuration

The app is implemented under `src/`. Key areas to customize and extend are:

```text
src/
  components/
    analysis-dashboard.tsx  # Dashboard UI for performance analysis and data summary
    app-footer.tsx          # App footer for site-wide leveling and links
    app-navbar.tsx          # Top/Bottom navigation menu components
    idea-brief-form.tsx     # Form for drafting and scanning idea briefs
    idea-card.tsx           # UI card for idea previews and status controls
    name-suggestions.tsx    # Name suggestion generator interface
    pitch-section.tsx       # Pitch text generation and edit component
    shared-idea-page.tsx    # Shared idea page renderer for public slugs
    theme-provider.tsx      # Theme switcher context/provider logic
    theme-toggle-tabs.tsx   # UI toggles for theme select tabs
  hooks/
    use-mobile.ts           # Mobile viewport detection hook
  lib/
    gemini.ts               # AI generation + API integration functions
    generation-rate-limit.ts # Generation request throttling helper
    idea-storage.ts         # Local storage helper for saved ideas
    query-client.ts         # React Query client setup
    shared-idea-store.ts    # Shared idea persistence store helper
    utils.ts                # Shared utility functions
    server/                # API helpers / backend service helpers
  routes/
    __root.tsx              # Root layout & global state wrapper
    index.tsx               # Idea Lab home route
    idea.tsx                # Idea generation route
    saved.tsx               # Saved ideas route
    shared.tsx              # Shared ideas listing route
    idea.$slug.tsx          # Dynamic shared idea route by slug
    api/                   # API utilities and helpers
  types/
    idea.ts                 # Idea domain model typings
    rate-limit.ts           # Rate limiting typings
```

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the UUnlicensed, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the `Unlicensed` file.
