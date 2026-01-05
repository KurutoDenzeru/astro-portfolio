---
title: " Barcoda - Barcode + QR Generator & Code Scanner"
summary: "📊 Modern barcode + QR code generator with built-in code scanner, powered by JsBarcode, html5-qrcode, and qr-code-styling. Built with Next.js, Tailwind, and shadcn/ui — customizable."
date: "December 06, 2024"
draft: false
tags:
- Next.js
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://barcoda.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/barcoda
coverImage: '@assets/Projects/2024/barcoda.webp'
coverAlt: ' 📊 Barcoda - Barcode + QR Generator & Code Scanner'
---

![coverImage](@assets/Projects/2024/barcoda.webp)

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/Barcoda" target="_blank" rel="noopener">
    <img src="../../../_deploy_vercel.svg" alt="Deploy with Vercel" style="height:30px;">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/Barcoda" target="_blank" rel="noopener">
    <img src="../../../_deploy_netlify.svg" alt="Deploy with Netlify" style="height:30px;">
  </a>
</div>

---

## ✨ Features

- **Real-time Preview** — Instant visual feedback while editing.
- **Multi-format Support** — CODE128, EAN13, UPC, CODE39, and more.
- **Flexible Customization** — Size, margin, colors, text, font, and alignment.
- **Export Options** — PNG, JPEG, WebP, SVG (including raw SVG export).
- **QR Styling** — Dots, corners, rounded shapes, logos, and error correction.
- **Scan & Upload** — Scanning and image upload are supported via `html5-qrcode`.
- **Responsive & Accessible UI** — Built with Tailwind CSS and shadcn/ui; supports dark/light mode.
- **Free & Open Source** — MIT licensed; contributions welcome.

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/): React framework for building performant web applications.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Shadcn UI](https://ui.shadcn.com/): Re-usable components built using Radix UI and Tailwind CSS.
- [JsBarcode](https://github.com/lindell/JsBarcode): JavaScript barcode generator.
- [html5-qrcode](https://github.com/mebjas/html5-qrcode): Lightweight camera + image scanner for QR codes and barcodes (used for Code Scanner).
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling): Highly customizable QR generator with styling, logos, and multiple export formats.

---

## ⚡ Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/Barcoda.git
cd Barcoda
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
app/                        # Next.js App Router pages & layouts
  page.tsx                  # Main page that mounts QRBarcodeGenerator
  layout.tsx                # Global layout, fonts, metadata (Open Graph, structured data)
  qr-barcode-generator/     # QR & Barcode features (generator, scanner, types)
    index.tsx               # Page integration (tabs/navigation)
    barcode-generator.tsx   # JsBarcode-based barcode generator
    qr-generator.tsx        # QR generator using qr-code-styling (styling, logos, export)
    code-scanner.tsx        # Scanner using html5-qrcode (camera & image scan)
    types.ts                # Types, defaults, and settings
lib/                        # Utilities and helpers
  utils.ts                  # Helper functions
```

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the MIT License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the ``MIT`` file.
