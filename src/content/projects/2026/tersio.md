---
title: "Tersio - Token Saver & Usage Tracker"
summary: "✂️ Token saver and usage tracker for coding agents: terse Caveman replies, compact RTK shell output, lean Ponytail code, pstack rigor, Headroom compression, and a local CodeGraph, all driven by one-command combos over a single shared extension tree."
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

- **Caveman Mode** — Terse reply style at `lite`, `full`, `ultra`, plus three `megacave` levels to cut reply tokens.
- **RTK Rewriting** — Shell output compression for eligible commands. A failing test still names the test, the assertion, and the line.
- **Ponytail Mode** — Lean code-call discipline at `lite`, `full`, and `ultra` levels.
- **pstack Rigor** — Applies a design principle when the moment fits, and owns the approach, the check, and the design. Opt-in.
- **Headroom Compression** — Shrinks tool output, file reads, and history. Opt-in, and Tersio reads its savings without switching it on.
- **CodeGraph Index** — Local graph of symbols, callers, and dependencies, so an agent asks for a blast radius instead of reading whole files. On by default.
- **Combo Presets** — One command sets Caveman, RTK, and Ponytail together at `off`, `lite`, `balanced`, or `max`.
- **Shared Extension Tree** — The same extensions load for Oh My Pi, pi, Pi-in-Go, OpenCode, DeepSeek Harness, Codex, and Claude Code from one source.
- **MCP Server** — `tersio mcp` exposes seven tools and two resources, so any MCP client can read usage and switch modes mid-session.
- **Usage Ledger** — Local SQLite ledger of tokens, cost, and savings, mirrored per host and agent kind.
- **Gain Dashboard** — Local dashboard for spend, requests, tokens, cache rate, tools, traces, carbon, and per-model cost.
- **Health Checks** — `tersio doctor` inspects hosts, extensions, Ponytail, RTK, and OpenCode service state, and repairs what it can.
- **Snapshots and Reset** — Scheduled backups of `usage.db`, with a restore that saves current state first.
- **Measured Claims** — Published per-mode benchmarks, with the rerun protocol documented.

---

## 🧱 Tech Stack

