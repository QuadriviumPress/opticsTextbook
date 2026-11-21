/**
 * PWA (Progressive Web App) tests
 *
 * Tests for PWA functionality:
 * - Service worker configuration
 * - Manifest.json structure
 * - PWA assets and icons
 * - Offline page
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../..');
const PWA_DIR = path.join(ROOT_DIR, 'pwa');
const ICONS_DIR = path.join(ROOT_DIR, 'icons');
const BUILD_DIR = path.join(ROOT_DIR, '_build', 'html');

describe('PWA Configuration Files', () => {
  describe('PWA Directory Structure', () => {
    test('should have pwa directory', () => {
      expect(fs.existsSync(PWA_DIR)).toBe(true);
    });

    test('should have manifest.json template', () => {
      const templatePath = path.join(PWA_DIR, 'manifest.json.template');
      expect(fs.existsSync(templatePath)).toBe(true);
    });

    test('should have service-worker.js', () => {
      const swPath = path.join(PWA_DIR, 'service-worker.js');
      expect(fs.existsSync(swPath)).toBe(true);
    });

    test('should have offline.html', () => {
      const offlinePath = path.join(PWA_DIR, 'offline.html');
      expect(fs.existsSync(offlinePath)).toBe(true);
    });
  });

  describe('Manifest Template', () => {
    let manifestTemplate = '';

    beforeAll(() => {
      const templatePath = path.join(PWA_DIR, 'manifest.json.template');
      if (fs.existsSync(templatePath)) {
        manifestTemplate = fs.readFileSync(templatePath, 'utf8');
      }
    });

    test('should have required PWA manifest fields', () => {
      // Required fields for a valid PWA manifest
      const requiredFields = [
        'name',
        'short_name',
        'start_url',
        'display',
        'icons'
      ];

      requiredFields.forEach(field => {
        expect(manifestTemplate).toContain(`"${field}"`);
      });
    });

    test('should use template placeholders for dynamic values', () => {
      // Check for placeholder patterns
      expect(manifestTemplate).toContain('{{');
      expect(manifestTemplate).toContain('}}');
    });

    test('should have valid display mode', () => {
      const displayModes = ['standalone', 'fullscreen', 'minimal-ui', 'browser'];
      const hasValidDisplay = displayModes.some(mode =>
        manifestTemplate.includes(`"display": "${mode}"`)
      );
      expect(hasValidDisplay).toBe(true);
    });
  });

  describe('Service Worker', () => {
    let swContent = '';

    beforeAll(() => {
      const swPath = path.join(PWA_DIR, 'service-worker.js');
      if (fs.existsSync(swPath)) {
        swContent = fs.readFileSync(swPath, 'utf8');
      }
    });

    test('should have install event listener', () => {
      expect(swContent).toContain("addEventListener('install'");
    });

    test('should have activate event listener', () => {
      expect(swContent).toContain("addEventListener('activate'");
    });

    test('should have fetch event listener', () => {
      expect(swContent).toContain("addEventListener('fetch'");
    });

    test('should implement caching strategies', () => {
      // Check for common caching patterns
      const hasCache = swContent.includes('caches.open') ||
                       swContent.includes('caches.match') ||
                       swContent.includes('cache.put');
      expect(hasCache).toBe(true);
    });

    test('should define cache name', () => {
      expect(swContent).toMatch(/CACHE_NAME|CACHE_VERSION/);
    });

    test('should handle offline fallback', () => {
      expect(swContent).toContain('offline');
    });

    test('should skip cross-origin requests', () => {
      // Service worker should not cache cross-origin requests without CORS
      expect(swContent).toContain('origin');
    });

    test('should implement proper caching strategies', () => {
      // Check for strategy implementations
      const strategies = [
        'networkFirst',
        'cacheFirst',
        'staleWhileRevalidate'
      ];

      const implementedStrategies = strategies.filter(strategy =>
        swContent.toLowerCase().includes(strategy.toLowerCase())
      );

      // Should have at least one strategy
      expect(implementedStrategies.length).toBeGreaterThan(0);
    });
  });

  describe('Offline Page', () => {
    let offlineContent = '';

    beforeAll(() => {
      const offlinePath = path.join(PWA_DIR, 'offline.html');
      if (fs.existsSync(offlinePath)) {
        offlineContent = fs.readFileSync(offlinePath, 'utf8');
      }
    });

    test('should be valid HTML', () => {
      expect(offlineContent).toContain('<!DOCTYPE html>');
      expect(offlineContent).toContain('<html');
      expect(offlineContent).toContain('</html>');
    });

    test('should have appropriate offline message', () => {
      const offlineIndicators = ['offline', 'connection', 'unavailable', 'network'];
      const hasOfflineMessage = offlineIndicators.some(indicator =>
        offlineContent.toLowerCase().includes(indicator)
      );
      expect(hasOfflineMessage).toBe(true);
    });

    test('should have minimal dependencies', () => {
      // Offline page should not depend on external resources
      const hasExternalCSS = offlineContent.includes('href="http');
      const hasExternalJS = offlineContent.includes('src="http');

      expect(hasExternalCSS).toBe(false);
      expect(hasExternalJS).toBe(false);
    });
  });
});

describe('PWA Build Scripts', () => {
  const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts', 'build');

  describe('PWA Script Files', () => {
    test('should have generate-pwa-manifest.js', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'generate-pwa-manifest.js');
      expect(fs.existsSync(scriptPath)).toBe(true);
    });

    test('should have generate-pwa-icons.js', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'generate-pwa-icons.js');
      expect(fs.existsSync(scriptPath)).toBe(true);
    });

    test('should have install-pwa-assets.js', () => {
      const scriptPath = path.join(SCRIPTS_DIR, 'install-pwa-assets.js');
      expect(fs.existsSync(scriptPath)).toBe(true);
    });
  });

  describe('Generate Manifest Script', () => {
    let scriptContent = '';

    beforeAll(() => {
      const scriptPath = path.join(SCRIPTS_DIR, 'generate-pwa-manifest.js');
      if (fs.existsSync(scriptPath)) {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      }
    });

    test('should read from myst.yml', () => {
      expect(scriptContent).toContain('myst.yml');
    });

    test('should use js-yaml for parsing', () => {
      expect(scriptContent).toContain("require('js-yaml')");
    });

    test('should replace template placeholders', () => {
      expect(scriptContent).toContain('replace');
    });

    test('should output manifest.json', () => {
      expect(scriptContent).toContain('manifest.json');
    });
  });

  describe('Install PWA Assets Script', () => {
    let scriptContent = '';

    beforeAll(() => {
      const scriptPath = path.join(SCRIPTS_DIR, 'install-pwa-assets.js');
      if (fs.existsSync(scriptPath)) {
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
      }
    });

    test('should inject service worker registration', () => {
      expect(scriptContent).toContain('serviceWorker');
      expect(scriptContent).toContain('register');
    });

    test('should inject manifest link', () => {
      expect(scriptContent).toContain('manifest');
      expect(scriptContent).toContain('link');
    });

    test('should process HTML files', () => {
      expect(scriptContent).toContain('.html');
      expect(scriptContent).toContain('findHtmlFiles');
    });
  });
});

describe('PWA Icons', () => {
  describe('Icons Directory', () => {
    test('should have icons directory or source image', () => {
      const hasIconsDir = fs.existsSync(ICONS_DIR);
      const hasSourceImage = fs.existsSync(path.join(ROOT_DIR, 'img', 'icon.png')) ||
                            fs.existsSync(path.join(ROOT_DIR, 'img', 'logo.png'));

      expect(hasIconsDir || hasSourceImage).toBe(true);
    });
  });

  describe('Icon Files (when generated)', () => {
    const iconsExist = fs.existsSync(ICONS_DIR);

    (iconsExist ? test : test.skip)('should have various icon sizes', () => {
      const files = fs.readdirSync(ICONS_DIR);
      const pngFiles = files.filter(f => f.endsWith('.png'));

      // Should have multiple sizes
      expect(pngFiles.length).toBeGreaterThan(0);

      console.log(`Found ${pngFiles.length} icon files:`, pngFiles);
    });

    (iconsExist ? test : test.skip)('should have apple-touch-icon', () => {
      const files = fs.readdirSync(ICONS_DIR);
      const hasAppleTouchIcon = files.some(f =>
        f.includes('apple-touch-icon') || f.includes('180')
      );

      expect(hasAppleTouchIcon).toBe(true);
    });

    (iconsExist ? test : test.skip)('icons should not be empty', () => {
      const files = fs.readdirSync(ICONS_DIR);
      const pngFiles = files.filter(f => f.endsWith('.png'));

      const emptyFiles = pngFiles.filter(file => {
        const filePath = path.join(ICONS_DIR, file);
        const stats = fs.statSync(filePath);
        return stats.size === 0;
      });

      expect(emptyFiles).toHaveLength(0);
    });
  });
});

describe('PWA npm Scripts', () => {
  let packageJson = {};

  beforeAll(() => {
    const packagePath = path.join(ROOT_DIR, 'package.json');
    if (fs.existsSync(packagePath)) {
      packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    }
  });

  test('should have generate-icons script', () => {
    expect(packageJson.scripts).toHaveProperty('generate-icons');
  });

  test('should have generate-manifest script', () => {
    expect(packageJson.scripts).toHaveProperty('generate-manifest');
  });

  test('should have setup-pwa script', () => {
    expect(packageJson.scripts).toHaveProperty('setup-pwa');
  });

  test('setup-pwa should run generate-manifest', () => {
    const setupPwa = packageJson.scripts['setup-pwa'];
    expect(setupPwa).toContain('generate-manifest');
  });
});

describe('PWA Build Integration', () => {
  // Gate on setup-pwa output, not merely `_build/html`. Verify runs
  // `myst build --html` (no setup-pwa), which would otherwise make these
  // tests fail against a bare MyST site tree.
  const pwaInstalled = fs.existsSync(path.join(BUILD_DIR, 'manifest.json'));

  describe('Built PWA Assets (when setup-pwa has run)', () => {
    (pwaInstalled ? test : test.skip)('should have manifest.json in build', () => {
      const manifestPath = path.join(BUILD_DIR, 'manifest.json');
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    (pwaInstalled ? test : test.skip)('should have service-worker.js in build', () => {
      const swPath = path.join(BUILD_DIR, 'service-worker.js');
      expect(fs.existsSync(swPath)).toBe(true);
    });

    (pwaInstalled ? test : test.skip)('should have offline.html in build', () => {
      const offlinePath = path.join(BUILD_DIR, 'offline.html');
      expect(fs.existsSync(offlinePath)).toBe(true);
    });

    (pwaInstalled ? test : test.skip)('HTML files should have PWA tags', () => {
      const indexPath = path.join(BUILD_DIR, 'index.html');

      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');

        // Check for manifest link
        expect(content).toContain('manifest.json');

        // Check for service worker registration
        expect(content).toContain('serviceWorker');
      }
    });
  });
});

describe('Service Worker Caching Logic', () => {
  describe('Cache Strategy Tests', () => {
    test('should correctly identify static assets', () => {
      const STATIC_ASSET_PATTERNS = [
        /\.css$/,
        /\.js$/,
        /\.woff2?$/,
        /\.png$/,
        /\.jpg$/,
        /\.svg$/,
        /\/build\//
      ];

      const isStaticAsset = (pathname) => {
        return STATIC_ASSET_PATTERNS.some(pattern => pattern.test(pathname));
      };

      // Static assets
      expect(isStaticAsset('/styles.css')).toBe(true);
      expect(isStaticAsset('/app.js')).toBe(true);
      expect(isStaticAsset('/font.woff2')).toBe(true);
      expect(isStaticAsset('/image.png')).toBe(true);
      expect(isStaticAsset('/build/main.js')).toBe(true);

      // Non-static assets
      expect(isStaticAsset('/index.html')).toBe(false);
      expect(isStaticAsset('/about/')).toBe(false);
      expect(isStaticAsset('/api/data.json')).toBe(false);
    });

    test('should normalize URLs correctly', () => {
      const normalizeUrl = (url) => {
        const urlObj = new URL(url, 'https://example.com');
        if (!urlObj.pathname.includes('.') && !urlObj.pathname.endsWith('/')) {
          urlObj.pathname += '/';
        }
        return urlObj.pathname;
      };

      // Pages should get trailing slashes
      expect(normalizeUrl('/about')).toBe('/about/');
      expect(normalizeUrl('/chapter/intro')).toBe('/chapter/intro/');

      // Already has trailing slash
      expect(normalizeUrl('/about/')).toBe('/about/');

      // Files should not get trailing slashes
      expect(normalizeUrl('/styles.css')).toBe('/styles.css');
      expect(normalizeUrl('/image.png')).toBe('/image.png');
    });
  });
});
