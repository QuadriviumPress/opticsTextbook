#!/usr/bin/env node
/**
 * Standardize Labels for Figures, Tables, Sections, and Equations
 *
 * This script checks and fixes labels across all content types to ensure
 * consistency with the project's labeling conventions.
 *
 * Standard formats (using camelCase):
 *   - Figure: fig:chapter-code:descriptiveName
 *   - Table: table:chapter-code:descriptiveName
 *   - Section: (sec:chapter-code:descriptiveName)=
 *   - Chapter: (chapter:chapter-code)=
 *   - Appendix: (appendix:descriptiveName)=
 *   - Equation: eq:chapter-code:descriptiveName
 *
 * Chapter codes: basics, geo, inst, pol, wave, coh, diff, laser, adv, fiber, ray
 *
 * Usage:
 *   node transform/standardize-labels.js [options] [file_path ...]
 *
 * Options:
 *   --fix            Automatically fix non-standard labels
 *   --check          Only check without modifying
 *   --type TYPE      Only process specific type (figure|table|section|chapter|appendix|equation|all)
 *   --verbose        Show detailed information
 *   --quiet          Only show summary
 *
 * Exit codes:
 *   0: All labels are valid or successfully fixed
 *   1: Non-standard labels found (when using --check)
 */

const fs = require('fs');
const path = require('path');
const { getChapterCodes, getChapterCodeFromPath } = require('../shared-utils');

// Load chapter code mappings
const CHAPTER_CODES = getChapterCodes();
const VALID_CHAPTER_CODES = new Set(Object.values(CHAPTER_CODES));

// Equation label mappings removed - no longer needed after label standardization

/**
 * Class representing a label issue.
 */
class LabelIssue {
  constructor(label, lineNum, issueType, suggestedFix, context, labelCategory) {
    this.label = label;
    this.lineNum = lineNum;
    this.issueType = issueType;
    this.suggestedFix = suggestedFix;
    this.context = context;
    this.labelCategory = labelCategory;
  }

  toString() {
    return `Line ${this.lineNum}: [${this.labelCategory}] ${this.issueType} - '${this.label}' -> '${this.suggestedFix}'`;
  }
}

/**
 * Convert a label name to camelCase.
 */
function normalizeLabelName(name) {
  const parts = name.split(/[-_]+/);
  const expandedParts = [];

  for (const part of parts) {
    const splitParts = part.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
    expandedParts.push(...splitParts);
  }

  const cleanParts = expandedParts.filter(p => p).map(p => p.toLowerCase());

  if (cleanParts.length === 0) return '';

  let result = cleanParts[0];
  for (let i = 1; i < cleanParts.length; i++) {
    result += cleanParts[i].charAt(0).toUpperCase() + cleanParts[i].slice(1);
  }

  return result.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Extract the descriptive part from various label formats.
 */
function extractDescriptivePart(label) {
  const prefixes = ['Fig_', 'fig:', 'fig.', 'fig', 'table_', 'table:', 'table.',
                    'section.', 'subsection.', 'sec:', 'sec.', 'sec',
                    'chapter.', 'chapter:', 'appendix:', 'appendix.',
                    'eq.', 'eq:', 'eq-'];

  for (const prefix of prefixes) {
    if (label.startsWith(prefix)) {
      label = label.substring(prefix.length);
      break;
    }
  }

  // Remove chapter numbers
  label = label.replace(/^\d+[-_]\d*[-_]/, '');
  label = label.replace(/^\d+[-_]/, '');

  // Remove common chapter code prefixes
  for (const code of VALID_CHAPTER_CODES) {
    if (label.startsWith(`${code}:`) || label.startsWith(`${code}-`) || label.startsWith(`${code}_`)) {
      label = label.substring(code.length + 1);
      break;
    }
  }

  if (label.startsWith('Fiber')) {
    label = label.substring(5);
  }

  return label;
}

/**
 * Validation functions for each label type.
 */
const validators = {
  figure: (label, chapterCode) => {
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return /^fig:[a-z][a-zA-Z0-9]*$/.test(label);
    }
    return new RegExp(`^fig:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
  },

  table: (label, chapterCode) => {
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return /^table:[a-z][a-zA-Z0-9]*$/.test(label);
    }
    return new RegExp(`^table:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
  },

  section: (label, chapterCode) => {
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return /^sec:[a-z][a-zA-Z0-9]*$/.test(label);
    }
    return new RegExp(`^sec:${chapterCode}:[a-z][a-zA-Z0-9]*$`).test(label);
  },

  chapter: (label) => /^chapter:[a-z][a-zA-Z0-9]*$/.test(label),

  appendix: (label) => /^appendix:[a-z][a-zA-Z0-9]*$/.test(label),

  equation: (label, chapterCode) => {
    return new RegExp(`^eq:${chapterCode}:[a-z][a-zA-Z0-9-]+$`).test(label);
  }
};

