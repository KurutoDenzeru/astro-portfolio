---
title: "Palette Alchemy"
summary: "🎨 Feature-rich color palette tool using Nuxt, TypeScript, Tailwind, and Shadcn/ui, letting designers generate palettes across color theories, analyze properties, export formats, and enjoy a responsive, elegant interface."
date: "May 18, 2024"
draft: false
tags:
- Nuxt.js
- Typescript
- Shadcn/ui
- Tailwind
- Vue.js
demoUrl: https://palette-alchemy.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/palette-alchemy
coverImage: '@assets/Projects/2024/palettealchemy.webp'
coverAlt: 'Palette Alchemy'
---

![coverImage](@assets/Projects/2024/palettealchemy.webp)

🎨 Feature-rich color palette tool using Nuxt, TypeScript, Tailwind, and Shadcn/ui, letting designers generate palettes across color theories, analyze properties, export formats, and enjoy a responsive, elegant interface.

## Features

- Generate color palettes in various modes (analogous, monochrome, complementary, triadic, compound, shades, tetradic, square)
- Random palette generation with customizable color count
- Color format conversions (HEX, RGB, HSL, HWB, etc.)
- Color analysis (hue, brightness, luminance, contrast)
- Responsive UI with sidebar controls and grid display
- Copy color values to clipboard with toast notifications
- Export palettes
- Built with a beautiful, accessible UI using Tailwind CSS and shadcn components

## Tech Stack

- [Nuxt 4](https://nuxt.com/) (Vue 3)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [chroma-js](https://gka.github.io/chroma.js/) (color manipulation)
- [vue-sonner](https://github.com/emilkowalski/vue-sonner) (toasts)
- [shadcn-vue](https://ui.shadcn.com/) (UI components)

## Deploy Your Own

You can deploy this project to Vercel, Netlify, or any platform that supports Nuxt 4 static or SSR deployments.

- **Vercel:** [vercel.com/new](https://vercel.com/new)
- **Netlify:** [netlify.com/new](https://app.netlify.com/start)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KurutoDenzeru/palette-alchemy.git
   cd palette-alchemy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Configuration

- **Tailwind CSS:** Edit `app/assets/css/tailwind.css` and `tailwind.config.js` for custom styles.
- **Nuxt Config:** See `nuxt.config.ts` for module and build configuration.
- **Palette Modes:** Add or modify palette modes in `app/composables/palette/usePalette.ts`.
- **State Management:** Uses Pinia stores in `app/composables/palette/usePaletteStore.ts`.

## Contributing

Contributions are always welcome!

See `Contributing.md` for ways to get started.
