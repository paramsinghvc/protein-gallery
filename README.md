# Protein Design Showcase (Latent Labs Protein Gallery)

A lightweight, metadata-driven gallery for protein design projects built with **Next.js App Router**.  
It supports:

- **Showcase** (featured projects)
- **Explore** (search, filter, sort)
- **Project detail** pages (Markdown overview + metadata panel)
- **3D structure viewing** via **Mol\*** (Molstar)

---

## Contents

- [Setup instructions](#setup-instructions)
- [Suggested deployment](#suggested-deployment)
- [Front-end architecture and technology decisions](#front-end-architecture-and-technology-decisions)
- [Project structure](#project-structure)
- [Adding new projects](#adding-new-projects)
- [Metadata](#metadata)
- [Chosen pillars](#chosen-pillars)
- [Known limitations and future improvements](#known-limitations-and-future-improvements)
- [Sources and inspiration](#sources-and-inspiration)

---

## Setup instructions

### Prerequisites
- Node.js **18+** (recommended: latest LTS)
- npm / pnpm / yarn / bun

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

Open:
- http://localhost:3000

### Production build
```bash
npm run build
npm start
```

### Environment variables
This project is designed to run without required env vars.  

---

## Suggested deployment

### Vercel (recommended)
**High-level approach**
1. Push the repo to GitHub/GitLab.
2. Import into Vercel.
3. Vercel auto-detects Next.js and builds with `next build`.
4. Deploy.


### Docker (alternative)
**High-level approach**
1. Use a multi-stage build Dockerfile.
2. Build the Next.js app in the builder stage.
3. Serve with `next start` in the runtime stage.
4. Run behind a reverse proxy (Caddy/Nginx) if you need TLS + caching.

---

## Front-end architecture and technology decisions

### Next.js App Router
- Uses **Server Components** by default for route pages (fast initial render, minimal client JS).
- Uses **Client Components** for interactive areas:
	- Search/filter UI
	- Framer Motion animations
	- Mol* viewer integration

### Tailwind CSS
- Utility-first styling for rapid iteration and consistent spacing.
- Uses a small set of CSS custom properties for a clean, neutral design system.

### Typography
- Uses **Next.js `next/font`** for optimized font loading.
- Default font: **Plus Jakarta Sans** (chosen for modern, rounded scientific UI readability).

### Framer Motion
- Used for smooth reflow animations on filtering (layout transitions).
- Motion is kept **layout-safe**: hover effects do not change card dimensions (prevents layout thrash).

### Mol* / Molstar
- Project pages optionally render a 3D structure viewer.
- Loaded via `dynamic(..., { ssr: false })` to avoid SSR/hydration issues and keep bundles lighter on initial load.

### Data model: metadata-first
- Projects are loaded from local content (e.g., markdown with frontmatter or structured JSON).
- Filtering and sorting are **pure functions** (`filterProjects`) driven by metadata fields.
- See [METADATA.md](./METADATA.md) for the authoritative schema.

---

## Project structure

Typical structure (may vary slightly depending on your repo layout):

```txt
app/
	page.tsx                    # redirects or home
	explore/
		page.tsx                  # loads all projects; renders ExploreClient
		ExploreClient.tsx         # client-side search/filter/sort UI
		components/               # SearchBar, FilterBar, Select, etc.
	showcase/
		page.tsx                  # loads featured projects; reuses ExploreClient
	projects/
		[id]/page.tsx             # detail page for a project
components/
	gallery/
		GalleryGrid.tsx
		ProjectCard.tsx
	Markdown.tsx                # markdown renderer (react-markdown + typography)
	MetaPanel.tsx               # metadata panel
	MolstarViewer.tsx           # Mol* viewer wrapper (client)
utils/
	loadProjects.ts
	filterProjects.ts
public/
	images/                     # project images
	data/
		projects.json       # projects data
```

---

## Adding new projects

Projects are intended to be **metadata-driven** so they can be displayed consistently across:

- `/explore` (search/filter/sort)
- `/showcase` (featured subset)
- `/projects/[id]` (detail view)

### Step-by-step

1. **Create a new project entry**
	 - Add a new entry in the projects array inside `public/data/projects.json`.
	 - Use the required metadata format described in [METADATA.md](./METADATA.md).

2. **Add a project image**
	 - Place an image in `public/images/`.
	 - Reference it from metadata as `imageUrl: "images/<project-id>.png"` (or `.jpg`, etc.).

3. **Ensure unique `id`**
	 - `id` must be unique and stable (kebab-case recommended).
	 - The `id` becomes the route: `/projects/<id>`.

4. **(Optional) Mark as featured**
	 - Set `featured: true` in metadata to appear on `/showcase`.

5. **Validate locally**
	 - Run the app and check:
		 - `/explore` search and filters behave as expected.
		 - `/projects/<id>` loads correctly.
		 - Images resolve and render crisply.

### Recommended authoring pattern
- Put the short summary at the top of the description (first paragraph).
- Use H2 headings like `## Detailed Description`, `## Methods`, `## Results` for the full page.
- Keep tags consistent (prefer a controlled vocabulary).

---

## Metadata

The metadata schema is documented in **METADATA.md**.

At a high level, metadata is used for:
- Routing (`id`)
- Grouping (`category`)
- Display (`title`, `partner`, `publishedDate`, `imageUrl`)
- Discovery (`tags`, `target`, `proteins`, `metrics`)
- Curation (`featured`)

If you change schema fields, update:
- `METADATA.md`
- Types in `types/project.ts`
- The project loader (`utils/loadProjects.ts`)
- Any UI that relies on those fields (e.g., filters)

---

## Chosen pillars

This solution prioritizes four pillars:

### 1) Metadata-first design
Projects are discoverable and composable because the UI is driven by structured data rather than bespoke page layouts.

### 2) Usability and clarity
Search, filtering, and sorting are front-and-center. Layout is calm, readable, and optimized for scanning project lists quickly.

### 3) Performance by default
- Server components for initial render where possible.
- Client JS only where needed (filters, animations, Mol*).
- Dynamic import of Mol* to avoid heavy viewer code on list pages.

### 4) Maintainability and extensibility
- Small, focused components (SearchBar / FilterBar / Select).
- Pure utility functions for filtering/sorting.
- Clear schema documentation in `METADATA.md` to keep changes consistent.

---

## Known limitations and future improvements

### Known limitations
- **Filtering UI** currently supports category and sort out of the box; partner/tag filters can be added easily but may require a controlled vocabulary to remain clean.
- **Masonry**: CSS grid + layout animations approximate a masonry feel but are not a true masonry algorithm.
- **Mol***: viewer loads remote mmCIF files from RCSB; offline support requires bundling structures or a proxy.
- **Markdown rendering**: if project descriptions include non-standard markdown or embedded HTML, behavior depends on markdown configuration and sanitization policy.

### Future improvements
- URL-synced filters (e.g., `?q=...&category=...&sort=...`) for shareable searches
- Multi-select tag filters with chip UI
- Virtualized grid for very large catalogs (1000+ projects)
- Generate `projects.json` at build time for faster loads and static hosting
- Improve metadata validation (Zod schema + CI checks)
- Add unit tests for `filterProjects` + metadata loader
- Add “Related projects” recommendations based on tags/categories

---

## Sources and inspiration

- **Next.js App Router** patterns and `next/font` best practices (Next.js documentation)
- **Tailwind CSS** conventions for utility-based UI systems
- **Framer Motion** layout animations for smooth filtering transitions
- **Mol\*** structure viewer project and documentation

If you used additional external assets (icons, images, datasets), list them here with license notes.

---

## Example projects

This archive includes a set of example projects so the UI can be evaluated immediately.
Look in the `public/data/projects.json` directory and `public/images/` for sample content.

---

## Notes on repository packaging

Deliverables expected by the assignment:
- Complete runnable source code archive
- Example projects included
- This `README.md`
- Updated `METADATA.md` describing metadata fields

Git history (`.git/`) may be included optionally depending on submission guidelines.