- [Bun](https://bun.sh/): Runtime and script runner for the CLI, installer, and test suite.
- [Node.js](https://nodejs.org): Required at 20.12+ for the published `tersio` bin.
- [TypeScript](https://www.typescriptlang.org/): Static typing for the CLI, extensions, and dashboard.
- [React](https://react.dev/): UI library for the dashboard app.
- [Vite](https://vitejs.dev/): Dev server and build tool for the dashboard bundle.
- [Tailwind](https://tailwindcss.com/): Utility-first styling for the dashboard and extension UI.
- [shadcn/ui](https://ui.shadcn.com/): Component primitives and design tokens for the dashboard.
- [SQLite](https://sqlite.org/): Local store for usage rows, prices, and state.
- [Oxlint](https://oxc.rs/): Fast linter across the CLI, extensions, and dashboard.

---

## 🚀 Getting Started

Install the CLI and pick a host in one pass:

```bash
curl -fsSL https://github.com/KurutoDenzeru/tersio/releases/latest/download/install.sh | sh
```

Windows runs the same pass through PowerShell:

```powershell
irm https://github.com/KurutoDenzeru/tersio/releases/latest/download/install.ps1 | iex
```

Then run the CLI. Bare `tersio` opens a menu that asks which host to install into. Install one host directly, or let the host install the package itself:

```bash
tersio install --host codex     # Codex
tersio install --host claude    # Claude Code
tersio install --host opencode  # OpenCode
tersio install --host omp       # Oh My Pi
tersio install --host pi        # pi
tersio install --host dsh       # DeepSeek Harness
tersio install --host pig       # Pi-in-Go
```

Each host can also install the package without the CLI:

```bash
codex plugin marketplace add KurutoDenzeru/tersio
opencode plugin add @krtclcdy/tersio
omp plugin install @krtclcdy/tersio
pi install npm:@krtclcdy/tersio
pig install npm:@krtclcdy/tersio
dsh plugin --profile web add npm:@krtclcdy/tersio
```

Pick one install method per host. Using both registers every command twice.

### Requirements

- **Host**: OMP, pi, OpenCode, Pi-in-Go, DeepSeek Harness, Codex, or Claude Code.
- **Node.js**: 20.12+ with npm. The published bin starts with `#!/usr/bin/env node`.
- **Bun**: Optional. Preferred when on `PATH`, npm otherwise, and it supplies SQLite in process.
- **SQLite**: Bun, Node 22.5+ `node:sqlite`, or the `sqlite3` binary on `PATH`.
- **OS**: macOS, Linux, or Windows. WSL works when installed from inside it.

## 📦 Build for Production

```bash
bun install
bun run build
```

---

## 🗂️ Configuration

The CLI lives under `cli/`, the agent extensions under `extensions/`, and the dashboard under `dashboard/app/src/`. Key areas:

```text
cli/
  install.ts        # Host install and preset menu flow
  doctor.ts         # Health checks with optional repair scopes
  dashboard.ts      # Local dashboard server, bind, and export
  mcp.ts            # MCP server on stdio
  modes.ts          # Session defaults without a slash command
  codegraph.ts      # Index sync and query surface
  usage.ts          # Ledger-backed usage and savings report
  hosts.ts          # Host detection and version reporting
  uninstall.ts      # Extension removal with keep-flag options
extensions/
  shared/           # Pricing, carbon, ledger, and status helpers
  caveman/          # Terse reply style rules
  rtk/              # Shell output rewriting rules
  ponytail/         # Lean code rules
  pstack/           # Rigor mode rules
  headroom/         # Compression wiring and savings
  codegraph/        # Local code graph
  combo/            # One-preset mode switching
  commands/         # Slash command surface
dashboard/app/src/
  components/       # Agents, charts, dialogs, request drawer
  lib/              # Data shaping, formatting, carbon estimates
  hooks/            # Data fetching and layout state
```

Shared state, identical for every host:

- **Session defaults** — `~/.tersio/settings.json` holds combo, caveman, RTK, Ponytail, pstack, Headroom, CodeGraph, the status line, and currency. `hosts.<agent>` overrides one agent.
- **Ledger and caches** — `~/.tersio/usage.db` holds usage rows, prices, scorecard, state, Headroom records, and layout. Local only.
- **Activity log** — `~/.tersio/activity.jsonl` writes one line per change, as the Logs page reads it.
- **Snapshots** — `~/.tersio/backups/` keeps one hashed `.snap` each, fourteen total, carrying `usage.db` whole.

---

## 📊 Benchmarks

One model, `GLM-5.3-Flash`, five runs per prompt. Full protocol in `docs/BENCHMARK.md`.

| Case | Reply tokens | Quality |
| --- | ---: | ---: |
| Base | 0 | 11/15 |
| Caveman `lite` | −10.9% | 8/15 |
| Caveman `full` | −8.4% | 8/15 |
| Caveman `ultra` | −15.1% | 12/15 |
| Ponytail `lite` | +20.6% | 13/15 |
| Ponytail `full` | +11.2% | 12/15 |
| Ponytail `ultra` | +28.4% | 12/15 |
| RTK `on` | −79.5% on `find`, −10.5% on `grep` | 3/15 |
| Headroom `on` | −94.9% payload | sentinel |
| Combo `lite` | −16.0% | 5/15 |
| Combo `balanced` | −0.8% | 10/15 |
| Combo `max` | +6.7% | 8/15 |

Base run: 119 reply tokens, 1,616 total. Caveman levels spend more prompt tokens than the reply text they save, so use Caveman for writing style, not as a token saving. Agentic rows in the full table rest on one to five runs and are read as smoke tests, with no bill savings claimed.

---

## 🤝🏻 Contributing

Contributions are always welcome, whether you’re fixing bugs, improving docs, or shipping new features that make the project better for everyone.

Check out `CONTRIBUTING.md` to learn how to get started and follow the recommended workflow.

<!-- Please adhere to this project's `Code of Conduct`. -->

---

## ⚖️ License

This project is released under the MIT License, giving you the freedom to use, modify, and distribute the code with minimal restrictions.

For the full legal text, see the `LICENSE` file.
