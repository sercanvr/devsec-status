# Contributing to DevSec Status

First off, thank you for considering contributing to **DevSec Status**! 🎉  
DevSec Status is an open-source project tracking developer adoption and momentum metrics across programming languages, frameworks, databases, AI systems, and security tools.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Suggesting a Technology](#suggesting-a-technology)
  - [Adding a Technology via Pull Request](#adding-a-technology-via-pull-request)
  - [Refining Translations (i18n)](#refining-translations-i18n)
  - [Reporting Bugs & Improvements](#reporting-bugs--improvements)
- [Architecture & Data Synchronization](#architecture--data-synchronization)
- [Adding a Technology: Data Guidelines](#adding-a-technology-data-guidelines)
  - [Minimal Entry Schema](#minimal-entry-schema)
  - [Icon Guidelines](#icon-guidelines)
  - [Creator & Avatar Guidelines](#creator--avatar-guidelines)
- [Development Workflow](#development-workflow)
  - [Setting Up Locally](#setting-up-locally)
  - [Running Tests](#running-tests)
  - [Branch Naming & Conventional Commits](#branch-naming--conventional-commits)
  - [Submitting a Pull Request](#submitting-a-pull-request)

---

## Code of Conduct

Please maintain a welcoming, respectful, and constructive environment for everyone.

---

## How Can I Contribute?

### Suggesting a Technology

If you would like a new open-source technology, security tool, or AI framework to be tracked on DevSec Status, you don't even need to write code! Simply open an issue using the [Suggest a Technology Issue Template](https://github.com/sercanvr/devsec-status/issues/new?template=suggest_technology.yml).

### Adding a Technology via Pull Request

If you'd like to add the technology directly via a Pull Request:
1. Locate the appropriate category dataset in `src/data/<category>.json`.
2. Add a new entry conforming to the schema described below.
3. You do **not** need to manually calculate stars, repository volume, or 30-day velocity. The automated GitHub Actions cron workflow (`.github/workflows/update-data.yml`) updates these metrics every 6 hours using the GitHub API.

### Refining Translations (i18n)

DevSec Status supports 9 languages (EN, TR, DE, FR, ES, IT, PT, RU, ZH). Current translations were initialized with AI assistance; native speakers are warmly encouraged to refine technical phrasing and terminology in `src/i18n/<locale>.json`.

### Reporting Bugs & Improvements

Found a UI discrepancy, responsiveness issue, or bug? Feel free to open an issue on [GitHub Issues](https://github.com/sercanvr/devsec-status/issues).

---

## Architecture & Data Synchronization

DevSec Status serves data as static JSON from Vercel's Edge CDN to prevent client-side GitHub API rate limits (HTTP 403) and external query latency.

- **Master Datasets**: Stored in `src/data/*.json`.
- **Scheduled Sync**: Every 6 hours, GitHub Actions executes `pnpm run fetch:data`, requesting updated star counts, repository totals, and momentum velocity from GitHub Search API.
- **Client Bundle**: Vite bundles the static JSON into the production client.

---

## Adding a Technology: Data Guidelines

### Minimal Entry Schema

Add an object to the array in `src/data/<category>.json`:

```json
{
  "id": "fastapi",
  "name": "FastAPI",
  "category": "framework",
  "subCategory": "High-Performance Modern Web Framework for Python",
  "iconUrl": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "githubUrl": "https://github.com/fastapi/fastapi",
  "creator": {
    "name": "Sebastián Ramírez",
    "avatarUrl": "https://github.com/tiangolo.png",
    "type": "person",
    "releaseDate": "2018",
    "latestVersion": "v0.115.0"
  },
  "popularity": {
    "totalRepos": 0,
    "totalStars": 0
  },
  "momentum": {
    "newReposLast30Days": 0,
    "topStarredNewRepo": null
  },
  "lastUpdated": "2026-10-13T00:00:00.000Z"
}
```

#### Allowed Field Values

- **`category`** must be one of:
  - `language`, `superset`, `query-language`
  - `framework`, `library`, `css-framework`, `runtime`
  - `rdbms`, `nosql`, `search-engine`, `baas`
  - `security-tool`, `security-framework`
  - `linux-distro`
  - `ai-tool`, `ai-infrastructure`
- **`creator.type`** must be either `"person"` or `"organization"`.

> **Note**: Initialize `popularity` and `momentum` with zeroes as shown above. The scheduled GitHub Actions crawler will calculate and populate real-time metrics automatically.

### Icon Guidelines

- **Primary Source**: Use official SVG vector icons from [Devicon CDN](https://devicon.dev/) (`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/...`) or [SimpleIcons](https://simpleicons.org/) (`https://cdn.simpleicons.org/...`).
- **Local Assets**: You may also reference project icons under `/icons/<name>.webp`.
- **Fallback**: If an external icon fails to load, the UI automatically renders a fallback GitHub SVG icon.

### Creator & Avatar Guidelines

- For organizations or authors with active GitHub profiles, use their official GitHub avatar URL:  
  `https://github.com/<username-or-org>.png`
- Avatars must use HTTPS and come from verified allowlisted hosts (`github.com`, `avatars.githubusercontent.com`, `cdn.jsdelivr.net`, or `cdn.simpleicons.org`). Protocol-relative URLs (`//evil.com`) or unauthorized domains are automatically blocked by our CI data integrity test.

---

## Development Workflow

### Setting Up Locally

```bash
# 1. Clone the repository
git clone https://github.com/sercanvr/devsec-status.git
cd devsec-status

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm dev
```

### Running Tests

```bash
pnpm test
```

The test suite validates:
1. **Dataset Integrity**: Verifies that all 8 JSON files exist, have valid non-empty arrays, contain all required fields, and have unique IDs across the entire project.
2. **Component Rendering**: Validates skeleton placeholders, card structures, and table elements.
3. **Metric Bars**: Tests 20-segment popularity capsule calculations and safe link handling.

### Branch Naming & Conventional Commits

- Create a descriptive branch from `main`:
  - `feat/add-<technology>`
  - `fix/translation-<lang>`
  - `docs/update-readme`
- Commit messages should follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(data): add Bun to runtime and framework dataset`
  - `fix(i18n): improve German translations for table headers`

### Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request targeting `main`.
3. Complete the brief checklist in the PR template.
4. Maintainers will review and merge!