/**
 * Generate suggested fixes for each label type.
 */
const fixGenerators = {
  figure: (oldLabel, chapterCode) => {
    let name = extractDescriptivePart(oldLabel);
    name = normalizeLabelName(name);
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return `fig:${name}`;
    }
    return `fig:${chapterCode}:${name}`;
  },

  table: (oldLabel, chapterCode) => {
    let name = extractDescriptivePart(oldLabel);
    name = normalizeLabelName(name);
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return `table:${name}`;
    }
    return `table:${chapterCode}:${name}`;
  },

  section: (oldLabel, chapterCode) => {
    let name = extractDescriptivePart(oldLabel);
    name = normalizeLabelName(name);
    if (chapterCode === 'appendix' || chapterCode === 'preface') {
      return `sec:${name}`;
    }
    return `sec:${chapterCode}:${name}`;
  },

  chapter: (oldLabel, chapterCode) => {
    let name = oldLabel.replace('chapter.', '').replace('chapter:', '');
    name = normalizeLabelName(name);
    if (chapterCode && VALID_CHAPTER_CODES.has(chapterCode)) {
      return `chapter:${chapterCode}`;
    }
    return `chapter:${name}`;
  },

  appendix: (oldLabel) => {
    let name = oldLabel.replace('appendix:', '').replace('appendix.', '');
    name = normalizeLabelName(name);
    return `appendix:${name}`;
  },

  equation: (oldLabel, chapterCode) => {
    let name = oldLabel;
    if (name.startsWith('eq.')) {
      name = name.substring(3);
    } else if (name.startsWith('eq:')) {
      name = name.substring(3);
    } else if (name.startsWith('eq-')) {
      name = name.substring(3);
    }

    // Check if it already has a chapter code
    for (const code of VALID_CHAPTER_CODES) {
      if (name.startsWith(`${code}:`) || name.startsWith(`${code}-`)) {
        name = name.substring(code.length + 1);
        break;
      }
    }

    name = name.replace(/_/g, '-');
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    return `eq:${chapterCode}:${name}`;
  }
};

/**
 * Find all label issues in content.
 */
function findIssues(content, chapterCode, labelTypes) {
  const issues = [];
  const lines = content.split('\n');

  // Figure and table labels in directives
  if (labelTypes.includes('figure') || labelTypes.includes('table')) {
    const namePattern = /:name:\s*(\S+)/;
    let inBlock = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes('```{figure}') || line.includes('```{image}')) {
        inBlock = 'figure';
      } else if (line.includes('```{table}') || line.includes('```{list-table}')) {
        inBlock = 'table';
      } else if (inBlock && line.trim().startsWith(':name:')) {
        const match = line.match(namePattern);
        if (match && labelTypes.includes(inBlock)) {
          const label = match[1];
          if (!validators[inBlock](label, chapterCode)) {
            issues.push(new LabelIssue(
              label, i + 1, `non-standard ${inBlock} label`,
              fixGenerators[inBlock](label, chapterCode),
              line.trim(), inBlock
            ));
          }
        }
      } else if (inBlock && line.trim() === '```') {
        inBlock = null;
      }
    }
  }

  // Section, chapter, and appendix labels
  if (labelTypes.includes('section') || labelTypes.includes('chapter') || labelTypes.includes('appendix')) {
    const sectionPattern = /^\(([^)]+)\)\s*=$/;
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(sectionPattern);
      if (match) {
        const label = match[1];
        let type = null;

        if (label.startsWith('chapter')) type = 'chapter';
        else if (label.startsWith('appendix')) type = 'appendix';
        else if (label.startsWith('sec') || label.startsWith('section') || label.startsWith('subsection')) type = 'section';

        if (type && labelTypes.includes(type) && !validators[type](label, chapterCode)) {
          issues.push(new LabelIssue(
            label, i + 1, `non-standard ${type} label`,
            fixGenerators[type](label, chapterCode),
            lines[i].trim(), type
          ));
        }
      }
    }
  }

  // Equation labels (:label: inside math/equation directives only).
  // Other directives such as {phet} also use :label: and must not be
  // validated as equations.
  if (labelTypes.includes('equation')) {
    const labelPattern = /:label:\s*(\S+)/;
    let inMath = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('```{math}') || line.includes('```{equation}')) {
        inMath = true;
        continue;
      }
      if (inMath && line.trim() === '```') {
        inMath = false;
        continue;
      }
      if (!inMath) continue;

      const match = line.match(labelPattern);
      if (!match) continue;

      const label = match[1];
      if (!validators.equation(label, chapterCode)) {
        issues.push(new LabelIssue(
          label, i + 1, 'non-standard equation label',
          fixGenerators.equation(label, chapterCode),
          line.trim(),
          'equation'
        ));
      }
    }
  }

  return issues;
}

