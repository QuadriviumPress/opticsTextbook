#!/usr/bin/env node
/**
 * MyST Markdown Linter
 *
 * This script checks for common MyST markdown issues that can cause rendering problems.
 *
 * Status: ACTIVE - Core workflow script
 *    Used in pre-commit hooks and CI validation.
 *    Run via: npm run lint / npm run lint:fix
 *
 * Issues checked:
 * 1. Split equation/reference roles ({eq}, {numref}, {ref}, etc.) across lines
 * 2. Blank lines inside math blocks (between :label: and equation content)
 * 3. Missing labels on math blocks
 * 4. Inconsistent equation label format
 * 5. Broken figure references
 * 6. Multiple consecutive blank lines
 * 7. Trailing whitespace
 * 8. Skipped heading levels (e.g., ## to ####)
 * 9. Malformed directive syntax
 * 10. Missing figure captions
 * 11. Short figure captions (<20 chars, accessibility requirement)
 * 12. Colon fences used for directives (should use backtick fences)
 * 13. Duplicate :name: labels across files
 * 14. Table caption format (for {table} directive only; {list-table} inline captions are valid)
 * 15. Image file existence (referenced images must exist)
 * 16. Figure naming convention (XX_YY_name pattern)
 * 17. Unclosed directives (missing closing ```)
 *
 * Usage:
 *    node lint_myst_markdown.js [--fix] [--content-dir DIR] [--output-file FILE]
 *
 * Options:
 *    --fix            Automatically fix issues where possible
 *    --content-dir    Directory to lint (default: content)
 *    --output-file    Save report to file (default: reports/lint_report.md)
 *    --strict         Exit with error code if issues found
 *    --quiet          Only show summary
 */

const fs = require('fs');
const path = require('path');
const { ensureDirectory } = require('../shared-utils');
const { ReportGenerator, MarkdownReportBuilder } = require('../report-utils');

class MystLinter {
  constructor(fixMode = false, contentDir = 'content') {
    this.fixMode = fixMode;
    this.contentDir = contentDir;
    this.issues = {};
    // Track labels across all files for duplicate detection
    this.allLabels = {}; // label -> [{file, line}, ...]
  }

  /**
   * Check a single markdown file for issues.
   * @param {string} filePath - Path to file
   * @returns {Array<Object>} List of issues
   */
  checkFile(filePath) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const lines = originalContent.split('\n').map(line => line + '\n');

      const fileIssues = [];

      // Run all checks
      fileIssues.push(...this._checkSplitReferences(lines, filePath));
      fileIssues.push(...this._checkBlankLinesInMath(lines, filePath));
      fileIssues.push(...this._checkMissingMathLabels(lines, filePath));
      fileIssues.push(...this._checkEquationLabelFormat(lines, filePath));
      fileIssues.push(...this._checkTrailingWhitespace(lines, filePath));
      fileIssues.push(...this._checkMultipleBlankLines(lines, filePath));
      fileIssues.push(...this._checkMalformedDirectives(lines, filePath));
      fileIssues.push(...this._checkFigureCaptions(lines, filePath));
      fileIssues.push(...this._checkFenceConvention(lines, filePath));
      fileIssues.push(...this._checkSkippedHeadingLevels(lines, filePath));
      fileIssues.push(...this._checkTableCaptionFormat(lines, filePath));
      fileIssues.push(...this._checkImageExistence(lines, filePath));
      fileIssues.push(...this._checkFigureNamingConvention(lines, filePath));
      fileIssues.push(...this._checkUnclosedDirectives(lines, filePath));

      // Collect labels for cross-file duplicate checking
      this._collectLabels(lines, filePath);

      // Apply fixes if in fix mode
      if (this.fixMode && fileIssues.length > 0) {
        const modifiedContent = this._applyFixes(originalContent, fileIssues);
        if (modifiedContent !== originalContent) {
          fs.writeFileSync(filePath, modifiedContent, 'utf8');
        }
      }

