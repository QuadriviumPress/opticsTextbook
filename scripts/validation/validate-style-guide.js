#!/usr/bin/env node
/**
 * Style Guide Validator
 *
 * Enforces the Optics Textbook style guide conventions documented in AGENTS.md.
 *
 * Status: ACTIVE - Style guide enforcement
 *    Used in validation workflow to ensure consistent formatting.
 *    Run via: npm run validate:style
 *
 * Checks:
 * 1. Problem Sets format: **Problem X.Y: Title**
 * 2. Problem sub-parts: **(a)**, **(b)**, **(c)** in bold
 * 3. Cross-references: MyST {ref} and {eq} syntax
 * 4. Equation labels: eq:chap-abbrev:descriptiveName format
 * 5. Figure labels: fig:chap-abbrev:descriptiveName format
 * 6. Callout boxes: Proper usage of {note}, {important}, {tip}, {warning}
 * 7. Chapter structure: Learning objectives present
 *
 * Usage:
 *    node validate-style-guide.js [--content-dir DIR] [--quiet] [--strict]
 *
 * Options:
 *    --content-dir DIR    Directory to validate (default: content)
 *    --quiet              Only show summary
 *    --strict             Exit with error code if issues found
 */

const fs = require('fs');
const path = require('path');
const { ReportGenerator, MarkdownReportBuilder } = require('../report-utils');

class StyleGuideValidator {
  constructor(contentDir = 'content') {
    this.contentDir = contentDir;
    this.issues = {};
  }

  /**
   * Validate a single markdown file against style guide.
   */
  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      const fileIssues = [];

      // Run all style guide checks
      fileIssues.push(...this._checkProblemSetFormat(lines, filePath));
      fileIssues.push(...this._checkProblemSubParts(lines, filePath));
      fileIssues.push(...this._checkCrossReferenceFormat(lines, filePath));
      fileIssues.push(...this._checkEquationLabelFormat(lines, filePath));
      fileIssues.push(...this._checkFigureLabelFormat(lines, filePath));
      fileIssues.push(...this._checkCalloutBoxUsage(lines, filePath));
      fileIssues.push(...this._checkChapterStructure(lines, filePath));

