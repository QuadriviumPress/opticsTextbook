# AGENTS.md

## Standard

This book follows the [QuadriviumPress MyST baseline](https://github.com/QuadriviumPress/bindery/blob/main/doc/myst-baseline.md) and the [presentation skill](https://github.com/QuadriviumPress/bindery/blob/main/skills/quadrivium-myst-presentation/SKILL.md).

## Commands

```bash
npm run start
npm run prebuild
npm run build
npm run verify
npm run check
npm run test
npm run test:coverage
npm run test:watch
npm run build:no-pwa
npm run checklinks
npm run clean
npm run copy-exports
npm run docx
npm run export
npm run fix:directives
npm run fix:directives:admonitions
npm run fix:directives:dry
npm run fix:directives:fences
npm run fix:split-refs
npm run fix:split-refs:dry
npm run generate-exports
npm run generate-icons
npm run generate-manifest
npm run images:clean-unreferenced
npm run images:clean-unreferenced:dry
npm run images:find-unreferenced
npm run images:find-unreferenced:dry
npm run images:insert
npm run inject-scripts
npm run lint
npm run lint:fix
npm run lint:grammar
npm run lint:grammar:suggestions
npm run lint:markdown
npm run lint:markdown:fix
npm run lint:quiet
npm run lint:spell
npm run lint:spell:fix
npm run optimize-images
npm run pdf
npm run serve
npm run setup-pwa
npm run standardize:figures
npm run standardize:figures:dry
npm run standardize:labels
npm run standardize:labels:check
npm run standardize:labels:equations
npm run standardize:labels:figures
npm run validate
npm run validate:alt-text
npm run validate:alt-text:fix
npm run validate:fix
npm run validate:images
npm run validate:quiet
npm run validate:references
npm run validate:references:suggestions
npm run validate:strict
npm run validate:style
npm run validate:style:quiet
npm run validate:style:strict
```

`npm run check` is the production-equivalent verification and HTML build.

## Intentional differences

- `dependencies` keeps `js-yaml`. `mystmd`, `sharp`, and `@types/node` (`^26.1.1`) are in `devDependencies`. `@types/node` is direct so the lockfile resolves Node 26 types; Jest depends on `@types/node` with `*`.
- Optional `package.json` keys: `keywords`, `repository`, `bugs`, `homepage`, `overrides` (pins `smol-toml` for `markdownlint-cli2`).
- `build` optimizes images, generates exports, copies them into the site, injects scripts, and installs PWA assets through `npm run setup-pwa`. It does not call `scripts/setup-pwa.mjs`.
- `verify` runs the optics lint, reference, label, image, style, and alt-text checks, then Jest.
- Extra script groups: `export`, `pdf`, `docx`, `lint:*`, `validate:*`, `fix:*`, `images:*`, `standardize:*`, `test`, `test:watch`, `test:coverage`, `clean`, `serve`, `build:no-pwa`.
- Source lives under `content/ChapNN…/`, not `chapters/ch-NN-slug.md`.
- The human style guide is [`doc/STYLE_GUIDE.md`](doc/STYLE_GUIDE.md). The longer assistant runbook is [`doc/AGENTS.md`](doc/AGENTS.md).

## Presentation gap

Problems are bold `**Problem X.Y**` on child pages, as described in [`doc/STYLE_GUIDE.md`](doc/STYLE_GUIDE.md). Callouts already use `{note}`, `{important}`, `{tip}`, and `{warning}`. There is no `{exercise}` or `{solution}` directive. Rewriting problem sets is deferred.
