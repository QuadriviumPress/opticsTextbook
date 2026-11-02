# AGENTS.md

## Standard

This book follows the [QuadriviumPress MyST baseline](https://github.com/QuadriviumPress/bindery/blob/main/doc/myst-baseline.md) and the [presentation skill](https://github.com/QuadriviumPress/bindery/blob/main/skills/quadrivium-myst-presentation/SKILL.md).

## Commands

```bash
npm run start
npm run build
npm run verify
npm run check
```

`npm run check` is the production-equivalent verification and HTML build.

## Intentional differences

- `dependencies` keeps `js-yaml`. `mystmd`, `sharp`, and `@types/node` (`^26.1.1`) are in `devDependencies`. `@types/node` is direct so the lockfile resolves Node 26 types; Jest depends on `@types/node` with `*`.
- Optional `package.json` keys: `keywords`, `repository`, `bugs`, `homepage`, `overrides` (pins `smol-toml` for `markdownlint-cli2`).
- `build` optimizes images, generates exports, copies them into the site, injects scripts, and installs PWA assets through `npm run setup-pwa`. It does not call `scripts/setup-pwa.mjs`.
- `verify` runs the optics lint, reference, label, image, style, and alt-text checks, then Jest.
- Extra script groups: `export`, `pdf`, `docx`, `lint:*`, `validate:*`, `fix:*`, `images:*`, `standardize:*`, `test`, `test:watch`, `test:coverage`, `clean`, `serve`, `build:no-pwa`.
- Source lives under `content/ChapNN…/`, not `chapters/ch-NN-slug.md`.
- Markup: [`doc/STYLE_GUIDE.md`](doc/STYLE_GUIDE.md) and [`doc/MYST_CONVENTIONS.md`](doc/MYST_CONVENTIONS.md). Upkeep: [`doc/MAINTENANCE.md`](doc/MAINTENANCE.md). Script names beyond `start`, `build`, `verify`, and `check` are in `package.json`.

## Presentation gap

Problems are bold `**Problem X.Y**` on child pages, as described in [`doc/STYLE_GUIDE.md`](doc/STYLE_GUIDE.md). Callouts already use `{note}`, `{important}`, `{tip}`, and `{warning}`. There is no `{exercise}` or `{solution}` directive. Rewriting problem sets is deferred.
