# Contributing to the Optics Textbook

Thanks for your interest in improving the Optics Textbook! This project combines MyST Markdown content, Node.js tooling, and PWA features. Thoughtful contributions—whether fixing typos, polishing diagrams, or enhancing scripts—help students and educators worldwide.

This guide covers the expectations and workflows for contributors. Please read it fully before opening a pull request.

---

## Table of Contents

1. [Project Expectations](#project-expectations)
2. [Ways to Contribute](#ways-to-contribute)
3. [Prerequisites and Environment Setup](#prerequisites-and-environment-setup)
4. [Development Workflow](#development-workflow)
5. [Content and Style Guidelines](#content-and-style-guidelines)
6. [Figures and Media](#figures-and-media)
7. [Tooling & Code Changes](#tooling--code-changes)
8. [Commit Messages & Pull Requests](#commit-messages--pull-requests)
9. [Getting Help](#getting-help)
10. [Code of Conduct](#code-of-conduct)
11. [License](#license)

---

## Project Expectations

- **Read the docs first.** Skim the resources below before changing files:
- `README.md` – project overview and quick commands
- `doc/MAINTENANCE.md` – detailed workflows and troubleshooting
- `doc/MYST_CONVENTIONS.md` – required MyST syntax and accessibility rules
- `doc/CLAUDE.md` – guidance for AI assistants contributing to this repo
- **Match existing conventions.** Follow directory layout, naming schemes, and MyST directives already in use.
- **Validate everything.** The automated tooling expects clean linting, reference integrity, and a successful build before a PR is reviewed.

---

## Ways to Contribute

- **Content improvements:** Clarify explanations, fix typos, add examples, or expand problem sets in `content/`.
- **Figures & images:** Update diagrams, improve accessibility, or replace outdated graphics in `content/ChapXX.../Images/`.
- **Tooling & scripts:** Enhance utilities inside `scripts/` (Node.js) that automate validation, builds, or image processing.
- **Documentation:** Improve guides such as `README.md`, `doc/MAINTENANCE.md`, or this file.
- **Tests & validation:** Strengthen unit tests (`scripts/tests/`) or add new checks for references and figures.

If you’re unsure where to start, look for issues labeled **good first issue**, **documentation**, or **help wanted**.

---

## Prerequisites and Environment Setup

| Requirement | Recommended Version | Notes |
| ----------- | ------------------- | ----- |
| Node.js | 18+ LTS | Needed for MyST tooling, linting, build, and PWA scripts |
| npm | 9+ | Installed with Node |
| Git | Latest stable | Standard distributed workflow |
| LaTeX toolchain | texlive-xetex, latexmk | Required for PDF generation (`npm run build`) |

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/opticsTextbook.git
cd opticsTextbook

# Install Node dependencies
npm install
```

### Helpful Scripts

- `npm run start` – local dev server with live reload at http://localhost:3000
- `npm run build` – full build (image optimization → exports → HTML → PWA)
- `npm run lint:fix` – auto-fix common MyST and formatting issues
- `npm run validate` – validate references, citations, labels
- `npm test` – run Jest unit tests

### Content Quality Tools

- `npm run lint:spell` – check spelling across content (uses cspell with optics dictionary)
- `npm run lint:grammar` – check grammar and style suggestions (uses write-good)
- `npm run validate:alt-text` – check images have alt text for accessibility

---

## Development Workflow

1. **Discuss or self-assign an issue.** Comment on an open issue or open a new one describing the problem you plan to solve.
2. **Create a feature branch.**
   ```bash
   git checkout -b feature/<short-description>
   ```
3. **Make focused changes.** Keep PRs scoped to a single topic so reviews stay fast.
4. **Run required checks locally.**
   ```bash
   npm run lint:fix
   npm run validate
   npm run build
   npm test  # run Jest unit tests
   ```
5. **Review the diff.** Ensure only intentional files changed and no large binaries were added accidentally.
6. **Commit with a descriptive message** (see [Commit Messages](#commit-messages--pull-requests)).
7. **Open a pull request** against `main`, referencing any related issues (e.g., `Fixes #59`).
8. **Respond to feedback promptly.** Reviewers may request adjustments for style, clarity, or tooling.

> **Pre-commit hook:** Husky automatically runs checks when you commit:
> - MyST linter (warnings only)
> - Spell checker on staged markdown files (warnings only)
> - Alt text validation on staged images (warnings only)
> - Jest unit tests (must pass or commit is blocked)
>
> Fix test failures before retrying the commit.

---

## Content and Style Guidelines

- **File locations:** Each chapter lives in `content/ChapXX.../`. Exercises go under `content/ChapXX.../Problems/`.
- **MyST syntax:** Use backtick fences for directives and follow the exact patterns documented in `doc/MYST_CONVENTIONS.md`. Never use `:::` fences.
- **Sections & references:** Add section labels using `(label-name)=` syntax. Keep cross-references on a single line, e.g., `See {ref}`section:lasers``.
- **Figures:** Every figure needs `:name:`, `:width:`, `:alt:` (for accessibility), and a descriptive caption (>20 characters). Use `{numref}` for cross-references.
- **Accessibility:** Write meaningful alt text describing image content. Run `npm run validate:alt-text` to check. Captions should explain what a figure shows and why it matters.
- **Equations:** Label equations that are referenced later with `{eq}` labels.
- **Tone:** Maintain an approachable, instructional tone. Avoid slang or colloquialisms.
- **Citations:** Use the existing `references.bib` entries or add new ones when citing external material.

Before submitting, run `npm run validate` to catch missing labels, malformed directives, and split references.

---

## Figures and Media

- **Preferred formats:** PNG or JPG for photos; SVG or PNG for diagrams. Avoid WebP (breaks PDF export).
- **Naming convention:** `ChapterNumber_FigureNumber_description.ext` (e.g., `05_03_lens_diagram.png`).
- **Insertion:** Use `npm run images:insert` to automate file naming, numbering, and reference updates. If doing it manually, follow the format below:
  ```markdown
  ```{figure} Images/05_03_lens_diagram.png
  :name: fig:lens_diagram
  :width: 80%
  :align: center

  Ray diagram showing how a converging lens focuses parallel rays into the focal plane.
  ```
  ```
- **Optimization:** `npm run build` optimizes images automatically. Do not commit generated `_build/` assets.
- **Unreferenced images:** Run `npm run find-unreferenced-dry` to ensure every image used has a reference.

---

## Tooling & Code Changes

- **Scripts directory:** All utility scripts are written in Node.js and organized by function in subdirectories:
  - `scripts/build/` - Build-time operations (PWA, optimization)
  - `scripts/images/` - Image management utilities
  - `scripts/transform/` - Content transformation scripts
  - `scripts/validation/` - Validation and linting
  - Update `doc/scripts/README.md` when adding or changing behavior.
- **Configuration:** Some scripts rely on `scripts/config.json` (chapter mappings) and `myst.yml` (TOC, exports). Update both when adding chapters or exports.
- **Testing:** Add or update Jest tests in `scripts/tests/` when you change scripts. Run `npm test` to verify.
- **Service worker & PWA:** When modifying `pwa/service-worker.js` or `pwa/manifest.json`, bump cache versions and document changes in the PR description.

---

## Commit Messages & Pull Requests

- **Style:** Use short, imperative descriptions that explain the “why” (e.g., `Add CONTRIBUTING guide for new contributors`).
- **Scope:** One logical change per commit when possible.
- **Reference issues:** Mention relevant issues in commit messages or PR bodies (e.g., `Fixes #59`).
- **Pull request checklist:**
  - [ ] All lint/validation/build commands pass locally
  - [ ] Tests added/updated (when applicable)
  - [ ] Documentation updated (if behavior or workflows changed)
  - [ ] No unrelated files or large binary assets committed
  - [ ] Screenshots or before/after comparisons included for UI or figure changes

---

## Getting Help

- **Issues:** https://github.com/QuadriviumPress/opticsTextbook/issues
- **Discussions / Questions:** Open a discussion or comment on related issues if guidance is needed.
- **Documentation references:**
  - [`MAINTENANCE.md`](MAINTENANCE.md)
  - [`MYST_CONVENTIONS.md`](MYST_CONVENTIONS.md)
  - [`scripts/README.md`](scripts/README.md)
  - [`CLAUDE.md`](CLAUDE.md)

---

## Code of Conduct

We value a welcoming, professional community. By participating, you agree to:

- Treat everyone with respect and empathy.
- Provide constructive feedback focused on the work, not individuals.
- Assume good intent and collaborate toward shared goals.
- Report abusive or harassing behavior to the maintainers via GitHub issues or email (see repository owners’ profiles).

These expectations align with widely adopted open-source norms such as the [Contributor Covenant](https://www.contributor-covenant.org/). Maintainers may moderate interactions that violate these principles.

---

## License

Unless stated otherwise, all contributions are licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/). By submitting a pull request, you confirm that you have the right to license your work under this license.

Thank you for helping make the Optics Textbook better for everyone!
