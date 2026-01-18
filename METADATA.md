# Project Metadata Fields

This document defines the metadata fields used by the project content files in
the `projects/` directory and the corresponding TypeScript types consumed by
the application.

---

## File structure

project.json file contains:
1. JSON object with structured metadata.
2. **Markdown body** describing the project (long-form content).

Example:

```yaml
---
{
  "id": "project-id",
  "title": "Project Title",
  "category": "Peptide",
  "partner": "University of Washington",
  "imageUrl": "images/project-id.png",
  "publishedDate": "2025-09-29",
  "featured": true,
  "tags": ["peptide design", "drug discovery"],
  "target": { "name": "EphA2", "pdb": "2X10" },
  "proteins": [{ "name": "ZETA_1", "pdb": "3PBJ" }],
  "metrics": { "Binding affinity": "25 nM", "Success rate": "91%" },
  "links": [{ "label": "Paper", "href": "https://example.com" }]
}
---

## Summary

One-paragraph summary shown in cards.

## Detailed Description

Longer project write-up for the detail page.
```

## Field reference

### Core identifiers

#### `id` (string) — **required**
Unique identifier for the project. Used for routing and file naming.

- **Format:** kebab-case
- **Used by:** routes (`/projects/{id}`), image default pathing, keys
- **Example:** `"zeta-2024"`, `"ph-binder-tnfr2-2025"`

---

### Display fields

#### `title` (string) — **required**
Human-readable project title.

- **Used by:** cards and project detail header
- **Example:** `"pH-Activated Peptide Binders for TNFR2"`

#### `category` (string) — **required**
Classification of the computational design project.

- **Allowed values:** `"Enzyme"`, `"Peptide"`, `"Biosensor"`
- **Used by:** filtering, badge display
- **Example:** `"Peptide"`

#### `partner` (string) — **required**
Research institution or organization collaborating on the project.

- **Used by:** cards, project header, filters (optional)
- **Example:** `"Stanford University"`

#### `imageUrl` (string) — **required**
Relative path to the project's representative image (served from `/public`).

- **Format:** `"images/{project-id}.png"` (or `.jpg`, `.webp`)
- **Used by:** cards and hero image
- **Example:** `"images/zeta-2024.png"`

#### `publishedDate` (string) — **required**
Publication or completion date.

- **Formats:** `"YYYY"` or `"YYYY-MM-DD"`
- **Used by:** sorting (newest/oldest), display
- **Example:** `"2024"`, `"2025-09-29"`

#### `featured` (boolean) — optional
Marks a project as curated/featured.

- **Used by:** `/showcase` route (featured-only)
- **Example:** `true`

#### `tags` (string[]) — **required**
Keywords and categories associated with the project.

- **Used by:** search, tag display, tag filtering (optional)
- **Examples:**  
  `["peptide design", "drug discovery"]`  
  `["GPCR", "antiviral"]`

---

### Structural data

#### `target` (object) — **required**
Target molecule/protein that the designed proteins bind to or interact with.

Fields:
- `name` (string) — required  
- `pdb` (string | null) — optional/nullable

Guidelines:
- Use `null` when a PDB structure is unavailable or not applicable (e.g., small molecules).
- For PDB entries, use the 4-character RCSB ID.

Example:

```json
"target": { "name": "EphA2", "pdb": "2X10" }
```

#### `proteins` (array) — **required**
List of designed proteins (or relevant proteins) referenced by the project.

Each entry contains:
- `name` (string) — required
- `pdb` (string | null) — nullable

Example:

```json
"proteins": [
  { "name": "ZETA_1", "pdb": "3PBJ" },
  { "name": "K-Ras", "pdb": "8T71" }
]
```

---

### Performance / evaluation

#### `metrics` (object) — **required**
Quantitative measurements or key performance indicators.

- Keys are **free-form strings** (e.g., `"Binding affinity"`, `"RMSD"`).
- Values are strings intended for human display.
- The UI may surface these values in the MetaPanel.

Suggested common fields:
- `Binding affinity` (string): `"41 nM"`, `"100 pM"`
- `Success rate` (string): `"91%"`
- `RMSD` (string): `"2.2-4.3 Å"` or `"1.1-1.9 Å"`

Example:

```json
"metrics": {
  "Binding affinity": "25 nM",
  "Success rate": "91%",
  "RMSD": "2.6-2.79 Å"
}
```

---

### Links

#### `links` (array) — optional
External references for the project (paper, dataset, code, blog post).

Each link contains:
- `label` (string): Display label, e.g. `"Paper"`, `"Dataset"`
- `href` (string): Absolute URL

Example:

```json
"links": [
  { "label": "Paper", "href": "https://example.org/paper" },
  { "label": "Dataset", "href": "https://example.org/data" }
]
```

---

### Description content

#### `description` (string) — **required**
Markdown string used on the detail page (and optionally as a summary/snippet).

Authoring guidance:
- Start with a short summary paragraph (first paragraph is ideal for cards/snippets).
- Use headings like `## Detailed Description`, `## Methods`, `## Results` for structure.
- Avoid HTML unless you explicitly support it in the markdown renderer.

> If you store the markdown body **outside** frontmatter (recommended),
> `description` may be derived by the loader instead of duplicated in frontmatter.
> Keep the approach consistent across all project files.

---

## Notes and conventions

### PDB identifiers
- RCSB structure page: `https://www.rcsb.org/structure/WXYZ`
- mmCIF download: `https://files.rcsb.org/download/WXYZ.cif`

Use `null` for PDB fields when structures are not available (e.g., small molecules,
unpublished designs, or mock projects).

### Recommended controlled vocabularies
To keep filtering clean, consider restricting:
- `category` to the allowed enum values.
- `tags` to a curated set (lowercase, short phrases).

---

## TypeScript types (source of truth)

These reflect the expected in-app data shape:

```ts
export type ProjectCategory = 'Enzyme' | 'Peptide' | 'Biosensor';

export type ProjectTarget = {
  name: string;
  pdb: string | null;
};

export type ProjectProtein = {
  name: string;
  pdb: string | null;
};

export type ProjectMetrics = Partial<{
  'Binding affinity': string;
  'Success rate': string;
  RMSD: string;
}> &
  Record<string, string>;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  partner: string;
  imageUrl: string;
  /** "YYYY" or "YYYY-MM-DD" */
  publishedDate: string;
  featured?: boolean;
  tags: string[];
  target: ProjectTarget;
  proteins: ProjectProtein[];
  metrics: ProjectMetrics;
  /** Markdown string used on the detail page */
  description: string;
  links?: ProjectLink[];
};
```
