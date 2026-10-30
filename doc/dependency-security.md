# Dependency security follow-up

The October 2026 dependency review updates `smol-toml` to 1.9.1 and the
Markdown linter's KaTeX dependency to 0.18.2. The production MyST version
remains pinned to 1.12.0.

Two underlying advisories remain in development tooling because their
packages have no published patched version at the time of this review:

| Package | Dependency path | Advisory | Exposure |
| --- | --- | --- | --- |
| `sprintf-js` | Jest → Istanbul → js-yaml 3 → argparse | [Unbounded precision denial of service](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) | Test tooling; do not pass untrusted format strings to this dependency. |
| `braces` | markdownlint-cli2 → globby → fast-glob → micromatch | [Deeply nested pattern denial of service](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | Linter file-pattern handling; keep glob patterns under maintainer control. |

These packages belong to the development toolchain. This does not establish
that every execution path is safe. The advisories remain visible and the
security audit continues to fail until upstream fixes are available or the
affected dependency paths can be removed. Do not use `npm audit fix --force`
to downgrade Jest or markdownlint to obsolete versions merely to clear the
audit: npm currently proposes those incompatible downgrades.

Recheck with `npm audit` and update the relevant parent tooling when a
compatible fix becomes available. Multiple npm audit entries can trace back
to each of these two underlying advisories.
