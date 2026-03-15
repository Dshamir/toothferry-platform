# ToothFerry AI

AI-powered dental crown generation. Intraoral scan to milling-ready STL in under two minutes, with 70.7 micrometer mean margin accuracy.

Founded by **Haim Keren** (CEO, Prosthodontist & McGill Professor), **Julia Keren** (COO), and **Dr. Nathaniel Lasry** (CSO, AI/ML Research Lead).

## What This Is

A fully interactive, client-side demo platform simulating the complete ToothFerry product across 9 role-based portals. Every portal has its own layout, sidebar, navigation, and live simulation data. No backend required — all state lives in Zustand stores with seed data.

## AI Crown Pipeline

```
Ingest scan (STL/OBJ/PLY) → Segment arch (MeshSegNet) → Detect margin (5-fold ensemble)
→ Generate crown (3D reconstruction) → QC validate (margin gap + occlusion) → Export STL
```

## Portals (42 pages)

### Landing (`/`)
Marketing page with hero, 6-step pipeline visualization, 9-portal grid, founder bios, trust bar, and CTA.

### Operator (`/operator`)
Real-time case routing dashboard. Pipeline phase distribution, case table with confidence scores, priority flags.

### Admin (`/admin`)
System health monitoring. API/inference status, GPU utilization (4x A100), service table with latency/uptime/version, storage usage.

| Sub-route | Purpose |
|-----------|---------|
| `/admin/compliance` | Compliance dashboard |
| `/admin/feature-flags` | Feature flag management |
| `/admin/model-config` | AI model configuration |
| `/admin/roles` | Role-based access control |
| `/admin/scanners` | Scanner device management |

### Command Center (`/command`)
Live ops and business intelligence. KPI cards with inline sparkline charts, real-time event feed auto-updating every 4 seconds with color-coded portal indicators.

| Sub-route | Purpose |
|-----------|---------|
| `/command/alerts` | Active alert management |
| `/command/gtm` | Go-to-market phase tracking |
| `/command/revenue` | Revenue analytics |
| `/command/roadmap` | Product roadmap |

### Academic (`/academic`)
University-level institutional dashboard. 124 students, 4 professors, training module progress tracking, activity feed.

| Sub-route | Purpose |
|-----------|---------|
| `/academic/professor` | Professor portal — 5-axis evaluation, student review queue |
| `/academic/professor/evaluate` | Evaluate student submissions |
| `/academic/professor/student/[id]` | Individual student profile |
| `/academic/assistant` | Assistant portal — grade assigned students |
| `/academic/assistant/evaluate` | Submit evaluations for professor review |
| `/academic/student` | Student portal — scan submission, scores |
| `/academic/student/submit` | Upload prep scans |
| `/academic/student/feedback` | View evaluation feedback |
| `/academic/student/transcript` | Academic transcript |
| `/academic/courses` | Course catalog |
| `/academic/crown-anatomy` | Crown anatomy training module |
| `/academic/margin-training` | Margin line detection training |
| `/academic/prep-eval` | Prep evaluation exercises |
| `/academic/grades` | Grade overview |
| `/academic/users` | User management |

### Dentist (`/dentist`)
Case management dashboard. KPIs (crowns/month, design time, first-pass acceptance, prep quality score), 6-stage pipeline status, recent cases table.

| Sub-route | Purpose |
|-----------|---------|
| `/dentist/generate` | 5-step crown generation wizard |
| `/dentist/cases` | All cases list |
| `/dentist/patients` | Patient records |
| `/dentist/results` | AI generation results |
| `/dentist/reports` | Analytics reports |
| `/dentist/team` | Team management |

### Lab (`/lab`)
Production operations. Order queue with priority cards, machine utilization (progress bars per mill), material inventory with critical alerts, 7-day throughput bar chart. ROI insight box.

| Sub-route | Purpose |
|-----------|---------|
| `/lab/analytics` | Production analytics |
| `/lab/batch` | Batch processing |
| `/lab/billing` | Billing and invoicing |
| `/lab/dentists` | Referring dentist management |
| `/lab/milling` | Milling queue operations |
| `/lab/review` | STL review and approval |

### Page Editor (`/editor`)
Visual drag-and-drop page editor built on [Puck](https://github.com/measuredco/puck). Lists all portal pages for editing. Each opens a full-screen Puck canvas with a component panel on the left.

Available editor components wrap the platform's actual UI primitives:
- **Typography:** Heading (h1-h4), Paragraph
- **Layout:** Section (with background color), Columns (2/3/4), Spacer
- **UI:** Card (with drop zone), KpiCard, Badge (8 variants), Button (4 variants, 3 sizes), ProgressBar

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.1.6 |
| UI | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| State | Zustand + Immer | 5.x / 11.x |
| Animation | Framer Motion | 12.x |
| Page Editor | @puckeditor/core | 0.21.x |

## Theme System

CSS custom property design tokens loaded from `public/themes/`. Two themes ship:
- **design-tokens-v2.css** — Primary dark/light token set
- **legacy-teal.css** — Alternative teal theme

Runtime switching via the `ThemeSwitcher` component (bottom-right corner). Each portal applies its own color overrides via `usePortalTheme()`.

## Layout Architecture

Each portal has its own `layout.tsx` providing:
- **TopNav** — portal name, color accent, horizontal tab bar
- **Sidebar** — grouped navigation with icons and optional badges
- **MobileNav** — responsive bottom nav for mobile
- **PortalBar** — global top bar across all portals (38px) with portal links

The PortalBar link order: `TF | www | platform | admin | command | ── | academic | professor | assistant | student | ── | dentist | lab | ── | Edit Mode`

## Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Docker

Single container running Next.js + ngrok tunnel via supervisord:

```bash
# Set your ngrok auth token
export NGROK_AUTHTOKEN=your_token_here

docker compose up --build -d
```

- App: `http://localhost:3050`
- Tunnel: `https://tfai.ngrok.app`

For production deployment on a Linux server, clone and run `docker compose up --build -d`.
