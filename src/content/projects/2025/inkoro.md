---
title: "Inkoro - PDF Editor & Anotator"
summary: "🪶 Lightweight React + TypeScript PDF editor built with Next.js, react-pdf (pdf.js), pdf-lib, Tailwind, shadcn/ui, Zustand, dnd-kit, html2canvas, and react-moveable."
date: "Oct 27, 2025"
draft: false
tags:
- React
- TypeScript
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://inkoro.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/Inkoro
coverImage: '@assets/Projects/2025/inkoro.webp'
coverAlt: 'Inkoro - PDF Editor & Anotator'
---

![coverImage](@assets/Projects/2025/inkoro.webp)

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/Inkoro" target="_blank" rel="noopener">
    <img src="../../../_deploy_vercel.svg" alt="Deploy with Vercel" style="height:30px;">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/Inkoro" target="_blank" rel="noopener">
    <img src="../../../_deploy_netlify.svg" alt="Deploy with Netlify" style="height:30px;">
  </a>
</div>

---

## ✨ Features

- **PDF Viewing & Navigation:** Open, preview, and navigate multi-page documents using `react-pdf` (pdf.js).
- **Upload, Reorder & Remove Pages:** Upload PDFs, reorder or remove pages via drag-and-drop thumbnails.
- **Rich Annotation Support:** Add and edit annotations — pen/freehand, text, highlights, shapes (rectangles/circles/lines/arrows), images, and signatures.
- **Annotation Editing Tools:** Modify color, stroke, font, position, rotate, resize, and layer ordering of annotations.
- **Export & Download:** Export full documents or single pages to PDF, PNG, JPEG, or WebP.
- **Undo/Redo & Clipboard:** Undo/redo history, copy/paste annotations, and architecture to persist editor sessions via `localStorage`.
- **Responsive & Accessible:** Mobile-first UI with keyboard shortcuts, accessible controls, and a compact toolbar for small screens.

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/) + React + TypeScript: Fast development with modern tooling.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework used for styling.
- [Shadcn UI / Radix UI](https://ui.shadcn.com/): Headless UI components and patterns.
- [react-pdf](https://github.com/wojtekmaj/react-pdf) + [pdfjs-dist (pdf.js)](https://www.jsdelivr.com/package/npm/pdfjs-dist): PDF rendering within the browser.
- [pdf-lib](https://github.com/Hopding/pdf-lib): Client-side PDF creation and modification.
- [Zustand](https://zustand.docs.pmnd.rs/): Minimal, fast, and scalable state management for React using simplified hooks.

---

## ⚡ Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/Inkoro.git
cd Inkoro
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Build for Production

```bash
bun run build
bun start
```

---

## 🗂️ Configuration

The editor is componentized under `src/components`. Key areas to customize are:

```text
app/
	layout.tsx                 # Root layout and metadata
	page.tsx                   # Main app entry
components/
	providers.tsx              # Context providers
	editor/
		editor-layout.tsx      # Editor layout
		canvas-layer.tsx       # PDF canvas and annotation layer
		layer-list.tsx         # Layer management UI
		toolbar.tsx            # Annotation and tool controls
		thumbnail-list.tsx     # Page thumbnails and reordering
		properties-panel.tsx   # Annotation properties panel
		pdf-viewer.tsx         # PDF rendering
		upload-dialog.tsx      # PDF upload dialog
		download-dialog.tsx    # Export/download dialog
		signature-dialog.tsx   # Signature creation dialog
		image-dialog.tsx       # Image annotation dialog
hooks/
	use-dialogs.ts             # Dialog state management
	use-mobile.tsx             # Mobile detection hook
lib/
	pdf-setup.ts               # PDF.js setup
	pdf-utils.ts               # PDF utility functions
	store.ts                   # Zustand store (app state)
	utils.ts                   # General utilities
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
