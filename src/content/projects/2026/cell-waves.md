---
title: "Cell Waves - Cell Tower Lease Experts"
summary: "🗼 Landing site helping landlords negotiate cell tower lease renewals and buyouts. Built with Astro, React, Tailwind, and shadcn/ui."
date: "Oct 07, 2026"
draft: false
tags:
- Astro
- React
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://cell-waves.ca
repoUrl: https://github.com/TowerFinder-Kurt-Access/cell-waves
coverImage: '@assets/Projects/2026/cell-waves.webp'
coverAlt: 'Cell Waves - Cell Tower Lease Experts'
---

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/TowerFinder-Kurt-Access/cell-waves">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/TowerFinder-Kurt-Access/cell-waves">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</div>

---

## ✨ Features

- **Landlord-Side Negotiation** — Dedicated expertise for lease renewals, extensions, and buyouts, never new-site brokering.
- **Full Service Catalog** — Seven dedicated service pages covering agreements, renewals, rooftop leases, buyouts, consultant costs, and hiring guidance.
- **Landlord Advice Hub** — Seven advice articles on lease rates, lease valuation, carrier mergers, upgrade requests, and tower attorneys.
- **Contact Form with Resend** — On-demand `/api/contact` endpoint that validates submissions and emails them through the Resend REST API, with loading, error, and success states.
- **Testimonials Carousel** — Verified landlord reports in an Embla-powered carousel with quote-first layout and local imagery.
- **Scroll-Reveal Animations** — Dedicated entrance animations per section with staggered grids and an animated process signal line, honoring `prefers-reduced-motion` and no-JS fallbacks.
- **Responsive by Design** — Fixed dock navigation, mobile drawer, and layouts that collapse cleanly below 768px.
- **Fast & Static First** — Astro static output with prerendered pages; only the contact API runs serverless on Vercel.

---

## 🧱 Tech Stack

- [Astro](https://astro.build/): Static site generator for fast, content-focused pages.
- [React](https://react.dev/): Component library powering interactive islands like the testimonial carousel and contact form.
- [TypeScript](https://www.typescriptlang.org/): Strongly typed programming that builds on JavaScript.
- [Tailwind](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [shadcn/ui](https://ui.shadcn.com/): Re-usable components built on Radix UI and Tailwind CSS.
- [Motion](https://motion.dev/): Animation library for entrance and state transitions in React islands.
- [Resend](https://resend.com/): Transactional email API behind the contact form.

---

## 🚀 Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/TowerFinder-Kurt-Access/cell-waves.git
cd cell-waves
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the app.

## 📦 Build for Production

```bash
bun run build
bun run preview
```

---

## 🔑 Environment

Copy the example file and add your Resend key:

```bash
cp .env.example .env
```

`RESEND_API_KEY` authenticates the contact form's `/api/contact` endpoint with Resend. It is required in the local `.env` and in the Vercel project settings.

---

## 🗂️ Configuration

The site is componentized under `src`. Key areas to customize are:

```text
src/
  components/
    site/              # Header, footer, hero, homepage sections, contact form
    ui/                # shadcn/ui primitives
  layouts/
    base.astro         # Global shell, head tags, scroll-reveal observer
    article.astro      # Shared layout for service and advice pages
  pages/
    index.astro        # Homepage
    about-us.astro     # Team page
    why-select-us.astro
    testimonials.astro # Full landlord testimonials
    blog/              # Blog index and posts
    services/          # Seven service pages
    advice/            # Seven advice pages
    api/
      contact.ts       # POST endpoint wired to Resend
  scripts/
    count-up.ts        # Animated stat badges
  styles/
    global.css         # Theme tokens, reveal animations
  lib/
    content.ts         # Site-wide copy, navigation, testimonials, page data
public/
  images/              # Testimonial and blog imagery
```

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

Copyright © Cell Waves Canada. All rights reserved.