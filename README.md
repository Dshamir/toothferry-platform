# ToothFerry AI — Multi-Portal Platform

AI-powered dental crown generation platform. From intraoral scan to printable STL in under two minutes.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** with design token system
- **Zustand + Immer** for state management
- **Framer Motion** for animations
- **Puck Editor** (`@puckeditor/core`) for visual page editing

## Portals

| Portal | Path | Purpose |
|--------|------|---------|
| Landing | `/` | Marketing page — hero, pipeline, founders |
| Operator | `/operator` | Real-time case routing and pipeline monitoring |
| Admin | `/admin` | System health, GPU utilization, service status |
| Command | `/command` | Live ops, KPIs with sparklines, event feed |
| Academic | `/academic` | University training — students, professors, assistants |
| Dentist | `/dentist` | Case management, prep quality scoring |
| Lab | `/lab` | Order queue, machine utilization, material inventory |
| Editor | `/editor` | Visual drag-and-drop page editor (Puck) |

## Visual Page Editor

The platform includes a Puck-based visual editor at `/editor` that lets you edit portal pages with drag-and-drop. Components available in the editor:

- **Typography:** Heading, Paragraph
- **Layout:** Section, Columns (2/3/4), Spacer
- **UI Components:** Card, KpiCard, Badge, Button, ProgressBar

All editor components wrap the same UI primitives used throughout the platform.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker Deployment

The platform ships as a single Docker container running Next.js + ngrok via supervisord.

```bash
docker compose up --build -d
```

This starts:
- **Next.js** production server on port 8888 (mapped to host port 3050)
- **ngrok** tunnel to `tfai.ngrok.app`

Set your ngrok auth token in `docker-compose.yml` or via environment variable:

```bash
NGROK_AUTHTOKEN=your_token docker compose up --build -d
```

## Project Structure

```
src/
  app/
    (portals)/          # Portal routes with shared PortalBar layout
      academic/         # Academic portal + professor/assistant/student sub-portals
      admin/            # Admin portal + compliance/flags/roles/scanners
      command/          # Command center + alerts/gtm/revenue/roadmap
      dentist/          # Dentist portal + cases/patients/reports
      lab/              # Lab portal + analytics/batch/billing/milling
      operator/         # Operator dashboard
    editor/             # Puck visual editor
      [slug]/           # Edit specific portal page
      preview/[slug]/   # Preview edited page
  components/
    academic/           # Academic-specific components
    animation/          # Motion primitives (FadeSlideIn, StaggerChildren, etc.)
    layout/             # PortalBar, Sidebar, TopNav, MobileNav
    shared/             # ThemeLoader, ThemeSwitcher, StatusLed, Logo
    ui/                 # Design system (Card, Badge, Button, KpiCard, etc.)
  data/                 # Seed data for demo simulation
  hooks/                # Custom hooks (usePortalTheme, useSimulation, useTour)
  lib/                  # Config, formatters, Puck config, portal definitions
  simulation/           # Live simulation engine, event bus, generators
  store/                # Zustand stores (simulation, editor, academic, theme, etc.)
  types/                # TypeScript type definitions
```

## Theme System

Two theme files in `public/themes/`:
- `design-tokens-v2.css` — Primary design token set
- `legacy-teal.css` — Alternative teal theme

Themes are loaded via CSS custom properties and can be switched at runtime with the ThemeSwitcher component.