/**
 * Apply fixes to content.
 */
function fixContent(content, issues) {
  let newContent = content;
  const labelMapping = {};

  const labelFixes = {};
  for (const issue of issues) {
    labelFixes[issue.label] = issue.suggestedFix;
  }

  for (const [oldLabel, newLabel] of Object.entries(labelFixes)) {
    labelMapping[oldLabel] = newLabel;

    // Replace in directives
    newContent = newContent.replace(`:name: ${oldLabel}`, `:name: ${newLabel}`);
    newContent = newContent.replace(`:label: ${oldLabel}`, `:label: ${newLabel}`);
    newContent = newContent.replace(`(${oldLabel})=`, `(${newLabel})=`);

    // Replace references
    const escapedOld = oldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    newContent = newContent.replace(new RegExp(`\\{numref\\}\`${escapedOld}\``, 'g'), `{numref}\`${newLabel}\``);
    newContent = newContent.replace(new RegExp(`\\{ref\\}\`${escapedOld}\``, 'g'), `{ref}\`${newLabel}\``);
    newContent = newContent.replace(new RegExp(`\\{eq\\}\`${escapedOld}\``, 'g'), `{eq}\`${newLabel}\``);
    newContent = newContent.replace(new RegExp(`\\]\\(#${escapedOld}\\)`, 'g'), `](#${newLabel})`);
  }

  return { newContent, labelMapping };
}

/**
 * Lint a single file.
 */
function lintFile(filePath, options) {
  const chapterCode = getChapterCodeFromPath(filePath);
  if (!chapterCode) {
    if (options.verbose) {
      console.log(`  Skipping ${filePath} (not in a chapter/appendix directory)`);
    }
    return { count: 0, issues: [], labelMapping: {} };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = findIssues(content, chapterCode, options.labelTypes);
  let labelMapping = {};

  if (issues.length > 0 && options.fix) {
    const result = fixContent(content, issues);
    fs.writeFileSync(filePath, result.newContent, 'utf8');
    labelMapping = result.labelMapping;
    if (options.verbose) {
      console.log(`  Fixed ${issues.length} issues in ${filePath}`);
    }
  }

  return { count: issues.length, issues, labelMapping };
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    fix: args.includes('--fix'),
    check: args.includes('--check'),
    type: 'all',
    verbose: args.includes('--verbose'),
    quiet: args.includes('--quiet'),
    files: [],
    labelTypes: ['figure', 'table', 'section', 'chapter', 'appendix', 'equation']
  };

  // Parse type option
  const typeIdx = args.indexOf('--type');
  if (typeIdx !== -1 && args[typeIdx + 1]) {
    options.type = args[typeIdx + 1];
    if (options.type !== 'all') {
      options.labelTypes = [options.type];
    }
  }

  // Get file arguments
  options.files = args.filter(arg => !arg.startsWith('--') && fs.existsSync(arg));

  // Find files to lint
  let files;
  if (options.files.length > 0) {
    files = options.files;
  } else {
    const contentDir = path.join(__dirname, '..', '..', 'content');
    function findMdFiles(dir) {
      const results = [];
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results.push(...findMdFiles(fullPath));
        } else if (item.endsWith('.md')) {
          results.push(fullPath);
        }
      }
      return results;
    }
    files = findMdFiles(contentDir);
  }

  let totalIssues = 0;
  const categoryCounts = {};
  const allMappings = {};

  for (const filePath of files) {
    const result = lintFile(filePath, options);
    let { count, issues, labelMapping } = result;

    totalIssues += count;
    Object.assign(allMappings, labelMapping);

    for (const issue of issues) {
      categoryCounts[issue.labelCategory] = (categoryCounts[issue.labelCategory] || 0) + 1;
    }

    if (issues.length > 0 && !options.quiet) {
      console.log(`\n${filePath}:`);
      for (const issue of issues) {
        console.log(`  ${issue.toString()}`);
      }
    }
  }

  // Summary
  if (totalIssues > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('Summary by category:');
    for (const category of ['figure', 'table', 'section', 'chapter', 'appendix', 'equation']) {
      if (categoryCounts[category]) {
        console.log(`  ${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryCounts[category]} issues`);
      }
    }
    console.log('='.repeat(60));

    if (options.fix) {
      console.log(`\n✓ Fixed ${totalIssues} label issues`);
      return 0;
    } else {
      console.log(`\n✗ Found ${totalIssues} non-standard labels`);
      console.log('  Run with --fix to automatically convert them');
      return 1;
    }
  } else {
    if (!options.quiet) {
      console.log('\n✓ All labels follow the standard format');
    }
    return 0;
  }
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  LabelIssue,
  normalizeLabelName,
  validators,
  fixGenerators,
  findIssues,
  fixContent,
  lintFile
};
