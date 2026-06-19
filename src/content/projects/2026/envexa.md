---
title: "Envexa - Security Toolchain Health Monitor"
summary: "🚧 Blazing-fast Rust TUI and scriptable CLI for monitoring local developer tooling health. Instantly track outdated packages and audit security risks across 14+ toolchains."
date: "May 22, 2026"
draft: true
tags:
- Rust
- Tanstack
- Tailwind
- Shadcn/ui
demoUrl: https://github.com/KurutoDenzeru/envexa
repoUrl: https://github.com/KurutoDenzeru/envexa
coverAlt: 'Envexa - Security Toolchain Health Monitor'
---

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/Envexa">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/Envexa">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</div>

---

## ✨ Features

- **Concurrent Engine**: Scans 14+ toolchains (Homebrew, npm, Cargo, Docker, etc.) in parallel.
- **Interactive TUI**: Features custom pie charts, health gauges, and quick keyboard navigation.
- **Project Tooling Sector**: Deep-dives into local lockfiles, dependency drift, and security audits.
- **CLI Reports**: Generates production-ready Markdown reports instantly for CI/CD or PRs.
- **Smart Cache**: Zero-friction launches utilizing local JSON state (`~/.envexa/cache.json`).

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
envexa/
├── Cargo.toml
├── src/
│   ├── main.rs             # Application entrypoint (TUI or CLI router)
│   ├── cli.rs              # CLI command parser and runner
│   ├── config.rs           # Persistent configurations and cached state
│   ├── scanner/
│   │   └── mod.rs          # Formatting utilities and diagnostic extraction
│   ├── tui/
│   │   ├── app.rs          # App state management, keyboard events, and scheduler
│   │   ├── mod.rs
│   │   └── ui.rs           # Ratatui rendering pipeline and interface structures
│   └── toolchains/
│       ├── mod.rs          # ScanResult schema, protocols, and multi-thread runners
│       ├── brew.rs
│       ├── npm.rs / pnpm.rs / yarn.rs / bun.rs / deno.rs
│       ├── pip.rs / gem.rs / cargo.rs / docker.rs
│       └── project.rs / security.rs / audit.rs / ci.rs
├── scripts/
│   ├── install.sh
│   └── build-and-upload.sh
└── .github/
    └── workflows/
```

---

## 🤝 Contributing

Contributions are always welcome, whether you're fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out [Contributing.md](Contributing) to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the MIT License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the [MIT](LICENSE) file.
