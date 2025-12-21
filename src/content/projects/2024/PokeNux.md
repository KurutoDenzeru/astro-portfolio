---
title: "PokéNux - RESTful API Pokedex"
summary: "🧬 Sleek and responsive Pokédex built with Nuxt.js, styled using Tailwind, and powered by PokéAPI and the Pokémon TCG Dex. It provides an intuitive interface for exploring Pokémon details and a comprehensive database of Pokémon TCG Dex."
date: "September 23, 2024"
draft: false
tags:
- Vue.js
- Nuxt.js
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://pokenux.vercel.app
repoUrl: https://github.com/KurutoDenzeru/PokeNux
coverImage: '@assets/Projects/2024/pokenux.webp'
coverAlt: 'PokéNux - RESTful API Pokedex'
---

![coverImage](@assets/Projects/2024/pokenux.webp)

---

## ✨ Features

- **Comprehensive Pokédex:** Browse detailed information about Pokémon, including stats, abilities, and evolution chains.
- **TCG Card Database:** Explore a vast collection of Pokémon TCG cards, complete with stats, rarities, and set details.
- **Responsive Design:** Enjoy a seamless experience on any device, thanks to Tailwind CSS.
- **SEO Optimized:** Built with Nuxt.js, ensuring excellent search engine visibility.
- **PWA Support:** Ready to be installed as a Progressive Web App for offline access and enhanced user experience.

---

## 🛠️ Tech Stack

- [Nuxt.js](https://nuxt.com/) - A progressive Vue.js framework.
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [PokéAPI](https://pokeapi.co/) - RESTful API for Pokémon information.
- [Pokémon TCG Dex](https://https://tcgdex.dev/) - Comprehensive Pokémon Trading Card Game database.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
  git clone https://github.com/KurutoDenzeru/PokeNux.git
  cd PokeNux
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

The application's behavior can be customized via the `nuxt.config.ts` file. Key configurations include:

- **Modules:** `@nuxtjs/tailwindcss`, `nuxt-vitalizer`, `@nuxtjs/sitemap`.
- **CSS:** Global styles are defined in `~/assets/css/main.css`.
- **Content Security Policy:** Configured in `nitro.routeRules` to enhance security.
- **Site Metadata:** Defined under the `site` property for SEO purposes.

---

## Contributing

Contributions are always welcome!

See [Contributing.md](Contributing.md) for ways to get started.
