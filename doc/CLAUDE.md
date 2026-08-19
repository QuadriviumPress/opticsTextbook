# AI Assistant Guide - Optics Textbook Project

This document provides context and guidance for AI assistants (like Claude) working on this repository.

## Project Overview

This is an **interactive optics textbook** built with MyST Markdown and deployed as a Progressive Web App (PWA). It covers advanced topics in optics for undergraduate students in physics and electrical engineering.

**Key Technologies:**
- MyST Markdown for content
- Node.js for tooling and automation
- GitHub Actions for CI/CD
- Progressive Web App features
- PDF/DOCX export generation

**Current Status (December 2025):**
- ✅ 153 figures with descriptive, accessible captions
- ✅ All cross-references validated and working
- ✅ PDF generation (37 MB full textbook + 11 chapter PDFs)
- ✅ DOCX generation (11 individual chapter files)
- ✅ PWA with service worker and offline support
- ✅ Automated deployment to GitHub Pages
- ✅ All known issues resolved

## Quick Reference

### Before Making Changes

1. **Read relevant files first** - Never propose changes without reading the code
2. **Check existing conventions** - Review `doc/MYST_CONVENTIONS.md` and `doc/MAINTENANCE.md`
3. **Understand the structure** - Content is in `content/`, scripts in `scripts/`

### Essential Commands

```bash
# Development
npm run start              # Launch dev server (http://localhost:3000)
npm run build              # Full build: optimize images → generate PDFs → build HTML → setup PWA

# Export Generation
npm run pdf                # Generate PDF exports only
npm run docx               # Generate DOCX exports only (individual chapters)
npm run generate-exports   # Generate all exports (PDF)

# Quality Control
npm run lint               # Check for MyST-specific issues
npm run lint:fix           # Auto-fix MyST linting issues
npm run lint:markdown      # Check general markdown formatting
npm run lint:markdown:fix  # Auto-fix markdown formatting
npm run validate           # Validate all references and citations
npm test                   # Run unit tests

# Before Committing
npm run lint:fix
npm run build              # Includes export generation
git add .
git commit -m "Clear description"  # Pre-commit hook runs linter and tests
git push                   # Triggers GitHub Actions deployment
```

### File Structure

```
opticsTextbook/
├── content/                    # All textbook content
│   ├── Chap01Basics/          # Chapter 1
│   ├── Chap02GeometricalOptics/
│   ├── ...                    # Chapters 1-11
│   ├── Appendices/            # Mathematical appendices
│   └── Preface/               # Textbook introduction
├── scripts/                    # Utility scripts (all Node.js/JavaScript)
│   ├── build/                 # Build-time scripts
│   │   ├── copy-export-files.js
│   │   ├── generate-pwa-icons.js
│   │   ├── generate-pwa-manifest.js
│   │   ├── inject-custom-scripts.js
│   │   ├── install-pwa-assets.js
│   │   └── optimize-images.js
│   ├── images/                # Image management
│   │   ├── delete-unreferenced.js
│   │   ├── find-unreferenced.js
│   │   └── insert-figure.js
│   ├── transform/             # Content transformation
│   │   ├── fix-directive-syntax.js
│   │   ├── fix-split-references.js
│   │   ├── standardize-figures.js
│   │   └── standardize-labels.js
│   ├── validation/            # Validation and linting
│   │   ├── lint-markdown.js
│   │   ├── validate-all.js
│   │   ├── validate-images.js
│   │   └── validate-references.js
│   ├── tests/                 # Jest unit tests
│   ├── config.json            # Chapter mappings (IMPORTANT!)
│   ├── shared-utils.js        # Shared utility functions
│   ├── report-utils.js        # Reporting utilities
│   └── index.js               # Common exports
├── doc/                        # Centralized documentation
│   ├── MAINTENANCE.md         # Detailed workflows
│   ├── MYST_CONVENTIONS.md    # MyST syntax rules
│   ├── LATEX_TO_TYPST_MIGRATION.md
│   ├── MyST_Comprehensive_Reference.md
│   ├── PWA_SETUP.md
│   └── scripts/               # Script-specific docs
│       └── README.md
├── exports/                    # Generated export files
│   ├── textbook.pdf           # Full textbook PDF (37 MB)
│   └── chapters/              # Individual chapter PDFs and DOCX
├── pwa/                        # Progressive Web App assets
│   ├── manifest.json          # Web app manifest
│   ├── service-worker.js      # Service worker for offline caching
│   └── offline.html           # Offline fallback page
├── config/                     # Configuration files
├── icons/                      # PWA icons (multiple sizes)
├── img/                        # Site assets (logos, favicon)
├── myst.yml                    # MyST configuration
├── package.json                # npm scripts
├── .github/workflows/          # CI/CD workflows
│   ├── deploy-book.yml        # GitHub Pages deployment
│   ├── validate.yml           # Validation checks
│   └── link-check.yml         # Weekly link validation
├── README.md                   # User-facing docs
```

