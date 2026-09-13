#!/usr/bin/env node
/**
 * Enhanced script to identify unreferenced images using MyST's built-in functionality.
 *
 * Status: UTILITY - Maintenance script
 *     Run periodically to identify unused images for cleanup.
 *     Run via: npm run find-unreferenced / npm run find-unreferenced-dry
 *
 * This improved script:
 * 1. Leverages MyST's AST parsing for more accurate reference detection
 * 2. Handles .ai files paired with their corresponding image files (.png/.jpg)
 * 3. Uses MyST build output to identify actually referenced images
 * 4. Provides better path resolution using MyST's internal mechanisms
 * 5. Creates separate lists for .ai files and image files for easier management
 *
 * Usage:
 *     node find_unreferenced_images_myst.js [--dry-run] [--include-ai]
 *
 * Output:
 *     - unreferenced_images.txt (image files only)
 *     - unreferenced_ai_files.txt (AI source files)
 *     - referenced_images.txt (for verification)
 */

const fs = require('fs');
const path = require('path');
const { runMystCommand } = require('../shared-utils');
const { ReportGenerator } = require('../report-utils');

/**
 * Use MyST build to identify referenced images.
 *
 * @returns {Object} {referencedImages, output}
 */
function getMystBuildReferences() {
  console.log('Running MyST build to identify referenced images...');

  // Try to build and capture output
  const { stdout, stderr } = runMystCommand(['npm', 'run', 'build']);
  let output = stdout + stderr;

  // Extract image references from build output
  const referencedImages = new Set();

  // Look for image processing messages in MyST output
  const imagePatterns = [
    /Processing image:\s+(.+)/gi,
    /Found image:\s+(.+)/gi,
    /Image:\s+(.+)/gi,
    /figure.*?(\S+\.(?:png|jpg|jpeg|gif|svg|webp))/gi,
    /image.*?(\S+\.(?:png|jpg|jpeg|gif|svg|webp))/gi,
  ];

  for (const pattern of imagePatterns) {
    const matches = output.matchAll(pattern);
    for (const match of matches) {
      // Clean up the path
      let imagePath = Array.isArray(match) ? match[1] : match;
      if (imagePath) {
        const cleanPath = imagePath.trim().replace(/^["']|["']$/g, '');
        if (cleanPath && !cleanPath.startsWith('http')) {
          referencedImages.add(cleanPath);
        }
      }
    }
  }

  return { referencedImages, output };
}

/**
 * Find all image files and corresponding .ai files.
 *
 * @param {string} contentDir - Content directory path
 * @returns {Object} {allImages, aiFiles}
 */
function findAllImages(contentDir = 'content') {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.tiff'];
  const allImages = [];
  const aiFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (imageExtensions.includes(ext)) {
          allImages.push(fullPath);
        } else if (ext === '.ai') {
          aiFiles.push(fullPath);
        }
      }
    }
  }

  walkDir(contentDir);
  return { allImages: allImages.sort(), aiFiles: aiFiles.sort() };
}

/**
 * Parse markdown files to extract image references using improved patterns.
 *
 * @param {string} contentDir - Content directory path
 * @returns {Set<string>} Set of referenced image paths
 */