      return fileIssues;
    } catch (err) {
      return [{ type: 'error', line: 0, message: `Error reading file: ${err.message}` }];
    }
  }

  /**
   * Check for split reference roles across lines.
   */
  _checkSplitReferences(lines, filePath) {
    const issues = [];
    const pattern = /\{(eq|numref|ref|doc|cite)\}\s*$/;

    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        // Check if next line starts with backtick
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('`')) {
          issues.push({
            type: 'split_reference',
            line: i + 1,
            message: `Split reference role found: ${lines[i].trim()}`,
            severity: 'error',
            fixable: true
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check for blank lines inside math blocks.
   */
  _checkBlankLinesInMath(lines, filePath) {
    const issues = [];
    let inMathBlock = false;
    let mathStart = 0;
    let hasLabel = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect math block start
      if (/```\{math\}/.test(line)) {
        inMathBlock = true;
        mathStart = i;
        hasLabel = false;
        continue;
      }

      // Detect math block end
      if (inMathBlock && line.trim() === '```') {
        inMathBlock = false;
        continue;
      }

      // Check for label inside math block
      if (inMathBlock && /:label:\s*\S+/.test(line)) {
        hasLabel = true;
        // Check if there's a blank line after label
        if (i + 1 < lines.length && lines[i + 1].trim() === '') {
          issues.push({
            type: 'blank_line_after_label',
            line: i + 2,
            message: "Blank line found after :label: in math block",
            severity: 'warning',
            fixable: true
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check for math blocks without labels.
   *
   * Note: This check is intentionally disabled/empty because:
   * - Not all equations need labels (only those being cross-referenced)
   * - Adding labels to all equations creates unnecessary noise
   * - Labels should be added intentionally when needed, not by default
   */
  _checkMissingMathLabels(lines, filePath) {
    // Return empty - this check generates too much noise
    // Labels are only needed for equations that are cross-referenced
    return [];
  }

  /**
   * Check equation label format consistency.
   *
   * Accepts multiple valid conventions:
   * - eq:chapter:description (preferred, e.g., eq:geo:snell-law)
   * - eq.description (legacy, e.g., eq.Fraunhofer)
   * - bare-name (legacy, e.g., photon-energy)
   * - fig:name, table:name, Fig_XX_YY (figure/table labels)
   */
  _checkEquationLabelFormat(lines, filePath) {
    const issues = [];
    const labelPattern = /:label:\s*([^\s\n]+)/;

    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(labelPattern);
      if (match) {
        const label = match[1];

        // Accept valid patterns
        const validPatterns = [
          /^eq:[a-z]+:[a-z0-9\-]+$/,      // eq:chapter:description (preferred)
          /^eq\.[a-zA-Z0-9_\-]+$/,         // eq.description (legacy)
          /^eq-[a-zA-Z0-9_\-]+$/,          // eq-description (legacy)
          /^fig[:_]/,                      // figure labels
          /^Fig_/,                         // Figure labels (uppercase)
          /^table[:_]/,                    // table labels
          /^[a-z][a-z0-9\-]*$/,            // bare lowercase names (legacy)
        ];

        const isValid = validPatterns.some(pattern => pattern.test(label));

        // Only flag truly problematic labels (e.g., with spaces or special chars)
        if (!isValid && !/^[a-zA-Z][a-zA-Z0-9_\-:.]+$/.test(label)) {
          issues.push({
            type: 'invalid_label',
            line: i + 1,
            message: `Label '${label}' contains invalid characters`,
            severity: 'warning',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check for trailing whitespace.
   */
  _checkTrailingWhitespace(lines, filePath) {
    const issues = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trimEnd() !== line.replace(/\n$/, '')) {
        issues.push({
          type: 'trailing_whitespace',
          line: i + 1,
          message: "Line has trailing whitespace",
          severity: 'info',
          fixable: true
        });
      }
    }

    return issues;
  }

  /**
   * Check for more than 2 consecutive blank lines.
   */
  _checkMultipleBlankLines(lines, filePath) {
    const issues = [];
    let blankCount = 0;
    let blankStart = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '') {
        if (blankCount === 0) {
          blankStart = i;
        }
        blankCount++;
      } else {
        if (blankCount > 2) {
          issues.push({
            type: 'multiple_blank_lines',
            line: blankStart + 1,
            message: `${blankCount} consecutive blank lines found (max 2 recommended)`,
            severity: 'info',
            fixable: true
          });
        }
        blankCount = 0;
      }
    }

    return issues;
  }

  /**
   * Check for malformed directive syntax.
   */
  _checkMalformedDirectives(lines, filePath) {
    const issues = [];

    // Common valid directives that can have text after }
    const validDirectives = [
      'admonition', 'note', 'warning', 'tip', 'caution', 'attention',
      'danger', 'error', 'hint', 'important', 'seealso', 'topic',
      'proof', 'example', 'exercise', 'definition', 'theorem'
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for directives with missing closing backticks
      // But allow valid directive patterns like ```{admonition} Title
      if (line.trim().startsWith('```{')) {
        const directiveMatch = line.trim().match(/```\{(\w+)\}(.*)$/);
        if (directiveMatch) {
          const directiveName = directiveMatch[1];
          const rest = directiveMatch[2].trim();

          // If it's not a valid directive that accepts text, and has text after }
          const allowedWithText = [...validDirectives, 'math', 'figure', 'image', 'code-block', 'literalinclude'];
          if (rest && !allowedWithText.includes(directiveName)) {
            issues.push({
              type: 'malformed_directive',
              line: i + 1,
              message: `Directive '${directiveName}' may be malformed (unexpected text after })`,
              severity: 'warning',
              fixable: false
            });
          }
        }
      }

      // Check for incorrect role syntax
      if (!line.trim().startsWith('```') && !line.trim().startsWith('$')) {
        // Match role syntax that's clearly wrong: {word} followed by space and letter/number
        if (/\{(eq|numref|ref|doc|cite|math|download|term)\}\s+[a-zA-Z0-9]/.test(line)) {
          issues.push({
            type: 'incorrect_role_syntax',
            line: i + 1,
            message: "Role syntax may be incorrect (should be {role}`target` not {role} target)",
            severity: 'warning',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check for figures without captions or with short captions.
   *
   * In MyST, figure captions go INSIDE the figure block, after the options.
   * Accessibility requirement: captions should be at least 20 characters.
   */
  _checkFigureCaptions(lines, filePath) {
    const issues = [];
    let inFigure = false;
    let figureStart = 0;
    let captionText = [];
    let pastOptions = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (/```\{figure\}/.test(line)) {
        inFigure = true;
        figureStart = i;
        captionText = [];
        pastOptions = false;
        continue;
      }

      if (inFigure) {
        const stripped = line.trim();

        // Options start with : and have a value
        if (stripped.startsWith(':') && stripped.slice(1).includes(':')) {
          // Still in options section
        } else if (stripped === '```') {
          // End of figure block
          const fullCaption = captionText.join(' ').trim();
          if (!fullCaption) {
            issues.push({
              type: 'missing_figure_caption',
              line: figureStart + 1,
              message: "Figure has no caption text",
              severity: 'warning',
              fixable: false
            });
          } else if (fullCaption.length < 20) {
            issues.push({
              type: 'short_figure_caption',
              line: figureStart + 1,
              message: `Figure caption is too short (${fullCaption.length} chars, need ≥20 for accessibility)`,
              severity: 'warning',
              fixable: false
            });
          }
          inFigure = false;
        } else if (stripped === '') {
          // Blank line - marks end of options section
          pastOptions = true;
        } else if (pastOptions || !stripped.startsWith(':')) {
          // Non-empty, non-option line after options = caption text
          if (stripped) {
            captionText.push(stripped);
          }
        }
      }
    }

    return issues;
  }

  /**
   * Check that directives use backtick fences (our preferred convention).
   */
  _checkFenceConvention(lines, filePath) {
    const issues = [];

    // MyST directives that should use backtick fences (our convention)
    const mystDirectives = [
      'note', 'warning', 'important', 'tip', 'caution', 'attention',
      'danger', 'error', 'hint', 'seealso', 'admonition',
      'dropdown', 'card', 'tab-set', 'tab-item',
      'figure', 'subfigure', 'video', 'image',
      'proof', 'theorem', 'lemma', 'definition', 'example', 'exercise',
      'grid', 'column', 'margin', 'sidebar',
      'epigraph', 'bibliography', 'glossary', 'list-table'
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for colon fence directives (should be backtick fences per our convention)
      const colonDirectiveMatch = line.trim().match(/:::\{(\w+[\w-]*)\}/);
      if (colonDirectiveMatch) {
        const directiveName = colonDirectiveMatch[1];
        if (mystDirectives.includes(directiveName)) {
          issues.push({
            type: 'wrong_fence_type',
            line: i + 1,
            message: `Directive '${directiveName}' should use backtick fence (\`\`\`) not colon fence (:::)`,
            severity: 'warning',
            fixable: false
          });
        }
      }

      // Check for colon fence code blocks (should be backtick fences)
      const colonCodeMatch = line.trim().match(/:::\{(python|bash|shell|javascript|java|c|cpp|matlab|r)\}/);
      if (colonCodeMatch) {
        const lang = colonCodeMatch[1];
        issues.push({
          type: 'wrong_fence_type',
          line: i + 1,
          message: `Code block with language '${lang}' should use backtick fence (\`\`\`) not colon fence (:::)`,
          severity: 'warning',
          fixable: false,
          suggestion: `Change :::{${lang}} to \`\`\`${lang}`
        });
      }
    }

    return issues;
  }

  /**
   * Check for skipped heading levels (e.g., ## followed by ####).
   */
  _checkSkippedHeadingLevels(lines, filePath) {
    const issues = [];
    let currentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      // Match ATX-style headings (# to ######)
      const headingMatch = lines[i].match(/^(#{1,6})\s+\S/);
      if (headingMatch) {
        const newLevel = headingMatch[1].length;

        // Check for skipped levels (but allow going back to any higher level)
        if (currentLevel > 0 && newLevel > currentLevel + 1) {
          issues.push({
            type: 'skipped_heading_level',
            line: i + 1,
            message: `Heading level skipped: ${'#'.repeat(currentLevel)} to ${'#'.repeat(newLevel)} (accessibility issue)`,
            severity: 'warning',
            fixable: false
          });
        }

        currentLevel = newLevel;
      }
    }

    return issues;
  }

  /**
   * Check that table captions follow MyST conventions.
   *
   * Note: {list-table} inline captions are valid MyST syntax and are NOT flagged.
   * This check only flags {table} directives with inline captions.
   */
  _checkTableCaptionFormat(lines, filePath) {
    const issues = [];

    for (let i = 0; i < lines.length; i++) {
      // Only check {table} directive - {list-table} inline captions are valid MyST syntax
      const tableMatch = lines[i].trim().match(/```\{table\}\s*(.+)$/);
      if (tableMatch) {
        const inlineText = tableMatch[1].trim();

        // If there's non-option text on the same line as the directive
        if (inlineText && !inlineText.startsWith(':')) {
          issues.push({
            type: 'table_caption_format',
            line: i + 1,
            message: "Table caption should be on a separate line after table options",
            severity: 'info',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check that referenced images actually exist.
   */
  _checkImageExistence(lines, filePath) {
    const issues = [];
    const fileDir = path.dirname(filePath);

    for (let i = 0; i < lines.length; i++) {
      // Match figure directive with image path
      const figureMatch = lines[i].trim().match(/```\{figure\}\s*(.+)$/);
      if (figureMatch) {
        const imagePath = figureMatch[1].trim();

        // Skip URLs
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('//')) {
          continue;
        }

        // Resolve the image path relative to the markdown file
        const fullPath = path.join(fileDir, imagePath);

        if (!fs.existsSync(fullPath)) {
          issues.push({
            type: 'missing_image',
            line: i + 1,
            message: `Referenced image not found: ${imagePath}`,
            severity: 'error',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check that figure files follow the XX_YY_name convention.
   */
  _checkFigureNamingConvention(lines, filePath) {
    const issues = [];

    for (let i = 0; i < lines.length; i++) {
      // Match figure directive with image path
      const figureMatch = lines[i].trim().match(/```\{figure\}\s*(.+)$/);
      if (figureMatch) {
        const imagePath = figureMatch[1].trim();

        // Skip URLs
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('//')) {
          continue;
        }

        // Get the filename
        const filename = path.parse(imagePath).name;

        // Check if it matches XX_YY_name pattern (e.g., 05_03_lens_diagram)
        // Pattern: two digits, underscore, two digits, underscore, rest
        if (!/^\d{2}_\d{2}_/.test(filename)) {
          issues.push({
            type: 'figure_naming_convention',
            line: i + 1,
            message: `Figure '${filename}' doesn't follow XX_YY_name convention`,
            severity: 'info',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check for unclosed directives (missing closing ```).
   *
   * This check uses a simple stack-based approach but only reports issues
   * when there's a clear imbalance (more opens than closes or vice versa).
   */
  _checkUnclosedDirectives(lines, filePath) {
    const issues = [];
    const fenceStack = []; // Stack of {lineNum, fenceType, name}

    for (let i = 0; i < lines.length; i++) {
      const stripped = lines[i].trim();

      // Check for directive start: ```{directive}
      const directiveStart = stripped.match(/^```\{(\w+[\w-]*)\}/);
      if (directiveStart) {
        const directiveName = directiveStart[1];
        fenceStack.push({ lineNum: i + 1, fenceType: 'directive', name: directiveName });
        continue;
      }

      // Check for closing fence FIRST (must be exactly ```)
      // This must come before code block check since ```[a-zA-Z]* matches ``` too
      if (stripped === '```') {
        if (fenceStack.length > 0) {
          fenceStack.pop();
        }
        // If no matching open, we ignore (could be formatting issue)
        continue;
      }

      // Check for code block start: ```language (requires at least one letter)
      // Must be at start of line and NOT a directive
      if (/^```[a-zA-Z]+$/.test(stripped)) {
        fenceStack.push({ lineNum: i + 1, fenceType: 'code', name: stripped.slice(3) });
        continue;
      }
    }

    // Only report if there are clearly unclosed items at end of file
    // and the imbalance is significant (not just minor formatting issues)
    if (fenceStack.length > 0 && fenceStack.length <= 3) {
      // Only report a few clear issues, not hundreds
      for (const fence of fenceStack) {
        if (fence.fenceType === 'directive') {
          issues.push({
            type: 'unclosed_directive',
            line: fence.lineNum,
            message: `Directive '${fence.name}' may be unclosed (missing closing \`\`\`)`,
            severity: 'warning',
            fixable: false
          });
        } else {
          issues.push({
            type: 'unclosed_code_block',
            line: fence.lineNum,
            message: "Code block may be unclosed (missing closing ```)",
            severity: 'warning',
            fixable: false
          });
        }
      }
    }

    return issues;
  }

  /**
   * Collect all :name: labels from a file for duplicate checking.
   */
  _collectLabels(lines, filePath) {
    for (let i = 0; i < lines.length; i++) {
      // Match :name: label syntax
      const nameMatch = lines[i].match(/:name:\s*(\S+)/);
      if (nameMatch) {
        const label = nameMatch[1];
        if (!this.allLabels[label]) {
          this.allLabels[label] = [];
        }
        this.allLabels[label].push({ file: filePath, line: i + 1 });
      }
    }
  }

  /**
   * Get issues for duplicate labels across all files.
   */
  getDuplicateLabelIssues() {
    const duplicateIssues = {};

    for (const [label, locations] of Object.entries(this.allLabels)) {
      if (locations.length > 1) {
        // Report duplicate in all files except the first occurrence
        for (let i = 1; i < locations.length; i++) {
          const location = locations[i];
          const firstLocation = locations[0];

          if (!duplicateIssues[location.file]) {
            duplicateIssues[location.file] = [];
          }

          duplicateIssues[location.file].push({
            type: 'duplicate_label',
            line: location.line,
            message: `Duplicate label '${label}' (first defined in ${firstLocation.file}:${firstLocation.line})`,
            severity: 'error',
            fixable: false
          });
        }
      }
    }

    return duplicateIssues;
  }

  /**
   * Apply automatic fixes to content.
   */
  _applyFixes(content, issues) {
    // Fix split references
    content = content.replace(
      /\{(eq|numref|ref|doc|cite)\}\s*\n\s*`([^`]+)`/gm,
      '{$1}`$2`'
    );

    // Fix trailing whitespace
    const lines = content.split('\n');
    const fixedLines = lines.map(line => line.trimEnd());
    content = fixedLines.join('\n');

    // Fix multiple blank lines (reduce to max 2)
    content = content.replace(/\n{4,}/g, '\n\n\n');

    // Fix blank lines after labels in math blocks
    content = content.replace(
      /(:label:\s*\S+)\s*\n\s*\n/gm,
      '$1\n'
    );

    return content;
  }
}

/**
 * Process all markdown files in directory.
 */
function processDirectory(contentDir, linter, quiet = false) {
  const mdFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        mdFiles.push(fullPath);
      }
    }
  }

  walkDir(contentDir);

  const allIssues = {};
  let filesWithIssues = 0;

  for (const mdFile of mdFiles.sort()) {
    const fileIssues = linter.checkFile(mdFile);

    if (fileIssues.length > 0) {
      const relativePath = path.relative(contentDir, mdFile);
      allIssues[relativePath] = fileIssues;

      if (!quiet) {
        console.log(`\n📄 ${relativePath}`);
        for (const issue of fileIssues) {
          const severityEmoji = {
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
          }[issue.severity || 'info'];

          const fixable = issue.fixable ? " [fixable]" : "";
          console.log(`  ${severityEmoji} Line ${issue.line}: ${issue.message}${fixable}`);
        }
      }
    }
  }

  // Check for duplicate labels across all files
  const duplicateIssues = linter.getDuplicateLabelIssues();
  for (const [filePath, issues] of Object.entries(duplicateIssues)) {
    const relativePath = path.relative(contentDir, filePath);

    if (!allIssues[relativePath]) {
      allIssues[relativePath] = [];
    }
    allIssues[relativePath].push(...issues);

    if (!quiet && issues.length > 0) {
      console.log(`\n📄 ${relativePath} (duplicate labels)`);
      for (const issue of issues) {
        console.log(`  ❌ Line ${issue.line}: ${issue.message}`);
      }
    }
  }

  // Count files with issues
  filesWithIssues = Object.keys(allIssues).length;

  return { allIssues, filesWithIssues, totalFiles: mdFiles.length };
}

/**
 * Print summary of linting results.
 */
function printSummary(allIssues, filesWithIssues, totalFiles, fixMode) {
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);

  // Count by type and severity
  const byType = {};
  const bySeverity = {};
  let fixableCount = 0;

  for (const issues of Object.values(allIssues)) {
    for (const issue of issues) {
      byType[issue.type] = (byType[issue.type] || 0) + 1;
      bySeverity[issue.severity || 'info'] = (bySeverity[issue.severity || 'info'] || 0) + 1;
      if (issue.fixable) {
        fixableCount++;
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  if (fixMode) {
    console.log(`Fixed issues in ${filesWithIssues} out of ${totalFiles} files`);
  } else {
    console.log(`Found ${totalIssues} issues in ${filesWithIssues} out of ${totalFiles} files`);
  }

  if (totalIssues === 0) {
    console.log("✅ No issues found!");
    return;
  }

  console.log(`\nBy Severity:`);
  for (const severity of ['error', 'warning', 'info']) {
    if (bySeverity[severity]) {
      const emoji = { 'error': '❌', 'warning': '⚠️', 'info': 'ℹ️' }[severity];
      console.log(`  ${emoji} ${severity.charAt(0).toUpperCase() + severity.slice(1)}: ${bySeverity[severity]}`);
    }
  }

  console.log(`\nBy Type:`);
  const sortedTypes = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  for (const [issueType, count] of sortedTypes) {
    const readableType = issueType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    console.log(`  • ${readableType}: ${count}`);
  }

  if (!fixMode && fixableCount > 0) {
    console.log(`\n💡 ${fixableCount} issues can be automatically fixed with --fix`);
  }
}

/**
 * Save detailed report to file using shared report utilities.
 */
function saveReport(allIssues, outputFile) {
  // Extract report name from output_file
  const reportName = path.parse(outputFile).name;

  // Create report generator
  const gen = new ReportGenerator(reportName);

  // Build markdown report
  const builder = new MarkdownReportBuilder("MyST Markdown Lint Report");

  // Add summary
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);
  builder.addSection("Summary", 2);
  builder.addList([
    `Total files checked: ${Object.keys(allIssues).length}`,
    `Total issues found: ${totalIssues}`
  ]);

  // Add issues by file
  builder.addSection("Issues by File", 2);

  for (const filePath of Object.keys(allIssues).sort()) {
    const issues = allIssues[filePath];
    builder.addSection(filePath, 3);
    builder.addText(`Found ${issues.length} issues:\n`);

    const issueLines = issues.map(issue => {
      const severity = (issue.severity || 'info').toUpperCase();
      const fixable = issue.fixable ? " [FIXABLE]" : "";
      return `**Line ${issue.line}** [${severity}]${fixable}: ${issue.message}`;
    });

    builder.addList(issueLines);
  }

  // Write markdown report
  const markdownContent = builder.build();
  const filepath = gen.writeMarkdown(markdownContent);

  // Also write JSON report for machine processing
  const jsonData = {
    totalFiles: Object.keys(allIssues).length,
    totalIssues,
    files: {}
  };

  for (const [filePath, issues] of Object.entries(allIssues)) {
    jsonData.files[filePath] = issues.map(issue => ({
      line: issue.line,
      type: issue.type,
      severity: issue.severity || 'info',
      message: issue.message,
      fixable: issue.fixable || false
    }));
  }

  gen.writeJson(jsonData);

  return filepath;
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    fix: args.includes('--fix'),
    contentDir: 'content',
    outputFile: 'lint_report.md',
    strict: args.includes('--strict'),
    quiet: args.includes('--quiet')
  };

  // Parse content-dir
  const contentDirIdx = args.indexOf('--content-dir');
  if (contentDirIdx !== -1 && args[contentDirIdx + 1]) {
    options.contentDir = args[contentDirIdx + 1];
  }

  // Parse output-file
  const outputFileIdx = args.indexOf('--output-file');
  if (outputFileIdx !== -1 && args[outputFileIdx + 1]) {
    options.outputFile = args[outputFileIdx + 1];
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log("=== MyST Markdown Linter ===");
  if (options.fix) {
    console.log("FIX MODE - Issues will be automatically corrected\n");
  }

  const linter = new MystLinter(options.fix, options.contentDir);
  const { allIssues, filesWithIssues, totalFiles } = processDirectory(
    options.contentDir,
    linter,
    options.quiet
  );

  printSummary(allIssues, filesWithIssues, totalFiles, options.fix);

  // Save report
  if (Object.keys(allIssues).length > 0) {
    const reportFile = saveReport(allIssues, options.outputFile);
    console.log(`\n📄 Detailed report saved to: ${reportFile}`);
  }

  // Errors always fail CI; --strict additionally promotes warnings and info.
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);
  const totalErrors = Object.values(allIssues).reduce(
    (sum, issues) => sum + issues.filter(issue => issue.severity === 'error').length,
    0
  );
  if (totalErrors > 0 || (options.strict && totalIssues > 0)) {
    return 1;
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { MystLinter, processDirectory, printSummary, saveReport };
