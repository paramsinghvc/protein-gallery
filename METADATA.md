# Project Metadata Fields

This document describes the metadata fields used in the project markdown files
located in the `projects/` directory.

## File Structure

Each project file contains YAML frontmatter with structured metadata, followed
by markdown content describing the project.

```yaml
---
{
  "id": "project-id",
  "category": "Category Name",
  ...
}
---

# Project Title
...
```

## Metadata Fields

### Core Identifiers

#### `id` (string)
Unique identifier for the project. Uses kebab-case format.
- Example: `"zeta-2024"`, `"pH-binder-2025"`

#### `category` (string)
Classification of the computational design project.
- Values: `"Enzyme"`, `"Peptide"`, `"Biosensor"`

### Project Details

#### `partner` (string)
Research institution or organization collaborating on the project.
- Example: `"University of Washington"`, `"Stanford University"`

#### `imageUrl` (string)
Relative path to the project's representative image.
- Format: `"images/{project-id}.png"`
- Example: `"images/zeta-2024.png"`

#### `publishedDate` (string)
Publication or completion date of the project.
- Format: `"YYYY"` or `"YYYY-MM-DD"`
- Example: `"2024"`, `"2025-09-29"`

#### `tags` (array of strings)
Keywords and categories associated with the project.
- Common tags: `"enzyme design"`, `"peptide design"`, `"drug discovery"`,
               `"GPCR"`, `"antiviral"`, `"biosensor"`
- Example: `["peptide design", "drug discovery"]`

### Structural Data

#### `target` (object)
Target molecule or protein that the designed proteins bind to or interact with.

The target object contains:
- `name` (string): Name of the target molecule/protein
- `pdb` (string or null): PDB (Protein Data Bank) identifier
  - Use `null` for small molecules or unavailable structures

Example:
```json
"target": {
  "name": "EphA2",
  "pdb": "2X10"
}
```

#### `proteins` (array of objects)
List of designed proteins or related proteins in the study.

Each protein object contains:
- `name` (string): Name or identifier of the protein
- `pdb` (string or null): PDB identifier for the protein structure
  - Use `null` for unavailable structures

Example:
```json
"proteins": [
  {
    "name": "ZETA_1",
    "pdb": "3PBJ"
  },
  {
    "name": "K-Ras",
    "pdb": "8T71"
  }
]
```

### Performance Metrics

#### `metrics` (object)
Quantitative performance measurements for the designed proteins.

Standard fields:
- `Binding affinity` (string): Measured binding affinity of the designed
  proteins/peptides
  - Format: Numerical value followed by unit (nM, pM)
  - Example: `"41 nM"`, `"100 pM"`

- `Success rate` (string): Percentage of successful designs
  - Format: `"{percentage}%"`
  - Example: `"91%"`, `"40%"`

- `RMSD` (string): Root Mean Square Deviation in Ångströms
  - Format: `"{min}-{max} Å"`
  - Measures structural similarity between designed and predicted structures
  - Example: `"2.2-4.3 Å"`, `"1.1-1.9 Å"`

Example:
```json
"metrics": {
  "Binding affinity": "25 nM",
  "Success rate": "91%",
  "RMSD": "2.6-2.79 Å"
}
```

## Notes

- PDB identifier WXYZ can be found at https://www.rcsb.org/structure/WXYZ and
  its `mmCIF` file at https://files.rcsb.org/download/WXYZ.cif
- Use `null` for PDB fields when structures are not available (small molecules,
  unavailable structures)
- In reality we would likely not find the designed proteins in PDB, as these
  would be completely novel, these are just for mocking projects.