## MyST Markdown Conventions

### Critical Rules

1. **Use backtick fences** (` ``` `) for ALL directives and code blocks
   ```markdown
   ```{figure} path/to/image.png
   :name: fig-label
   :width: 80%

   Caption text here.
   ```
   ```

2. **All figures MUST have**:
   - A `:name:` label (format: `fig:descriptive-name` or `Fig_XX_YY_name`)
   - A descriptive caption (>20 characters for accessibility)
   - Alignment and width specified

3. **Table directives proper format**:
   ```markdown
   ```{table}
   :name: table_name

   Caption text here

   | Header | Content |
   | ------ | ------- |
   | Data   | Data    |
   ```
   ```

4. **Section labels (not index directives)**:
   ```markdown
   (section-label)=
   ## Section Title
   ```
   NOT: ````{index} Section Title :name: label```

5. **Cross-references**:
   - Figures: `{numref}`fig-label``
   - Equations: `{eq}`eq:label``
   - Sections: `{ref}`section-label``
   - Must be on same line (no split references)

### Common Directives

```markdown
```{note}
Important concept explanation.
```

```{dropdown}
**Solution to Problem 1**

Step-by-step solution...
```

```{warning}
**Common Mistake**: Explanation of pitfall.
```

```{admonition} Custom Title
Custom callout box with title.
```
```

## Common Tasks

### Adding a New Figure

**Use the script (recommended):**
```bash
npm run images:insert -- \
  --image ~/path/to/figure.png \
  --chapter 5 \
  --position 3 \
  --name lens_diagram \
  --dry-run  # Preview first, then remove --dry-run
```

**Manual approach:**
1. Copy image to: `content/ChapXX.../Images/XX_YY_name.png`
2. Add to markdown:
   ```markdown
   ```{figure} Images/05_03_lens_diagram.png
   :name: fig:lens_diagram
   :width: 80%

   Descriptive caption explaining what the figure shows and its significance.
   ```
   ```
3. Validate: `npm run validate-enhanced`

**Image Format Requirements:**
- Prefer PNG or JPG for photos
- Use SVG for diagrams when possible
- Avoid WebP (causes PDF generation issues) - convert to PNG instead
- Images are auto-optimized during build (max 1920px width)

### Generating PDF and DOCX Exports

**Generate all exports:**
```bash
npm run generate-exports  # Generates PDFs (full textbook + chapters)
```

**Generate individually:**
```bash
npm run pdf                # Generate all PDFs (37 MB full + 11 chapters)
npm run docx               # Generate individual chapter DOCX files (11 files)
```

**Note:** Full textbook DOCX export is disabled because DOCX format doesn't support combining multiple articles. Individual chapter DOCX files are available.

### Adding a New Chapter

1. Create directory: `mkdir -p content/Chap12MyTopic`
2. Create file: `content/Chap12MyTopic/MyTopic.md`
3. Update `scripts/config.json`:
   ```json
   "12": {
     "dir": "content/Chap12MyTopic",
     "file": "MyTopic.md"
   }
   ```
4. Update `myst.yml` table of contents
5. Validate: `npm run validate && npm run build`

### Fixing Broken References

```bash
# Find all broken references
npm run validate

# Common fixes
npm run lint:fix                    # Auto-fix many issues
npm run images:find-unreferenced:dry  # Find orphaned images
npm run fix:split-refs:dry          # Check for split refs
```

## Build Process

### Full Build Order

When you run `npm run build`, it automatically:
1. **Optimize images** - Resize and compress large images
2. **Generate exports** - Create PDF files (37 MB full textbook + chapters)
3. **Build HTML** - Generate static site
4. **Setup PWA** - Copy service worker, manifest, and icons

### Export Generation

The build process ensures export files exist before HTML build:
- `exports/textbook.pdf` - Full textbook (37 MB)
- `exports/chapters/*.pdf` - 11 individual chapter PDFs
- `exports/chapters/*.docx` - 11 individual chapter DOCX files

These are automatically copied to `_build/html/exports/` during deployment.

## Git Workflow

### Pre-Commit Hook (Automatic)
When you commit, Husky automatically runs:
- MyST linter (warnings only - won't block commit)
- Unit tests (must pass or commit is blocked)

**Note:** If pre-commit hook shows warnings but tests pass, you can commit. Use `--no-verify` only if necessary and document why.

### GitHub Actions (Automatic on Push to main)

**Deploy Workflow** (`.github/workflows/deploy-book.yml`):
1. Install dependencies (Node.js, LaTeX, ImageMagick)
2. Generate all exports (PDF, DOCX)
3. Build HTML site
4. Setup PWA features
5. Deploy to GitHub Pages

**Validate Workflow** (`.github/workflows/validate.yml`):
- Linting validation
- Reference validation
- Unit tests
- External link checking

## Important Files to Know

- **doc/MAINTENANCE.md** - Comprehensive guide for all workflows
- **doc/MYST_CONVENTIONS.md** - MyST syntax rules and examples
- **doc/CLAUDE.md** - This file (guidance for AI assistants)
- **scripts/config.json** - Chapter mappings (update when adding chapters!)
- **myst.yml** - MyST configuration, table of contents, and export settings
- **doc/scripts/README.md** - Documentation for utility scripts
- **pwa/service-worker.js** - PWA service worker (handles offline caching)
- **pwa/manifest.json** - PWA manifest (app metadata)

## Quality Standards

### Before Committing

✓ Run `npm run build` - Verify HTML builds successfully and exports generate
✓ Run `npm run lint:fix` - Auto-fix linting issues
✓ Run `npm run validate` - Check all references
✓ Run `npm test` - Run Jest unit tests
✓ Commit triggers pre-commit hook automatically
✓ Push triggers GitHub Actions validation and deployment

### Code Style

- Use backtick fences for directives
- All figures must have descriptive captions (>20 characters)
- All figures must have `:name:` labels
- Section labels use `(label)=` format, not `{index}` directives
- Table captions go on separate line after `:name:`
- Cross-references must be on same line (no split references)
- Follow MyST conventions strictly

### Commit Messages

- Clear and descriptive
- Explain what changed and why
- Reference issue numbers when applicable
- Example: "Add Chapter 5 section on wave interference"
- Example: "Fix broken cross-reference in Chapter 3 (#35)"
- Example: "Add descriptive captions to figures for accessibility (#49)"

## Troubleshooting

### Build Fails

```bash
npm install                # Reinstall dependencies
npm run build              # Try build again
```

Common causes:
- Missing dependencies
- Malformed MyST syntax
- Broken cross-references
- Missing image files

### PDF Generation Fails

```bash
# Check LaTeX installation
which latexmk pdflatex xelatex

# Install if missing
sudo apt-get install texlive-xetex texlive-fonts-recommended \
                     texlive-fonts-extra latexmk texlive-latex-extra

# Check for WebP images (not supported in PDF)
find content -name "*.webp"

# Convert WebP to PNG
for f in $(find content -name "*.webp"); do
  convert "$f" "${f%.webp}.png"
done
```

### Tests Fail

```bash
npm test  # See what failed
# Fix issues, then retry commit
```

### Broken References

```bash
npm run validate  # Shows exactly what's broken
npm run lint:fix  # Auto-fix common issues
```

### Pre-Commit Hook Blocked My Commit

The hook is protecting code quality. Fix the test failures shown, then try again:
```bash
git commit -m "Your message"  # Try again after fixes
```

If only warnings (not errors), you can use:
```bash
git commit --no-verify -m "Your message"  # Document why in commit message
```

### Service Worker Caching Issues

If users report pages not loading or showing old content:

**Problem:** Service worker cached old/broken content
**Solution:** Users need to hard refresh once:
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

**For developers:**
- Service worker version bumped to v1.0.1 (cache v2)
- Now prevents caching 404 responses
- Auto-updates on user's next visit

### GitHub Pages 404 Errors

If some pages work but others return 404:
1. **Check if issue is caching** - Try incognito mode
2. **If works in incognito** - It's a service worker cache issue
3. **Solution** - Wait for service worker to auto-update or clear browser cache

## PWA Features

### Service Worker

**Location:** `pwa/service-worker.js`

**Features:**
- Caches core assets for offline use
- Runtime caching of visited pages
- Background cache updates
- Skips caching 404 and error responses

**Cache Strategy:**
- Core assets cached on install
- Pages cached on first visit (if successful)
- Stale-while-revalidate pattern
- Automatic cache cleanup of old versions

**Updating Service Worker:**
1. Bump version in `pwa/service-worker.js`
2. Change `CACHE_NAME` and `RUNTIME_CACHE` versions
3. Push to trigger deployment
4. Users' browsers will auto-update within 24 hours

### Manifest

**Location:** `pwa/manifest.json`

**Includes:**
- App metadata (name, description)
- Icons (72x72 to 512x512)
- Theme colors
- Start URL and scope
- Shortcuts to key pages

## Export Configuration (myst.yml)

### PDF Exports

**Full Textbook:**
```yaml
- format: pdf
  id: pdf
  output: exports/textbook.pdf
  articles: [all chapters]  # Combines all chapters (37 MB)
```

**Individual Chapters:**
```yaml
- format: pdf
  output: exports/chapters/chapter-01-basics.pdf
  article: content/Chap01Basics/Basics.md  # Single article
```

### DOCX Exports

**Individual Chapters Only:**
```yaml
- format: docx
  output: exports/chapters/chapter-01-basics.docx
  article: content/Chap01Basics/Basics.md
```

**Note:** Full textbook DOCX is disabled because DOCX format doesn't support combining multiple articles. Only individual chapter DOCX files are generated.

### Downloads Section

```yaml
downloads:
  - id: pdf
    title: "Download PDF"
  # DOCX removed - individual chapters available via exports
```

## Scripts and Utilities

### Image Management

```bash
# Optimize images (runs automatically in prebuild)
npm run optimize-images

# Find unreferenced images
npm run images:find-unreferenced:dry

# Delete unreferenced images
npm run images:clean-unreferenced
```

### Reference Validation

```bash
# Validation (checks all references and citations)
npm run validate

# Fix split references
npm run fix:split-refs:dry
npm run fix:split-refs  # Apply fixes
```

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix common issues
npm run lint:fix
```

## Recent Major Changes (December 2025)

### Figure Accessibility Enhancement
- Added descriptive captions to all 153 figures
- Fixed 8 figures with missing captions
- Enhanced 6 figures with short captions
- All captions now meet accessibility standards

### Directive Syntax Fixes
- Converted 14 malformed `{index}` directives to proper section labels
- Fixed table directive caption placement
- All directives now use correct MyST syntax

### Export System Implementation
- PDF generation integrated into build process
- Full textbook PDF: 37 MB (all chapters)
- 11 individual chapter PDFs
- 11 individual chapter DOCX files
- Download links working in web interface

### Service Worker Improvements
- Version bumped to v1.0.1
- Fixed caching of 404 responses
- Prevents stale content issues
- Auto-updates on user visits

### Configuration Cleanup
- Fixed DOCX multi-article configuration error
- Converted WebP images to PNG for PDF compatibility
- Optimized build process workflow
- Added favicon configuration

## Common Pitfalls to Avoid

1. **Don't use colon fences** (`:::`) - Use backtick fences (` ``` `) instead
2. **Don't skip image optimization** - Images are auto-optimized during build
3. **Don't commit without testing** - Always run `npm run build` first
4. **Don't forget to update config.json** - Required when adding chapters
5. **Don't bypass pre-commit hooks** - They catch issues early
6. **Don't create files without reading existing code first**
7. **Don't use WebP images** - Convert to PNG for PDF compatibility
8. **Don't use `{index}` directives with `:name:`** - Use `(label)=` section labels
9. **Don't put caption text on same line as `{table}`** - Use format shown above
10. **Don't split cross-references** - Keep `{eq}`label`` on one line
11. **Don't leave figures without captions** - Accessibility requirement
12. **Don't configure multi-article DOCX exports** - Not supported by MyST

## Development Philosophy

- **ALWAYS prefer editing existing files** over creating new ones
- **Keep changes minimal** - Only change what's necessary
- **Read before modifying** - Understand existing code first
- **Test thoroughly** - Build and validate before committing
- **Follow conventions** - Consistency is critical
- **Document changes** - Update relevant docs when making structural changes
- **Consider accessibility** - All figures need descriptive captions
- **Think about exports** - Changes should work in PDF, DOCX, and HTML

## Validation and Testing

### Validation Checks

The project has comprehensive validation:

```bash
# Run all validation checks
npm run validate

# Expected output: "✅ No validation issues found!"
```

**Checks include:**
- Cross-reference resolution
- Citation validation
- Label format consistency
- Missing labels detection
- Image reference validation

### Linting Checks

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint:fix
```

**Checks include:**
- Split reference detection
- Missing figure captions
- Missing math labels
- Malformed directives
- Inconsistent label format

### Pre-Commit Validation

Automatic on commit:
- MyST linter (warnings shown but won't block)
- Unit tests (must pass or commit blocked)

## GitHub Issues Workflow

When working on issues:

1. **Check for duplicates** - Cross-link and close duplicates
2. **Verify issue still exists** - May already be fixed
3. **Document fixes thoroughly** - Add detailed comments when closing
4. **Test before closing** - Ensure fix actually works
5. **Cross-reference related issues** - Link to duplicates and related issues

### Recent Issue Cleanup (December 2025)

Closed duplicate issues:
- #36, #37 → #47 (External links)
- #38, #40 → #48 (Split equations)
- #39, #41 → #49 (Figure captions)
- #42 → #43 (Configuration errors)

Completed issues:
- #45 - Favicon configuration
- #49 - Figure caption accessibility
- #48 - Split equation references
- #35 - Cross-references validation
- #44 - Malformed directives
- #30 - PDF/DOCX generation
- #43 - Configuration errors

## Additional Resources

- **Repository**: https://github.com/QuadriviumPress/opticsTextbook/
- **Live Site**: https://quadriviumpress.github.io/opticsTextbook/
- **Issues**: https://github.com/QuadriviumPress/opticsTextbook/issues
- **Actions**: https://github.com/QuadriviumPress/opticsTextbook/actions
- **MyST Documentation**: https://mystmd.org/guide
- **License**: CC BY-SA 4.0

## Notes for AI Assistants

### General Principles

1. **Always read files before modifying them** - Use Read tool extensively
2. **Check existing patterns** - Look at other chapters for examples
3. **Use validation tools** - Run `npm run validate-enhanced` frequently
4. **Test changes** - Always run `npm run build` before committing
5. **Follow MyST conventions** - Review `doc/MYST_CONVENTIONS.md`
6. **Keep it simple** - Don't over-engineer or add unnecessary features
7. **Update this file** - If you discover new patterns or conventions

### Specific Guidance

**When adding figures:**
- Always include descriptive captions (>20 chars)
- Use `:name:` labels consistently
- Prefer PNG/JPG over WebP
- Test that figure displays in both HTML and PDF

**When fixing references:**
- Use validation tools to find broken refs
- Ensure labels exist before referencing
- Keep references on same line (no splits)
- Test cross-references work in built site

**When modifying myst.yml:**
- Test build after changes
- Understand export format limitations (DOCX can't do multi-article)
- Verify download links work
- Check GitHub Actions deployment succeeds

**When working with service worker:**
- Bump version number for any changes
- Update cache names to force refresh
- Test in both regular and incognito modes
- Consider impact on users' cached content

### Known Working Patterns

**Figure with caption:**
```markdown
```{figure} Images/05_03_lens_diagram.png
:name: fig:lens_diagram
:width: 80%
:align: center

Ray diagram showing how a converging lens focuses parallel light rays to a focal point. The focal length f is measured from the lens center to the point where rays converge on the optical axis.
```
```

**Section label:**
```markdown
(section:fiber-modes)=
## Fiber Modes
```

**Table:**
```markdown
```{table}
:name: table_properties

Optical properties of common materials

| Material | Refractive Index | Dispersion |
| -------- | ---------------- | ---------- |
| Glass    | 1.5              | Medium     |
| Water    | 1.33             | Low        |
```
```

**Cross-references:**
```markdown
See {numref}`fig:lens_diagram` for details.
As shown in {eq}`eq:snells-law`, the relationship is...
Refer to {ref}`section:fiber-modes` for more information.
```

## Deployment and Production

### GitHub Pages Deployment

**URL:** https://quadriviumpress.github.io/opticsTextbook/

**Deployment triggers:**
- Automatic on push to `main` branch
- Manual via GitHub Actions interface
- Pull request previews (optional)

**Deployment includes:**
- Full HTML site (29 pages)
- All optimized images
- PDF exports (accessible via download button)
- PWA assets (service worker, manifest, icons)
- Favicon and theme assets

### Cache Considerations

**For developers:**
- Service worker caches aggressively for offline use
- Cache version bumps force user updates
- Test in incognito to bypass cache

**For users:**
- Hard refresh once after deployment: `Ctrl + Shift + R`
- Service worker auto-updates within 24 hours
- Offline functionality works after first visit

### Monitoring Deployment

Check deployment status:
1. Visit: https://github.com/QuadriviumPress/opticsTextbook/actions
2. Look for "MyST GitHub Pages Deploy" workflow
3. Green checkmark = successful deployment
4. Red X = failed deployment (check logs)

Typical deployment time: 10-15 minutes

---

**Last Updated:** December 3, 2025

**Version:** 2.0

**For:** AI Assistants working on the Optics Textbook project

**Major Updates in v2.0:**
- PDF/DOCX export system documentation
- Service worker best practices
- Accessibility guidelines (figure captions)
- Directive syntax corrections
- Updated troubleshooting for common issues
- Recent issue cleanup documentation
