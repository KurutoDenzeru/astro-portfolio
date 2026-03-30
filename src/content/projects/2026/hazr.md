---
title: "Hazr - Live Weather, Earthquakes, Air Quality, & Global Alerts"
summary: "🗺️ Real-time geospatial hazard dashboard built with Vite, React, & MapLibre, powered by USGS Earthquakes, Open-Meteo Weather, NASA EONET Signals, OpenAQ, & NWS Alerts."
date: "Jan 07, 2026"
draft: false
tags:
- React
- Vite
- Typescript
- Tailwind
- Shadcn/ui
demoUrl: https://hazr.vercel.app/
repoUrl: https://github.com/KurutoDenzeru/Hazr
coverAlt: 'Hazr - Live Weather, Earthquakes, Air Quality, & Global Alerts'
---

---

## ☁️ Deploy your own

<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KurutoDenzeru/Hazr">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KurutoDenzeru/Hazr">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</div>

---

## ✨ Features

- **Multi-source Live Signals:** Aggregates USGS earthquakes, Open‑Meteo weather, NASA EONET events, OpenAQ air quality, and NWS tsunami alerts on one map.
- **Dedicated Signal Panels:** Weather, Seismic Activity, and Global Signals sections with focused feeds for events, air quality, and tsunami alerts.
- **Interactive Map UI:** MapLibre-based map with clustering, fly-to interactions, and detailed popovers across all supported signal types.
- **Live + Manual Refresh:** Auto-refresh polling plus per-panel refresh controls with last-updated status in tooltips.
- **Accessible & Responsive:** Resizable desktop sidebar and mobile navigation with keyboard-friendly controls and ARIA labels.
- **Filterable Views:** Earthquake magnitude/time filters and weather-focused widgets for fast situational awareness.
- **Modular & Extensible:** Clean component boundaries and hooks making it easy to add new data sources, widgets, or visualizations.

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/): Fast dev server and build tool.
- [React](https://reactjs.org/): Component-driven UI library.
- [TypeScript](https://www.typescriptlang.org/): Static typing and developer tooling.
- [Tailwind](https://tailwindcss.com/): Utility-first styling system.
- [MapLibre / Mapcn](https://maplibre.org/): Map rendering and tile handling (Mapcn integration for MapLibre).
- [shadcn/ui](https://ui.shadcn.com/): UI primitives, composition patterns, and design tokens.

---

## 🔌 Data APIs

- [Open-Meteo - Weather](https://open-meteo.com/): Weather forecasts and current conditions.
- [USGS Earthquake - Earthquakes](https://earthquake.usgs.gov/fdsnws/event/1/): Live earthquake feeds.
- [NASA EONET - Events](https://eonet.gsfc.nasa.gov/docs/v3): Global natural event signals.
- [OpenAQ - Air Quality](https://docs.openaq.org/): Air quality observations.
- [NWS Alerts - Tsunamis](https://www.weather.gov/documentation/services-web-alerts): Active tsunami alerts.

---

## 🚀 Getting Started

Clone the repo, install deps, and boot the dev server:

```bash
git clone https://github.com/KurutoDenzeru/Hazr.git
cd Hazr
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 📦 Build for Production

```bash
bun run build
bun start
```

---

## 🗂️ Configuration

The app is implemented under `src/`. Key areas to customize and extend are:

```text
src/
  App.tsx
  main.tsx
  components/
    global-activity.tsx           # Global signals panel (EONET, OpenAQ, Tsunami)
    hazr-earthquake-item.tsx
    hazr-menu-panel.tsx           # Sidebar section layout
    hazr-sidebar.tsx              # Main app sidebar shell
    hazr-weather-icon.tsx
    mobile-bottom-nav.tsx
    openstreet-map.tsx            # Main map container
    seismic-activity.tsx          # Earthquake panel
    signal-history-list.tsx       # Reusable history list/cards for signal sections
    layout/                       # Layout components (header, footer, docks)
    map/                          # Map-specific helpers and popovers
      earthquake-popover.tsx
      hourly-forecast-dock.tsx
      openstreet-map-helpers.tsx
      weather-dock.tsx
  hooks/
    use-air-quality.ts            # OpenAQ polling with friendly location label normalization
    use-earthquakes.ts            # USGS feed fetching, sorting, and metadata
    use-eonet-events.ts           # NASA EONET live events ingestion and shaping
    use-tsunami-alerts.ts         # NWS tsunami alert polling and mapping
    use-weather.ts                # Weather fetch, IP fallback location, and forecast processing
  lib/
    geo.ts                        # Geometry helpers for converting API shapes to map points
    ip-location.ts                # IP geolocation resolver and fallback location utilities
    utils.ts                      # Shared utility helpers (class names and common transforms)
  types/
    api.ts                        # Central API contracts, domain types, and enums
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
