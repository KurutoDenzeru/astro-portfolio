---
title: "ChainPaper - Trustless Whitepaper"
summary: "✍️ Secure markdown platform for authorship assurance, crafted with Nuxt, Tailwind, and Shadcn for instant preview and modern usability."
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

The main configurations for the markdown editor are located within the `app/components` directory, specifically in:

- `app/components/markdown/editor/MarkdownEditorToolbar.vue`: Handles the main editing toolbar with formatting options.
- `app/components/markdown/layout/MarkdownMenuBar.vue`: Manages the menu bar with advanced formatting and insert options.
- `app/components/editor/EmojiInsertDialog.vue`: Provides emoji insertion with categorized selection.
- `app/lib/markdown-formatting.ts`: Contains utility functions for markdown formatting and processing.

## Contributing

Contributions are always welcome!

See `Contributing.md` for ways to get started.

<!-- Please adhere to this project's `Code of Conduct`. -->
