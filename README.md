# DevSec Status

<div align="center">

![DevSec Status Logo](https://msercanvar.sirv.com/devsec-status-images/devsec-logo.webp)

**Automated statistics, popularity & momentum tracker for Programming Languages, Frameworks, Databases, and Open Source Cybersecurity Tools.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live_Demo-devsec--status.vercel.app-CEFF00?logo=vercel&logoColor=black)](https://devsec-status.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Actions](https://img.shields.io/badge/Data_Sync-Every_6_Hours-success?logo=github-actions)](https://github.com/sercanvr/devsec-status/actions)

</div>

---

## Overview

**DevSec Status** is an open-source developer intelligence dashboard designed to monitor the growth, developer adoption, repository volume, and velocity of major programming languages, modern frameworks, database engines, and cybersecurity toolkits.

Combining GitHub Search API metrics with a financial-grade **Fintech & Stock-Terminal UI**, DevSec Status visualizes technology popularity through interactive segmented metric bars, blueprint-styled architectural showcase heroes, dynamic community contributor stacks, and instant search filtering.

---

## Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) | Core UI rendering with concurrent React features |
| **Bundler & Tooling** | [Vite 6](https://vitejs.dev/) & [TypeScript 5](https://www.typescriptlang.org/) | Next-generation frontend tooling and strict type checking |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Modern utility-first styling with custom glassmorphism and animations |
| **Routing** | [React Router 7](https://reactrouter.com/) | Client-side routing between Software and Security pages |
| **Localization (i18n)** | [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/) | 9 languages (English, Turkish, German, French, Spanish, Italian, Portuguese, Russian, Chinese) with automatic browser detection |
| **Icons & Media** | [Lucide React](https://lucide.dev/) & WebP | Crisp scalable vector icons and lightweight WebP graphics |
| **Security & Sanitization** | [DOMPurify](https://github.com/cure53/DOMPurify) | Strict XSS sanitization for all rendered dynamic and static strings |
| **Testing** | [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/) | Blazing-fast unit and component test suite |
| **Automation** | [GitHub Actions](https://github.com/features/actions) & `tsx` | Automated scheduled GitHub API fetch workflow every 6 hours |

---

## Key Features

- **Fintech & Stock-Terminal UI**: Technology metrics visualized through 20-segment capsule progress bars with adaptive color tiers (Cobalt Blue, Emerald, Amber, Rose).
- **Blueprint Architecture Showcase**: High-impact hero container featuring SVG blueprint vectors, interactive sparkline charts, growth ratios, and a central orbital tech hub.
- **Granular Category Tables**: Full developer and security ecosystem organized across 8 dedicated tables (125 tracked technologies total):
  - **Software Ecosystem** ([Software Page](https://devsec-status.vercel.app/)):
    - *Programming Languages* (28 core languages: Python, Rust, TypeScript, Go, C++, etc.)
    - *Frameworks & Libraries* (19 modern stacks: React, Next.js, FastAPI, Vue, Gin, etc.)
    - *Database Technologies* (15 relational, NoSQL, and vector engines: PostgreSQL, Redis, Supabase, MongoDB, SQLite, etc.)
    - *Linux Distributions* (11 core operating systems: Ubuntu, Debian, Arch, Fedora, Alpine, etc.)
    - *AI Tools & Frameworks* (12 intelligence stacks: LangChain, Ollama, vLLM, AutoGen, etc.)
    - *AI Infrastructure & Platforms* (12 deployment engines: Hugging Face, LocalAI, Triton, etc.)
  - **Security & SecOps Ecosystem** ([Security Page](https://devsec-status.vercel.app/security)):
    - *Cybersecurity Tools* (21 SAST/DAST, scanners, and exploit frameworks: Ghidra, Metasploit, Nmap, Trivy, Nuclei, ZAP, etc.)
    - *Security Operating Systems* (7 penetration testing distributions: Kali Linux, Parrot OS, BlackArch, Tails, etc.)
- **Expandable Community Drawer**:
  - Top 4 live GitHub contributors with interactive avatar cards and profile links
  - Top starred new repository of the month
  - Total ecosystem repository count and official release dates
  - Direct external repository navigation
- **Instant Search & Tag Filtering (`⌘K` / `Ctrl+K`)**: Global search modal supporting fuzzy name search, categories, creators, and hashtag syntax (e.g. `#framework`, `#systems`).
- **Multilingual Support (9 Languages - EN / TR / DE / FR / ES / IT / PT / RU / ZH)**: Instant switching across 9 global languages with zero-delay CDN-optimized WebP flag preloading and persistent storage.
- **Dark & Light Mode**: Seamless theme switching with persistent storage and system preference detection.
- **Zero Client Rate Limits**: Metrics are pre-fetched via automated GitHub Actions and baked into static JSON, guaranteeing instant page loads without GitHub 403 API rate errors.
- **AI Agentic & Search Engine Ready**: Built-in `sitemap.xml`, `robots.txt`, `llms.txt`, and `ai-catalog.json` for autonomous AI agents and web crawlers.
- **Responsive Standard**: Tested and optimized across Mobile (`390 x 844 px`), Tablet (`768 x 1024 px`), Laptop (`1366 x 768 px`), and Desktop (`1920 x 1080 px`).

---

## Project Structure

```
devsec-status/
├── .github/
│   └── workflows/
│       └── update-data.yml          # Automated 6-hour cron workflow for GitHub API sync
├── public/
│   ├── icons/                       # WebP brand logos, favicon, and country flags
│   ├── ai-catalog.json              # Structured manifest for autonomous AI agents
│   ├── llms.txt                     # Semantic dataset documentation for LLM ingestion
│   ├── robots.txt                   # Crawler directives
│   └── sitemap.xml                  # SEO URL index
├── scripts/
│   ├── curated-lists/               # Target technology definitions and metadata
│   ├── fetch-languages.ts           # GitHub Search API crawler for languages
│   ├── fetch-frameworks.ts          # GitHub Search API crawler for frameworks
│   ├── fetch-databases.ts           # GitHub Search API crawler for databases
│   └── fetch-security-tools.ts      # GitHub Search API crawler for security tools
├── src/
│   ├── components/
│   │   ├── HeaderShowcase.tsx       # 3-column blueprint hero showcase card
│   │   ├── TechTable.tsx            # Modern fintech table with search, sort & drawers
│   │   ├── SegmentedProgressBar.tsx # 20-capsule segmented metric bar
│   │   ├── TechBar.tsx              # Standalone tech card component
│   │   ├── Navbar.tsx               # Navigation bar with search shortcut & theme toggle
│   │   ├── Footer.tsx               # Dynamic last-updated footer with GitHub star CTA
│   │   ├── SearchModal.tsx          # Keyboard-navigable quick search modal (Ctrl+K)
│   │   ├── LanguageSwitcher.tsx     # Instant language switcher with preloaded WebP flags
│   │   ├── ProximitySidebar.tsx     # Quick section anchor sidebar
│   │   ├── ScrollToTopButton.tsx    # Smooth scroll-to-top floating button
│   │   ├── InitialViewportVignette.tsx # First-visit session depth atmospheric vignette
│   │   ├── Skeleton.tsx             # Sunken well skeleton loader with metallic sheen
│   │   ├── ui/
│   │   │   └── skeleton.tsx         # Primitive Skeleton components (Block, Text, Circle, Swap)
│   │   └── CardSkeleton.tsx         # High-fidelity card shimmer loading skeleton
│   ├── data/                        # Static synced datasets (languages, frameworks, etc.)
│   ├── hooks/
│   │   ├── useGitHubContributors.ts # Contributor avatar resolver with fallback cache
│   │   └── useTheme.ts              # Dark/light theme state manager
│   ├── i18n/                        # 9 localization dictionaries (en, tr, de, fr, es, it, pt, ru, zh)
│   ├── lib/
│   │   └── sanitize.ts              # DOMPurify text and URL sanitization helpers
│   ├── pages/
│   │   ├── SoftwarePage.tsx         # Main software ecosystem page (6 category tables)
│   │   └── SecurityPage.tsx         # Cybersecurity tools & SecOps page (2 category tables)
│   ├── types/
│   │   └── tech.ts                  # Core TypeScript interfaces for technologies & metrics
│   ├── App.tsx                      # Application root and route configuration
│   ├── main.tsx                     # React DOM entry point
│   └── index.css                    # Tailwind CSS directives and custom styling tokens
├── tests/
│   ├── TechTable.test.tsx           # Unit tests for fintech table filtering and expansion
│   ├── TechBar.test.tsx             # Unit tests for technology row rendering
│   ├── Skeleton.test.tsx            # Unit tests for skeleton loaders and fallback states
│   └── setup.ts                     # Jest DOM test environment setup
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Data Pipeline & Architecture

DevSec Status avoids client-side GitHub API rate limits (60 requests/hour unauthenticated) by employing a **Static Build Data Sync** pattern:

```mermaid
flowchart LR
    A[GitHub Actions Cron<br/>Every 6 Hours] -->|Executes| B[Fetch Scripts<br/>tsx scripts/fetch-*.ts]
    B -->|Authenticated Request| C[GitHub Search API]
    C -->|Stars, Repos, 30d Velocity| B
    B -->|Saves & Commits| D[Static Datasets<br/>src/data/*.json]
    D -->|Zero-Latency Import| E[React Frontend<br/>Production Client]
```

1. **Scheduled Sync**: A GitHub Actions workflow triggers every 6 hours (`0 */6 * * *`).
2. **API Query**: `scripts/fetch-*.ts` requests repository search metrics, stars, and creation velocity using `GITHUB_TOKEN`.
3. **Commit & Push**: Updated metrics are verified and committed back to `src/data/*.json`.
4. **Instant Client Delivery**: Users receive data immediately from static files with 0 ms API delay and 100% uptime.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher recommended)
- [pnpm](https://pnpm.io/) (version 10.x recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sercanvr/devsec-status.git
   cd devsec-status
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables (Optional for local data fetching)**:
   Create a `.env` file in the project root if you wish to run the data collection scripts locally:
   ```env
   GITHUB_TOKEN=ghp_your_personal_access_token_here
   ```
   *(Note: The web application itself runs entirely without environment variables as it reads from the pre-populated datasets).*

4. **Start the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Vite local development server with hot module replacement (HMR) |
| `pnpm build` | Type-checks with `tsc` and builds production bundle to `dist/` |
| `pnpm preview` | Serves the production build locally for verification |
| `pnpm lint` | Performs strict TypeScript type checks across all `.ts` and `.tsx` files |
| `pnpm test` | Runs the Vitest test suite once |
| `pnpm run fetch:data` | Executes all 4 data crawlers to refresh static JSON files from GitHub |

---

## Testing

The project uses [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration testing.

To execute tests:
```bash
pnpm test
```

---

## Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions to **DevSec Status** are greatly appreciated!

### How You Can Contribute

- **Add New Technologies / Tools**: Add missing languages, frameworks, databases, security tools, or AI stacks to `src/data/*.json`.
- **Translations (i18n)**: Help refine translations or add new languages in `src/i18n/`.
- **UI / UX & Performance**: Propose design polish, mobile responsive improvements, or Core Web Vitals optimizations.
- **Bug Reports & Ideas**: Open an issue on [GitHub Issues](https://github.com/sercanvr/devsec-status/issues).

### Adding a New Technology or Security Tool

To propose a new technology entry in `src/data/<category>.json`:

1. Ensure the project is open-source with an active public GitHub repository.
2. Add a new object conforming to the `TechEntry` schema:
   ```json
   {
     "id": "unique-slug",
     "name": "Technology Name",
     "category": "CATEGORY_TAG",
     "subCategory": "Subcategory Name",
     "iconUrl": "https://msercanvar.sirv.com/devsec-status-images/...",
     "githubUrl": "https://github.com/org/repo",
     "creator": {
       "name": "Creator or Org",
       "avatarUrl": "https://avatars.githubusercontent.com/...",
       "type": "organization",
       "releaseDate": "YYYY",
       "latestVersion": "vX.Y.Z"
     },
     "popularity": {
       "totalRepos": 0,
       "totalStars": 0
     },
     "momentum": {
       "newReposLast30Days": 0,
       "topStarredNewRepo": null
     },
     "lastUpdated": "2026-01-01T00:00:00.000Z"
   }
   ```
3. Run `pnpm test` to verify dataset integrity and test suites.

### Contribution Workflow

1. **Fork** the repository.
2. **Create a feature branch**:
   ```bash
   git checkout -b feat/add-new-tool
   ```
3. **Make your changes** following Clean Code principles and strict TypeScript typing.
4. **Run tests**:
   ```bash
   pnpm test
   ```
5. **Commit your changes** adhering to [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat(data): add new technology entry"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feat/add-new-tool
   ```
7. **Open a Pull Request** against `main` with a clear explanation of your additions.

---

## Contributors

Thank you to everyone who helps improve DevSec Status! Contributions of all kinds are credited directly in GitHub's official [Contributors](https://github.com/sercanvr/devsec-status/graphs/contributors) graph.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 **Sercan Var**.
