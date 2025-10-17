---
title: "ChainPaper - Trustless Whitepaper"
summary: "✍️ Secure markdown platform for authorship assurance, crafted with Nuxt, Pinia, Tailwind, and Shadcn, featuring cryptographic verification using SHA-256."
date: "May 14, 2025"
draft: false
tags:
- Vue.js
- Nuxt.js
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://chainpaper.nuxt.dev/
repoUrl: https://github.com/KurutoDenzeru/ChainPaper
coverImage: '@assets/Projects/2025/chainpaper.webp'
coverAlt: 'ChainPaper - Trustless Whitepaper'
---

![coverImage](@assets/Projects/2025/chainpaper.webp)

---

## ✨ Features

- **Real-time Markdown Editing:** Live preview of markdown content as you type with instant rendering.
- **Authorship Verification:** Built-in cryptographic proofs to verify document contributors and maintain an immutable history.
- **Advanced Formatting:** Support for superscript, subscript, math expressions (KaTeX), tables, lists, and text alignment.
- **Rich Media Insertion:** Insert emojis, tables, horizontal lines, footnotes, and code blocks with customizable options.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices with adaptive layouts.
- **Export Options:** Generate documents with proper formatting and verification metadata.
- **Open Source:** Free to use and contribute to, built with modern web technologies.

---

## 🛠️ Tech Stack

- [Nuxt.js](https://nuxt.com/): Vue framework for building performant full-stack applications.
- [Vue 3](https://vuejs.org/): Progressive JavaScript framework with Composition API.
- [TypeScript](https://www.typescriptlang.org/): Typed JavaScript for better development experience.
- [Shadcn Vue](https://www.shadcn-vue.com/): Re-usable components built using Radix Vue and Tailwind.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [KaTeX](https://katex.org/): Fast math typesetting for rendering mathematical expressions.
- [Markdown-it](https://github.com/markdown-it/markdown-it): Flexible markdown parser with plugins.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KurutoDenzeru/ChainPaper.git
cd ChainPaper
```

### 2. Install dependencies

```bash
# With npm
yarn install
# or
npm install
# or
bun install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## ⚙️ Configuration

The main editor configuration lives in the /layouts folder under app/components. Key layout files:

- `/layouts/EditorToolbar.vue` — Main editing toolbar with formatting options. ([app/components/layout/EditorToolbar.vue](app/components/layout/EditorToolbar.vue))
- `/layouts/MenuBar.vue` — Menu bar with advanced formatting and insert options. ([app/components/layout/MenuBar.vue](app/components/layout/MenuBar.vue))
- `/layouts/StickyFooter.vue` — Sticky footer / status bar and related controls. ([app/components/layout/StickyFooter.vue](app/components/layout/StickyFooter.vue))

The primary page that composes these layouts is:

- `/pages/index.vue` — App entry page that integrates the layouts and editor UI. ([app/pages/index.vue](app/pages/index.vue))

## Contributing

Contributions are always welcome!

See `Contributing.md` for ways to get started.

<!-- Please adhere to this project's `Code of Conduct`. -->
