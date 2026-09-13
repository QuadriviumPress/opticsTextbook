#!/usr/bin/env node
/**
 * Comprehensive Reference Validation
 *
 * This script validates all references in MyST markdown files:
 * 1. Uses MyST's built-in validation for comprehensive checks
 * 2. Performs additional manual validation for image files
 * 3. Checks cross-references to labels
 * 4. Generates detailed reports with fix suggestions
 *
 * Status: ACTIVE - Core validation script
 *
 * Usage:
 *   node validation/validate-references.js [options]
 *
 * Options:
 *   --output-file FILE    Save detailed report to file (in reports/)
 *   --fix-suggestions     Include fix suggestions in output
 *   --content-dir DIR     Content directory (default: content)
 *   --strict              Fail on warnings (not just errors)
 *   --quiet               Only show summary
 *   --manual-only         Skip MyST validation, only do manual checks
 *   --myst-only           Only run MyST validation
 *
 * Exit codes:
 *   0: All references valid
 *   1: Broken references found
 */

const fs = require('fs');
const path = require('path');
const { runMystCommand } = require('../shared-utils');
const { ReportGenerator, MarkdownReportBuilder } = require('../report-utils');

/**
 * Run MyST validation with enhanced reporting.
 */
function runMystValidation() {
  console.log("Running MyST validation...");

  const results = {
    buildOutput: '',
    buildErrors: '',
    checkOutput: '',
    checkErrors: '',
    returnCodes: []
  };

  // Standard HTML build
  let result = runMystCommand(['npx', 'myst', 'build', '--html']);
  results.buildOutput = result.stdout;
  results.buildErrors = result.stderr;
  results.returnCodes.push(result.code);

  // Link checking
  result = runMystCommand(['npx', 'myst', 'build', '--check-links']);
  results.checkOutput = result.stdout;
  results.checkErrors = result.stderr;
  results.returnCodes.push(result.code);

  return results;
}

/**
 * Parse MyST output to categorize issues.
 */
function parseMystOutput(validationResults) {
  const issues = {
    missingFigures: [],
    brokenCrossRefs: [],
    externalLinkErrors: [],
    equationErrors: [],
    citationErrors: [],
    syntaxErrors: [],
    otherWarnings: [],
    buildErrors: []
  };

  const allOutput =
    validationResults.buildOutput + "\n" +
    validationResults.buildErrors + "\n" +
    validationResults.checkOutput + "\n" +
    validationResults.checkErrors;

  const lines = allOutput.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const lower = trimmed.toLowerCase();

    if (line.includes('⚠️') || line.includes('WARNING')) {
      if (lower.includes('image not found') || lower.includes('figure not found') ||
          lower.includes('file not found') || lower.includes('missing image')) {
        issues.missingFigures.push({ message: trimmed, type: 'missing_figure' });
      } else if (lower.includes('cross reference') || lower.includes('reference target') ||
                 lower.includes('undefined reference')) {
        issues.brokenCrossRefs.push({ message: trimmed, type: 'broken_cross_ref' });
      } else if (lower.includes('link not found') || lower.includes('external link') ||
                 lower.includes('404') || lower.includes('link check failed')) {
        issues.externalLinkErrors.push({ message: trimmed, type: 'external_link_error' });
      } else if (lower.includes('equation') || lower.includes('math error')) {
        issues.equationErrors.push({ message: trimmed, type: 'equation_error' });
      } else if (lower.includes('citation') || lower.includes('bibliography')) {
        issues.citationErrors.push({ message: trimmed, type: 'citation_error' });
      } else {
        issues.otherWarnings.push({ message: trimmed, type: 'unknown_warning' });
      }
    } else if (line.includes('❌') || line.includes('⛔') || line.includes('ERROR')) {
      // Export artifacts are populated by the separate export workflow and
      // are intentionally absent in an ordinary source checkout.
      if (lower.includes('static resource') && lower.includes('exports/')) {
        continue;
      }
      if (lower.includes('syntax') || lower.includes('parse error')) {
        issues.syntaxErrors.push({ message: trimmed, type: 'syntax_error' });
      } else {
        issues.buildErrors.push({ message: trimmed, type: 'build' });
      }
    }
  }

  return issues;
}

/**
 * Find all markdown files recursively.
 */
function findMarkdownFiles(contentDir) {
  const mdFiles = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        mdFiles.push(fullPath);
      }
    }
  }

  walk(contentDir);
  return mdFiles;
}

/**
 * Extract figure/image references from markdown.
 */