      return fileIssues;
    } catch (err) {
      return [{ type: 'error', line: 0, message: `Error reading file: ${err.message}`, severity: 'error' }];
    }
  }

  /**
   * Check problem set format: **Problem X.Y: Title**
   */
  _checkProblemSetFormat(lines, filePath) {
    const issues = [];
    const correctPattern = /^\*\*Problem\s+\d+\.\d+:\s+.+\*\*$/;
    const problemPattern = /Problem\s+\d+\.\d+/i;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if line contains a problem reference
      if (problemPattern.test(line) && line.startsWith('**') && line.endsWith('**')) {
        // It's formatted in bold, check if format is correct
        if (!correctPattern.test(line)) {
          issues.push({
            type: 'problem_set_format',
            line: i + 1,
            message: 'Problem format should be: **Problem X.Y: Title** (with colon after number)',
            severity: 'warning',
            suggestion: 'Use format: **Problem X.Y: Title**'
          });
        }
      } else if (problemPattern.test(line) && !line.includes('```') && !line.includes('{')) {
        // Problem reference exists but not in bold
        issues.push({
          type: 'problem_set_format',
          line: i + 1,
          message: 'Problem heading should be in bold: **Problem X.Y: Title**',
          severity: 'warning',
          suggestion: 'Wrap in **bold** markers'
        });
      }
    }

    return issues;
  }

  /**
   * Check problem sub-parts format: **(a)**, **(b)**, **(c)**
   */
  _checkProblemSubParts(lines, filePath) {
    const issues = [];
    const correctPattern = /^\*\*\([a-z]\)\*\*/;
    const subPartPattern = /^\([a-z]\)/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for sub-parts that aren't in bold
      if (subPartPattern.test(line) && !correctPattern.test(line)) {
        // Make sure it's at start of line or after list marker
        const lineStart = line.replace(/^[\s-*]+/, '');
        if (subPartPattern.test(lineStart)) {
          issues.push({
            type: 'problem_subpart_format',
            line: i + 1,
            message: 'Problem sub-parts should be in bold: **(a)**, **(b)**, **(c)**',
            severity: 'info',
            suggestion: 'Use format: **(a)** description'
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check cross-reference format: Use MyST {ref} and {eq} syntax
   */
  _checkCrossReferenceFormat(lines, filePath) {
    const issues = [];

    // Common incorrect patterns for cross-references
    const badPatterns = [
      { pattern: /\[eq(?:uation)?\s+\d+/i, message: 'Use MyST {eq}`label` syntax instead of [equation X]' },
      { pattern: /\[fig(?:ure)?\s+\d+/i, message: 'Use MyST {ref}`label` syntax instead of [figure X]' },
      { pattern: /equation\s+\(\d+\)/i, message: 'Use MyST {eq}`label` syntax for equation references' },
      { pattern: /see\s+equation\s+/i, message: 'Use MyST {eq}`label` syntax for equation references' },
      { pattern: /see\s+figure\s+\d+/i, message: 'Use MyST {ref}`label` syntax for figure references' }
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip code blocks and math blocks
      if (line.trim().startsWith('```') || line.trim().startsWith('$')) {
        continue;
      }

      for (const { pattern, message } of badPatterns) {
        if (pattern.test(line)) {
          issues.push({
            type: 'cross_reference_format',
            line: i + 1,
            message,
            severity: 'warning'
          });
          break; // Only report once per line
        }
      }
    }

    return issues;
  }

  /**
   * Check equation label format: eq:chap-abbrev:descriptiveName
   */
  _checkEquationLabelFormat(lines, filePath) {
    const issues = [];
    const labelPattern = /:label:\s*([^\s\n]+)/;
    const preferredPattern = /^eq:[a-z]+:[a-z0-9\-]+$/i;

    let inMathBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track math blocks
      if (/```\{math\}/.test(line)) {
        inMathBlock = true;
        continue;
      }
      if (inMathBlock && line.trim() === '```') {
        inMathBlock = false;
        continue;
      }

      // Check labels in math blocks
      if (inMathBlock) {
        const match = line.match(labelPattern);
        if (match) {
          const label = match[1];

          // Check if it follows the preferred eq:chapter:name format
          if (!preferredPattern.test(label)) {
            // Allow some legacy patterns but warn about preferred format
            if (label.startsWith('eq')) {
              issues.push({
                type: 'equation_label_format',
                line: i + 1,
                message: `Equation label '${label}' should follow format: eq:chap-abbrev:descriptiveName`,
                severity: 'info',
                suggestion: 'Example: eq:geo:snellLaw or eq:wave:interference'
              });
            }
          }
        }
      }
    }

    return issues;
  }

  /**
   * Check figure label format: fig:chap-abbrev:descriptiveName
   */
  _checkFigureLabelFormat(lines, filePath) {
    const issues = [];
    const namePattern = /:name:\s*([^\s\n]+)/;
    const preferredPattern = /^fig:[a-z]+:[a-z0-9\-]+$/i;

    let inFigureBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track figure blocks
      if (/```\{figure\}/.test(line)) {
        inFigureBlock = true;
        continue;
      }
      if (inFigureBlock && line.trim() === '```') {
        inFigureBlock = false;
        continue;
      }

      // Check :name: labels in figure blocks
      if (inFigureBlock) {
        const match = line.match(namePattern);
        if (match) {
          const label = match[1];

          // Check if it follows the preferred fig:chapter:name format
          if (!preferredPattern.test(label)) {
            // Don't warn about Fig_XX_YY pattern (legacy convention)
            if (!label.startsWith('Fig_') && label.startsWith('fig')) {
              issues.push({
                type: 'figure_label_format',
                line: i + 1,
                message: `Figure label '${label}' should follow format: fig:chap-abbrev:descriptiveName`,
                severity: 'info',
                suggestion: 'Example: fig:geo:refraction or fig:wave:diffraction'
              });
            }
          }
        }
      }
    }

    return issues;
  }

  /**
   * Check callout box usage: {note}, {important}, {tip}, {warning}
   */
  _checkCalloutBoxUsage(lines, filePath) {
    const issues = [];

    // Define proper usage patterns
    const calloutGuidelines = {
      note: ['learning objective', 'external resource', 'additional information', 'link', 'reference'],
      important: ['key equation', 'law', 'principle', 'theorem', 'fundamental'],
      tip: ['practical', 'shortcut', 'advice', 'hint', 'strategy'],
      warning: ['common mistake', 'pitfall', 'error', 'caution', 'avoid']
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for callout directive usage
      const calloutMatch = line.trim().match(/```\{(note|important|tip|warning|caution|attention|danger)\}/);
      if (calloutMatch) {
        const calloutType = calloutMatch[1];

        // For now, just track usage - we could add content analysis later
        // This is a placeholder for future enhancement to check if content matches intent

        // Check if using deprecated callout types
        if (['caution', 'attention', 'danger'].includes(calloutType)) {
          const suggested = calloutType === 'danger' ? 'warning' :
                          calloutType === 'caution' ? 'warning' :
                          'note or important';
          issues.push({
            type: 'callout_box_usage',
            line: i + 1,
            message: `Consider using standard callout types: {note}, {important}, {tip}, or {warning} instead of {${calloutType}}`,
            severity: 'info',
            suggestion: `Use {${suggested}} for consistency with style guide`
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check chapter structure: Learning objectives, content, summary
   */
  _checkChapterStructure(lines, filePath) {
    const issues = [];

    // Only check files that appear to be main chapter files (not subdirectories)
    const relativePath = path.relative(this.contentDir, filePath);
    const pathParts = relativePath.split(path.sep);

    // Skip if not in a chapter directory or is an index file
    if (pathParts.length !== 2 || !pathParts[1].match(/^\d+/)) {
      return issues;
    }

    // Check for learning objectives (should have a note box near the top)
    let hasLearningObjectives = false;
    let hasChapterSummary = false;
    let firstNoteIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();

      // Check for learning objectives
      if (line.includes('learning objective') || line.includes('objectives')) {
        hasLearningObjectives = true;
      }

      // Check for note box
      if (line.includes('```{note}') && firstNoteIndex === -1) {
        firstNoteIndex = i;
      }

      // Check for chapter summary or conclusion
      if (line.includes('## summary') || line.includes('## conclusion') ||
          line.includes('## chapter summary')) {
        hasChapterSummary = true;
      }
    }

    // Warn if no learning objectives found
    if (!hasLearningObjectives && pathParts[1].endsWith('.md')) {
      issues.push({
        type: 'chapter_structure',
        line: 1,
        message: 'Chapter should include learning objectives (typically in a {note} box)',
        severity: 'info',
        suggestion: 'Add learning objectives near the beginning of the chapter'
      });
    }

    // Suggest chapter summary if not present
    if (!hasChapterSummary && pathParts[1].endsWith('.md') && lines.length > 100) {
      issues.push({
        type: 'chapter_structure',
        line: lines.length,
        message: 'Chapter should include a summary section at the end',
        severity: 'info',
        suggestion: 'Add ## Chapter Summary section'
      });
    }

    return issues;
  }
}

/**
 * Process all markdown files in directory.
 */
function processDirectory(contentDir, validator, quiet = false) {
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
    const fileIssues = validator.validateFile(mdFile);

    if (fileIssues.length > 0) {
      const relativePath = path.relative(contentDir, mdFile);
      allIssues[relativePath] = fileIssues;
      filesWithIssues++;

      if (!quiet) {
        console.log(`\n📄 ${relativePath}`);
        for (const issue of fileIssues) {
          const severityEmoji = {
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
          }[issue.severity || 'info'];

          console.log(`  ${severityEmoji} Line ${issue.line}: ${issue.message}`);
          if (issue.suggestion) {
            console.log(`     💡 ${issue.suggestion}`);
          }
        }
      }
    }
  }

  return { allIssues, filesWithIssues, totalFiles: mdFiles.length };
}

/**
 * Print summary of validation results.
 */
function printSummary(allIssues, filesWithIssues, totalFiles) {
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);

  // Count by type and severity
  const byType = {};
  const bySeverity = {};

  for (const issues of Object.values(allIssues)) {
    for (const issue of issues) {
      byType[issue.type] = (byType[issue.type] || 0) + 1;
      bySeverity[issue.severity || 'info'] = (bySeverity[issue.severity || 'info'] || 0) + 1;
    }
  }

  console.log(`\n=== STYLE GUIDE VALIDATION SUMMARY ===`);
  console.log(`Found ${totalIssues} style guide issues in ${filesWithIssues} out of ${totalFiles} files`);

  if (totalIssues === 0) {
    console.log("✅ All files follow the style guide!");
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

  console.log(`\n💡 See AGENTS.md for complete style guide documentation`);
}

/**
 * Save detailed report to file.
 */
function saveReport(allIssues, outputFile = 'style_guide_validation_report.md') {
  const gen = new ReportGenerator('style_guide_validation');
  const builder = new MarkdownReportBuilder("Style Guide Validation Report");

  // Add summary
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);
  builder.addSection("Summary", 2);
  builder.addList([
    `Total files checked: ${Object.keys(allIssues).length}`,
    `Total issues found: ${totalIssues}`,
    `Style guide reference: AGENTS.md`
  ]);

  // Add issues by file
  builder.addSection("Issues by File", 2);

  for (const filePath of Object.keys(allIssues).sort()) {
    const issues = allIssues[filePath];
    builder.addSection(filePath, 3);
    builder.addText(`Found ${issues.length} style guide issues:\n`);

    const issueLines = issues.map(issue => {
      const severity = (issue.severity || 'info').toUpperCase();
      const suggestion = issue.suggestion ? ` | Suggestion: ${issue.suggestion}` : '';
      return `**Line ${issue.line}** [${severity}]: ${issue.message}${suggestion}`;
    });

    builder.addList(issueLines);
  }

  // Write markdown report
  const markdownContent = builder.build();
  const filepath = gen.writeMarkdown(markdownContent);

  // Write JSON report
  const jsonData = {
    totalFiles: Object.keys(allIssues).length,
    totalIssues,
    styleGuideRef: 'AGENTS.md',
    files: {}
  };

  for (const [filePath, issues] of Object.entries(allIssues)) {
    jsonData.files[filePath] = issues.map(issue => ({
      line: issue.line,
      type: issue.type,
      severity: issue.severity || 'info',
      message: issue.message,
      suggestion: issue.suggestion || null
    }));
  }

  gen.writeJson(jsonData);

  return filepath;
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    contentDir: 'content',
    quiet: args.includes('--quiet'),
    strict: args.includes('--strict')
  };

  // Parse content-dir
  const contentDirIdx = args.indexOf('--content-dir');
  if (contentDirIdx !== -1 && args[contentDirIdx + 1]) {
    options.contentDir = args[contentDirIdx + 1];
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log("=== Style Guide Validation ===");
  console.log(`Checking files in: ${options.contentDir}`);
  console.log(`Reference: AGENTS.md\n`);

  const validator = new StyleGuideValidator(options.contentDir);
  const { allIssues, filesWithIssues, totalFiles } = processDirectory(
    options.contentDir,
    validator,
    options.quiet
  );

  printSummary(allIssues, filesWithIssues, totalFiles);

  // Save report if issues found
  if (Object.keys(allIssues).length > 0) {
    const reportFile = saveReport(allIssues);
    console.log(`\n📄 Detailed report saved to: ${reportFile}`);
  }

  // Return exit code
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => sum + issues.length, 0);
  if (options.strict && totalIssues > 0) {
    return 1;
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { StyleGuideValidator, processDirectory, printSummary, saveReport };