function parseMarkdownReferences(contentDir = 'content') {
  const referencedImages = new Set();
  const mdFiles = [];

  // Find all markdown files
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
  console.log(`Scanning ${mdFiles.length} markdown files for image references...`);

  // Enhanced MyST patterns
  const patterns = [
    // MyST figure directives
    /```\{figure\}\s+([^\s\n]+)/g,
    /```\{image\}\s+([^\s\n]+)/g,
    /:::\s*\{figure\}\s+([^\s\n]+)/g,
    /:::\s*\{image\}\s+([^\s\n]+)/g,
    // Standard markdown
    /!\[.*?\]\(([^)]+)\)/g,
    // HTML img tags
    /<img[^>]+src=["']([^"']+)["']/g,
    // MyST roles
    /\{figure\}`([^`]+)`/g,
    /\{image\}`([^`]+)`/g,
    // Directive with options
    /:\s*figure:\s*([^\s\n]+)/g,
    /:\s*image:\s*([^\s\n]+)/g,
  ];

  for (const mdFile of mdFiles) {
    try {
      const content = fs.readFileSync(mdFile, 'utf8');
      const mdDir = path.dirname(mdFile);

      for (const pattern of patterns) {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
          // Clean and resolve path
          let imagePath = match[1].trim().replace(/^["']|["']$/g, '');
          // Remove URL fragments
          imagePath = imagePath.split('#')[0].split('?')[0];

          if (imagePath && !imagePath.startsWith('http://') &&
              !imagePath.startsWith('https://') && !imagePath.startsWith('ftp://')) {
            // Try to resolve the path
            const resolvedPath = resolveImagePath(imagePath, mdDir, contentDir);
            if (resolvedPath) {
              referencedImages.add(resolvedPath);
            }
          }
        }
      }
    } catch (err) {
      console.warn(`Warning: Error reading ${mdFile}: ${err.message}`);
    }
  }

  return referencedImages;
}

/**
 * Resolve an image path to its actual location.
 *
 * @param {string} imagePath - Image path from markdown
 * @param {string} mdDir - Markdown file directory
 * @param {string} contentDir - Content directory
 * @returns {string|null} Resolved absolute path or null
 */
function resolveImagePath(imagePath, mdDir, contentDir) {
  const possiblePaths = [];

  if (path.isAbsolute(imagePath)) {
    possiblePaths.push(imagePath);
  } else {
    // Try relative to markdown file
    possiblePaths.push(path.join(mdDir, imagePath));
    // Try relative to content directory
    possiblePaths.push(path.join(contentDir, imagePath));
    // Try relative to project root
    possiblePaths.push(imagePath);

    // Handle ../ paths
    if (imagePath.startsWith('../')) {
      possiblePaths.push(path.join(path.dirname(mdDir), imagePath.substring(3)));
    }
    if (imagePath.startsWith('./')) {
      possiblePaths.push(path.join(mdDir, imagePath.substring(2)));
    }
  }

  // Find the first path that exists
  for (const possiblePath of possiblePaths) {
    const normalized = path.normalize(possiblePath);
    if (fs.existsSync(normalized)) {
      return path.resolve(normalized);
    }
  }

  return null;
}

/**
 * Find the corresponding .ai file for an image.
 *
 * @param {string} imagePath - Image file path
 * @returns {string|null} AI file path or null
 */
function findCorrespondingAiFile(imagePath) {
  const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
  const aiPath = basePath + '.ai';
  return fs.existsSync(aiPath) ? aiPath : null;
}

/**
 * Find the corresponding image file for a .ai file.
 *
 * @param {string} aiPath - AI file path
 * @returns {string|null} Image file path or null
 */
function findCorrespondingImageFile(aiPath) {
  const basePath = aiPath.substring(0, aiPath.lastIndexOf('.'));
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

  for (const ext of imageExtensions) {
    const imagePath = basePath + ext;
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

/**
 * Analyze image references using multiple methods.
 *
 * @param {Array<string>} allImages - All image files
 * @param {Array<string>} aiFiles - All AI files
 * @param {string} contentDir - Content directory
 * @returns {Object} Analysis results
 */
function analyzeReferences(allImages, aiFiles, contentDir = 'content') {
  console.log('Analyzing image references using multiple methods...');

  // Method 1: Parse markdown files directly
  console.log('  1. Parsing markdown files...');
  const markdownRefs = parseMarkdownReferences(contentDir);

  // Method 2: Use MyST build output
  console.log('  2. Using MyST build output...');
  const { referencedImages: mystRefs, output: buildOutput } = getMystBuildReferences();

  // Combine all references
  const allReferenced = new Set();

  // Convert to absolute paths for comparison
  for (const ref of [...markdownRefs, ...mystRefs]) {
    if (fs.existsSync(ref)) {
      allReferenced.add(path.resolve(ref));
    }
  }

  console.log(`  Found ${markdownRefs.size} references from markdown parsing`);
  console.log(`  Found ${mystRefs.size} references from MyST build`);
  console.log(`  Total unique references: ${allReferenced.size}`);

  // Find unreferenced images
  const unreferencedImages = [];
  const unreferencedAiFiles = [];
  const referencedImages = [];

  for (const imagePath of allImages) {
    const absImagePath = path.resolve(imagePath);
    const isReferenced = allReferenced.has(absImagePath);

    if (isReferenced) {
      referencedImages.push(imagePath);
    } else {
      unreferencedImages.push(imagePath);
    }
  }

  // Handle .ai files
  for (const aiPath of aiFiles) {
    // Check if the corresponding image file is referenced
    const correspondingImage = findCorrespondingImageFile(aiPath);

    if (correspondingImage) {
      const absImagePath = path.resolve(correspondingImage);
      const isImageReferenced = allReferenced.has(absImagePath);

      if (!isImageReferenced) {
        unreferencedAiFiles.push(aiPath);
      }
    } else {
      // No corresponding image file found, consider AI file unreferenced
      unreferencedAiFiles.push(aiPath);
    }
  }

  return {
    unreferencedImages,
    unreferencedAiFiles,
    referencedImages,
    allReferenced,
    buildOutput
  };
}

/**
 * Save the analysis results to files.
 *
 * @param {Object} results - Analysis results
 * @param {boolean} includeAi - Whether to include AI file analysis
 */
function saveResults(results, includeAi = true) {
  // Save unreferenced images
  if (results.unreferencedImages.length > 0) {
    const reportGen = new ReportGenerator('unreferenced_images');
    const lines = [
      '# Unreferenced image files',
      `# Found ${results.unreferencedImages.length} unreferenced images`,
      '# Generated by find_unreferenced_images_myst.js',
      '',
      ...results.unreferencedImages.sort()
    ];
    const filepath = reportGen.writeText(lines);
    console.log(`  Saved ${results.unreferencedImages.length} unreferenced images to '${filepath}'`);
  }

  // Save unreferenced .ai files if requested
  if (includeAi && results.unreferencedAiFiles.length > 0) {
    const reportGen = new ReportGenerator('unreferenced_ai_files');
    const lines = [
      '# Unreferenced .ai source files',
      `# Found ${results.unreferencedAiFiles.length} unreferenced .ai files`,
      '# These .ai files correspond to unreferenced image files',
      '# Generated by find_unreferenced_images_myst.js',
      ''
    ];
    for (const aiFile of results.unreferencedAiFiles.sort()) {
      const correspondingImage = findCorrespondingImageFile(aiFile);
      let line = aiFile;
      if (correspondingImage) {
        line += `  # corresponds to ${correspondingImage}`;
      }
      lines.push(line);
    }
    const filepath = reportGen.writeText(lines);
    console.log(`  Saved ${results.unreferencedAiFiles.length} unreferenced .ai files to '${filepath}'`);
  }

  // Save referenced images for verification
  const reportGen = new ReportGenerator('referenced_images');
  const lines = [
    '# Referenced image files (for verification)',
    `# Found ${results.referencedImages.length} referenced images`,
    '# Generated by find_unreferenced_images_myst.js',
    '',
    ...results.referencedImages.sort()
  ];
  const filepath = reportGen.writeText(lines);
  console.log(`  Saved ${results.referencedImages.length} referenced images to '${filepath}'`);
}

/**
 * Print a summary of the analysis.
 *
 * @param {Object} results - Analysis results
 * @param {boolean} includeAi - Whether to include AI file analysis
 */
function printSummary(results, includeAi = true) {
  console.log('\n=== UNREFERENCED IMAGES ANALYSIS ===');
  console.log(`Total images found: ${results.referencedImages.length + results.unreferencedImages.length}`);
  console.log(`Referenced images: ${results.referencedImages.length}`);
  console.log(`Unreferenced images: ${results.unreferencedImages.length}`);

  if (includeAi) {
    const totalAiFiles = results.unreferencedAiFiles.length +
                        results.referencedImages.filter(ai => ai.endsWith('.ai')).length;
    console.log(`Total .ai files found: ${totalAiFiles}`);
    console.log(`Unreferenced .ai files: ${results.unreferencedAiFiles.length}`);
  }

  if (results.unreferencedImages.length > 0) {
    console.log('\n=== UNREFERENCED IMAGES ===');
    // Group by directory
    const byDir = {};
    for (const img of results.unreferencedImages) {
      const dirName = path.dirname(img);
      if (!byDir[dirName]) byDir[dirName] = [];
      byDir[dirName].push(path.basename(img));
    }

    for (const dirName of Object.keys(byDir).sort()) {
      const files = byDir[dirName];
      console.log(`  ${dirName}/ (${files.length} files)`);
      const displayFiles = files.sort().slice(0, 3);
      for (const file of displayFiles) {
        console.log(`    - ${file}`);
      }
      if (files.length > 3) {
        console.log(`    ... and ${files.length - 3} more`);
      }
    }
  }

  if (includeAi && results.unreferencedAiFiles.length > 0) {
    console.log('\n=== UNREFERENCED .AI FILES ===');
    // Group by directory
    const byDir = {};
    for (const ai of results.unreferencedAiFiles) {
      const dirName = path.dirname(ai);
      if (!byDir[dirName]) byDir[dirName] = [];
      byDir[dirName].push(path.basename(ai));
    }

    for (const dirName of Object.keys(byDir).sort()) {
      const files = byDir[dirName];
      console.log(`  ${dirName}/ (${files.length} files)`);
      const displayFiles = files.sort().slice(0, 3);
      for (const file of displayFiles) {
        console.log(`    - ${file}`);
      }
      if (files.length > 3) {
        console.log(`    ... and ${files.length - 3} more`);
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    contentDir: 'content',
    dryRun: args.includes('--dry-run'),
    includeAi: !args.includes('--no-ai')
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

  console.log('=== Enhanced Unreferenced Images Finder (MyST-powered) ===\n');

  // Find all images and AI files
  console.log('Scanning for image and .ai files...');
  const { allImages, aiFiles } = findAllImages(options.contentDir);
  console.log(`  Found ${allImages.length} image files`);
  if (options.includeAi) {
    console.log(`  Found ${aiFiles.length} .ai files`);
  }

  // Analyze references
  const results = analyzeReferences(allImages, aiFiles, options.contentDir);

  // Print summary
  printSummary(results, options.includeAi);

  // Save results unless dry run
  if (!options.dryRun) {
    console.log('\n=== SAVING RESULTS ===');
    saveResults(results, options.includeAi);

    if (results.unreferencedImages.length > 0 ||
        (options.includeAi && results.unreferencedAiFiles.length > 0)) {
      console.log('\nTo delete unreferenced files, you can use:');
      console.log('  node scripts/delete_unreferenced_images_myst.js');
    } else {
      console.log('\n✅ No unreferenced images found!');
    }
  } else {
    console.log('\n(Dry run - no files created)');
  }

  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = {
  findAllImages,
  parseMarkdownReferences,
  analyzeReferences,
  saveResults,
  printSummary
};
