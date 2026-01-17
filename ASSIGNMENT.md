# Latent Labs Frontend Engineering Take Home Task

## Protein Design Showcase Gallery

### Task overview

Build a web application that showcases successful protein design projects and
use cases powered by Latent Labs' platform. It should do this through a gallery
that demonstrates the platform's capabilities in generating lab-ready protein
structures for drug discovery and therapeutic applications.

### Background on proteins

Proteins are molecules formed of a chain of amino acids, which are small
molecular building-blocks. This sequence is typically represented as a sequence
of letters, where each corresponds to one of 20 types of amino acid. For
example, “GGEVLT” describes a very short protein with 6 amino acids, but most
proteins will have tens to thousands of amino acids. These chains fold up into
3D structures that allow proteins to perform unique functions. Visualising their
sequence and structure is important for scientists to understand their function.
For this reason the field has produced many visualisers for proteins that are
able to show various views of the structure and sequence. These viewers often
operate on standardised formats such as mmCIF for storing the sequence and
structure together. You may find these files, and view them directly in the
Protein Data Bank which organises them by unique PDB identifiers, e.g.
[9UJK](https://www.rcsb.org/3d-view/9UJK/1).

In this task you are expected to visualise protein structures, but you are not
expected to write or fully understand this visualisation or data format
yourself. Instead, we recommend integrating [Mol\*](https://molstar.org/)
([https://github.com/molstar/molstar](https://github.com/molstar/molstar)),
which can be pointed directly to mmCIF files (file extension: ‘.cif’).

## Core Requirements

Please write any front-end code in TypeScript. Beyond this you are free to
choose the best technology and frameworks for the task.

### Gallery Interface

* **Two gallery pages with similar style:**
  * *Showcase*: shows a featured set of projects curated by Latent Labs.
  * *Explore*: shows all projects.
* **Grid Layout**: Responsive card-based gallery displaying protein design projects
* **Project Cards**: Each card should include:
  * Project thumbnail
  * Project title and brief description
  * Additional metadata for each project (you have artistic freedom here,
    and may impose some limits on what is shown)

### Filtering & Search

* **Filter and sort by:** metadata
* **Search**: free form text search

### Project Detail Views

* **Detail Page**: Clicking a project opens detailed view showing:
  * An interactive visualisation of the 3D protein structure (mol\*)
  * Detailed project description and methodology
  * Metadata about the project
  * Research organisation information
  * Links to publications or case studies

### UI and UX

* **Responsive design:** desktop and mobile
* **Navigation**
  * Proper loading states
  * Smooth transitions and micro-interactions
  * Keyboard navigation
* **Design**
  * Modern, scientific aesthetic
  * Clean typography
  * Latent Labs color theme

### Project data

* **Storage:** Store the data on all projects in a static public folder together
  with the source code. You may choose how you format this data.
* **Adding projects:** Users of the latent labs platform should be able to
  easily submit new projects to the gallery, by creating PRs to the repo.

## Mock Projects

Together with this assignment you will receive a number of prepared mock
[projects](./projects/) for use with the showcase application. You are welcome
to format this content in the best way possible to achieve the task.
`METADATA.md` describes the current metadata fields, please update it if you
make any changes.

## Evaluation Criteria

We will be evaluating your submission along the following pillars:

* Functionality
* Code quality and technical architecture
* Design
* User experience
* Performance
* Mobile compatibility
* Bonus features

**We do not expect you to deep dive into all pillars.** Once you have the core
functionality working, please choose 1 or 2 pillars where you'd like to
demonstrate excellence. In your README.md, clearly indicate which pillars you
focused on and describe your approach and explain the additional value of these
to the application.

## Deliverables

1. **Source code archive**: complete, runnable application. Include:
   1. `.git` with the history (optional)
   2. Example projects
   3. `README.md`: Description of your solution, including
      a. Setup instructions
      b. Suggested method of deployment (high-level)
      c. Front-end architecture and technology decisions
      d. Known limitations or future improvements
      e. Instructions for adding new projects
      f. Details on your chosen pillars
      g. Sources and inspiration
    4. `METADATA.md`: Updated document describing the metadata fields.

## Time Guidelines

**Recommended Time**: 4-6 hours

Focus on:

1. **Core functionality first**: Gallery, filtering, basic interactions
2. **Polish second**: Animations, advanced features, optimisations
3. **Quality over quantity**: Better to have fewer features working perfectly

## Process

We love to see your own creative solution in code and design, but we also value
drawing inspiration from other sources. If you take inspiration from others,
please properly attribute your sources.

Should you move forward in the process, we will schedule a pair coding session
where you work with one of our engineers to extend the functionality of the
application you built.

## Questions?

Feel free to make reasonable assumptions about requirements. Document any major
decisions or assumptions in your README.

**Good luck, and thank you for taking the time to work on the home assignment\!
*We're excited to see your interpretation of a protein design showcase.**
