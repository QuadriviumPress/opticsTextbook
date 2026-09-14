# MyST plugins

[`simulation.mjs`](simulation.mjs) embeds interactive PhET and OpenLyceum
simulations on the website and falls back to a screenshot plus caption link in
PDF, DOCX, Markdown, and print. Directives: `{simulation}`, `{openlyceum}`,
`{phet}`, `{phet-legacy}`.

Copied from the `modernPhysics` sibling; keep the two in sync when either
changes.

Registered in [`../myst.yml`](../myst.yml):

```yaml
project:
  plugins:
    - plugins/simulation.mjs
site:
  options:
    # MyST ships only one style file; simulation rules are inlined at the top
    # of css/custom.css (keep in sync with plugins/simulation.css).
    style: css/custom.css
```

Edits to a `.mjs` plugin do **not** hot-reload. Restart `myst start` after
changing it.

See [`../SOURCES.md`](../SOURCES.md) for the chapter-by-chapter embed ledger.
Usage notes match the `modernPhysics` fleet sibling (`plugins/README.md` there).