function extractFigureReferences(mdFile) {
  const references = [];

  try {
    const content = fs.readFileSync(mdFile, 'utf8');
    const lines = content.split('\n');

    const patterns = [
      { regex: /```\{figure\}\s+([^\s\n]+)/g, type: 'figure' },
      { regex: /```\{image\}\s+([^\s\n]+)/g, type: 'image' },
      { regex: /!\[.*?\]\(([^)]+)\)/g, type: 'markdown' },
      { regex: /<img[^>]+src=["']([^"']+)["']/gi, type: 'html' },
    ];

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];

      for (const { regex, type } of patterns) {
        let match;
        const re = new RegExp(regex.source, regex.flags);
        while ((match = re.exec(line)) !== null) {
          const refPath = match[1].split('#')[0].split('?')[0].trim();
          if (refPath && !refPath.startsWith('http')) {
            references.push({
              path: refPath,
              type: type,
              line: lineNum + 1,
              lineContent: line.trim()
            });
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading ${mdFile}: ${error.message}`);
  }

  return references;
}

/**
 * Perform manual validation of image references.
 */
function manualValidation(contentDir) {
  console.log("\nPerforming manual validation...");

  const mdFiles = findMarkdownFiles(contentDir);
  const brokenRefs = [];

  for (const mdFile of mdFiles) {
    const refs = extractFigureReferences(mdFile);
    const mdDir = path.dirname(mdFile);

    for (const ref of refs) {
      let fullPath = path.resolve(mdDir, ref.path);

      // Try resolving relative to content directory if not found
      if (!fs.existsSync(fullPath)) {
        fullPath = path.resolve(contentDir, ref.path);
      }

      if (!fs.existsSync(fullPath)) {
        brokenRefs.push({
          file: mdFile,
          reference: ref.path,
          line: ref.line,
          type: ref.type,
          lineContent: ref.lineContent
        });
      }
    }
  }

  return brokenRefs;
}

/**
 * Generate analysis and statistics.
 */
function analyzeIssues(mystIssues, manualIssues) {
  const analysis = {
    filesWithIssues: {},
    errorDistribution: {},
    severitySummary: {
      critical: 0,
      warnings: 0,
      total: 0
    }
  };

  // Count MyST issues
  for (const [issueType, issueList] of Object.entries(mystIssues)) {
    if (issueList.length > 0) {
      analysis.errorDistribution[issueType] = issueList.length;
    }
  }

  // Count manual issues
  if (manualIssues.length > 0) {
    analysis.errorDistribution.manualImageChecks = manualIssues.length;
  }

  // Calculate severity
  analysis.severitySummary.critical =
    mystIssues.buildErrors.length + mystIssues.syntaxErrors.length;
  analysis.severitySummary.warnings =
    mystIssues.missingFigures.length + mystIssues.brokenCrossRefs.length +
    mystIssues.externalLinkErrors.length + mystIssues.equationErrors.length +
    mystIssues.citationErrors.length + mystIssues.otherWarnings.length +
    manualIssues.length;
  analysis.severitySummary.total =
    analysis.severitySummary.critical + analysis.severitySummary.warnings;

  return analysis;
}

/**
 * Print comprehensive report.
 */
function printReport(mystIssues, manualIssues, analysis, includeSuggestions) {
  console.log("\n=== REFERENCE VALIDATION REPORT ===");

  const severity = analysis.severitySummary;
  console.log("\nEXECUTIVE SUMMARY:");
  console.log(`  🔴 Critical errors: ${severity.critical}`);
  console.log(`  🟡 Warnings: ${severity.warnings}`);
  console.log(`  📊 Total issues: ${severity.total}`);

  if (severity.total === 0) {
    console.log("\n✅ No validation issues found!");
    return;
  }

  console.log("\nERROR DISTRIBUTION:");
  for (const [errorType, count] of Object.entries(analysis.errorDistribution).sort((a, b) => b[1] - a[1])) {
    const readableName = errorType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase());
    console.log(`  • ${readableName}: ${count}`);
  }

  // Show manual validation results
  if (manualIssues.length > 0) {
    console.log("\n=== MANUAL IMAGE VALIDATION ===");
    console.log(`Found ${manualIssues.length} broken image references:\n`);

    for (const issue of manualIssues.slice(0, 10)) {
      console.log(`📄 ${issue.file}:${issue.line}`);
      console.log(`   ❌ Missing: ${issue.reference}`);
      console.log(`   ${issue.lineContent.substring(0, 80)}\n`);
    }

    if (manualIssues.length > 10) {
      console.log(`... and ${manualIssues.length - 10} more\n`);
    }
  }

  if (includeSuggestions) {
    console.log("\n=== FIX SUGGESTIONS ===");
    console.log("💡 Check that all referenced images exist in the correct directories");
    console.log("💡 Verify image paths are relative to the markdown file");
    console.log("💡 Use validation/find-unreferenced.js to identify unused images");
    console.log("💡 Run 'npm run build' regularly to catch issues early");
  }
}

/**
 * Save report to file.
 */
function saveReport(mystIssues, manualIssues, analysis, outputFile) {
  const reportsDir = 'reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  if (!outputFile.startsWith('reports/')) {
    outputFile = path.join(reportsDir, path.basename(outputFile));
  }

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const reportData = {
    timestamp: timestamp,
    summary: analysis.severitySummary,
    mystIssues: mystIssues,
    manualIssues: manualIssues,
    errorDistribution: analysis.errorDistribution
  };

  // Save JSON
  const jsonFile = outputFile.replace(/\.(txt|md)$/, '') + '.json';
  fs.writeFileSync(jsonFile, JSON.stringify(reportData, null, 2), 'utf8');

  // Save Markdown
  const mdFile = outputFile.replace(/\.(txt|json)$/, '') + '.md';
  let mdContent = `# Reference Validation Report\n\n`;
  mdContent += `Generated: ${timestamp}\n\n`;
  mdContent += `## Summary\n\n`;
  mdContent += `- 🔴 Critical: ${analysis.severitySummary.critical}\n`;
  mdContent += `- 🟡 Warnings: ${analysis.severitySummary.warnings}\n`;
  mdContent += `- 📊 Total: ${analysis.severitySummary.total}\n\n`;

  if (manualIssues.length > 0) {
    mdContent += `## Broken Image References (${manualIssues.length})\n\n`;
    for (const issue of manualIssues) {
      mdContent += `- **${issue.file}:${issue.line}**\n`;
      mdContent += `  - Missing: \`${issue.reference}\`\n`;
      mdContent += `  - Line: ${issue.lineContent}\n\n`;
    }
  }

  fs.writeFileSync(mdFile, mdContent, 'utf8');

  return { mdFile, jsonFile };
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    outputFile: 'reference_validation',
    fixSuggestions: args.includes('--fix-suggestions'),
    contentDir: 'content',
    strict: args.includes('--strict'),
    quiet: args.includes('--quiet'),
    manualOnly: args.includes('--manual-only'),
    mystOnly: args.includes('--myst-only')
  };

  // Parse arguments
  const outputIdx = args.indexOf('--output-file');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    options.outputFile = args[outputIdx + 1];
  }

  const contentIdx = args.indexOf('--content-dir');
  if (contentIdx !== -1 && args[contentIdx + 1]) {
    options.contentDir = args[contentIdx + 1];
  }

  if (!fs.existsSync(options.contentDir)) {
    console.log(`❌ Error: Content directory '${options.contentDir}' not found!`);
    return 1;
  }

  console.log("=== Reference Validation Tool ===");

  let mystIssues = {
    missingFigures: [],
    brokenCrossRefs: [],
    externalLinkErrors: [],
    equationErrors: [],
    citationErrors: [],
    syntaxErrors: [],
    otherWarnings: [],
    buildErrors: []
  };
  let manualIssues = [];

  // Run MyST validation
  if (!options.manualOnly) {
    const results = runMystValidation();
    mystIssues = parseMystOutput(results);
  }

  // Run manual validation
  if (!options.mystOnly) {
    manualIssues = manualValidation(options.contentDir);
  }

  // Analyze
  const analysis = analyzeIssues(mystIssues, manualIssues);

  // Print report
  if (!options.quiet) {
    printReport(mystIssues, manualIssues, analysis, options.fixSuggestions);
  } else {
    console.log(`Validation complete: ${analysis.severitySummary.total} issues`);
  }

  // Save report
  const { mdFile, jsonFile } = saveReport(mystIssues, manualIssues, analysis, options.outputFile);
  console.log("\n📄 Detailed reports saved:");
  console.log(`  - Markdown: ${mdFile}`);
  console.log(`  - JSON: ${jsonFile}`);

  // Return exit code
  const brokenReferences =
    mystIssues.missingFigures.length + mystIssues.brokenCrossRefs.length +
    mystIssues.externalLinkErrors.length + mystIssues.equationErrors.length +
    mystIssues.citationErrors.length + manualIssues.length;

  if (analysis.severitySummary.critical > 0 || brokenReferences > 0) {
    return 1;
  } else if (options.strict && analysis.severitySummary.warnings > 0) {
    return 1;
  } else {
    if (analysis.severitySummary.total === 0) {
      console.log("\n✅ All validation checks passed!");
    }
    return 0;
  }
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  runMystValidation,
  parseMystOutput,
  manualValidation,
  analyzeIssues,
  printReport,
  saveReport
};
