---
title: "Tersio - Token Saver & Usage Tracker"
summary: "✂️ Token saver and usage tracker for coding agents: terse caveman replies, compact RTK shell output, lean Ponytail code calls, and a gain dashboard — one-command combo presets over one shared extension tree."
date: "Oct 07, 2026"
draft: false
tags:
- AI
- Typescript
- Bun
- Bash
- React
- Shadcn/ui
demoUrl: https://www.npmjs.com/package/@krtclcdy/tersio
repoUrl: https://github.com/KurutoDenzeru/tersio
coverImage: '@assets/Projects/2026/tersio.webp'
coverAlt: 'Tersio - Token Saver & Usage Tracker'
---

---

## ✨ Features

- **Caveman Mode** — Terse reply style at `lite`, `full`, and `ultra` levels to cut reply tokens.
- **Ponytail Mode** — Lean code-call discipline with the same three intensity levels.
- **RTK Rewriting** — Shell output compression for eligible commands before they reach the model.
- **Combo Presets** — One command sets caveman, RTK, and Ponytail together (`off`, `medium`, `balanced`, `max`).
- **Shared Extension Tree** — The same five extensions load for Oh My Pi, pi, and OpenCode from one source.
- **Usage Ledger** — Local SQLite ledger of tokens, cost, and savings across sessions.
- **Gain Dashboard** — Local dashboard with live feed, per-model cost, recent requests, and command-tool savings.
- **Health Checks** — `tersio doctor` inspects agent, extension, Ponytail, and RTK state and repairs what it can.
- **Settings Menu** — Interactive scoped menus for install, preset defaults, currency, and profile.
- **Measured Claims** — Published benchmarks per mode, with the rerun protocol documented.

---

## 🧱 Tech Stack

- [Bun](https://bun.sh/): Runtime and script runner for the CLI, installer, and test suite.
- [TypeScript](https://www.typescriptlang.org/): Static typing for the CLI, extensions, and dashboard.
- [React](https://react.dev/): UI library for the dashboard app.
- [Vite](https://vitejs.dev/): Dev server and build tool for the dashboard bundle.
- [Tailwind](https://tailwindcss.com/): Utility-first styling for the dashboard and extension UI.
- [shadcn/ui](https://ui.shadcn.com/): Component primitives and design tokens for the dashboard.
- [Oxlint](https://oxc.rs/): Fast linter across the CLI, extensions, and dashboard.

---

## 🚀 Getting Started

Install the CLI and pick a host in one pass:

```bash
curl -fsSL https://github.com/KurutoDenzeru/tersio/releases/latest/download/install.sh | sh
```

Then open the menu, or install non-interactively:

```bash
tersio                        # menu — picks Oh My Pi, pi, or OpenCode
tersio install --host pi      # pi, non-interactive
tersio install --host omp     # Oh My Pi, non-interactive
tersio install --host opencode # OpenCode, non-interactive
```

Each host can also install the package itself:

```bash
omp plugin install @krtclcdy/tersio
pi install npm:@krtclcdy/tersio
opencode plugin add @krtclcdy/tersio
```

Pick one install method per host. Using both registers every command twice.

## 📦 Build for Production

```bash
bun install
bun run build
```

---

## 🗂️ Configuration

The CLI lives under `cli/` and the extensions under `extensions/`. Key areas:

```text
cli/
  install.ts        # Host install and preset menu flow
  doctor.ts         # Health checks with optional repair scopes
  dashboard.ts      # Local dashboard server and export
  usage.ts          # Ledger-backed usage and savings report
  settings.ts       # Defaults, currency, and profile handling
  update.ts         # CLI, extension, and add-on refresh
  uninstall.ts      # Extension removal with keep-flag options
extensions/
  shared/           # Pricing, carbon, usage ledger, status helpers
  caveman-session/  # Terse reply style rules
  rtk-session/      # Shell output rewriting rules
  combo-toggle/     # One-preset mode switching
  ai-addons-updater/# Upstream add-on updates
  tersio-commands/  # Slash command surface
dashboard/app/
  src/components/   # Hero, activity, models, savings, request drawer
  src/lib/          # Data shaping, formatting, carbon estimates
```

Session defaults persist in `~/.tersio/settings.json` and usage rows in `~/.tersio/usage.db`.

---

## 📊 Benchmarks

Each mode is measured against a base run with all modes off. Full protocol in `docs/BENCHMARK.md`.

- **`/ponytail ultra`** — code reply tokens, **−63.4%**.
- **`/combo medium`** — code reply tokens, **−56.9%**.
- **`/rtk on` with `bun run test`** — command output, **−98.7%**.
- **`/rtk on` with `git status`** — command output, **−75.0%**.
- **`/caveman full`** — reply text tokens, **−13.7%**.

Caveman levels spend more prompt tokens than the reply text they save. Use Caveman for writing style, not as a token saving.

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `Contributing.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the MIT License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the `MIT` file.