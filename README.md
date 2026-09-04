# Optics Textbook

An interactive open textbook on optics for undergraduate students in physics, electrical engineering, and related fields.

[![Validate & Test](https://github.com/QuadriviumPress/opticsTextbook/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/QuadriviumPress/opticsTextbook/actions/workflows/validate.yml)
[![Deploy](https://github.com/QuadriviumPress/opticsTextbook/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/QuadriviumPress/opticsTextbook/actions/workflows/deploy.yml)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

![The artwork features a sleek, dark background illuminated by a central glass prism splitting a beam of white light into a vibrant rainbow spectrum. Surrounding the prism are various optical elements, including floating lenses, curved fiber optic strands, and schematic wave patterns.](img/coverTextbook.png "Cover For Optics")
## Overview

This textbook covers advanced topics in optics while maintaining accessibility for students with a basic understanding of physics and optics concepts. The text focuses on practical applications that provide insights into optical phenomena. The content is presented in a way that emphasizes understanding physical phenomena through simplified models, making complex concepts more approachable while maintaining scientific rigor.

Beginning with Basic Electromagnetic and Wave Optics, the text builds a strong foundation in Maxwell's equations, wave equations, and their special solutions, including plane waves and electric dipole fields. Time-harmonic fields are thoroughly explored, along with Fresnel coefficients and evanescent waves.

Moving into Geometrical Optics, students learn about ray-based light propagation, exploring Fermat's Principle, Snell's Law and  paraxial theory. The Optical Instruments section brings theory into practice, examining everyday devices from pinhole cameras to modern imaging systems, microscopes, and telescopes.

The text then delves into Polarization, covering various types of light polarization and their manipulation through Jones matrices and vectors. The Interference and Coherence chapter explores time and spatial coherence, wave superposition, and their applications in stellar interferometry. Scalar Diffraction Optics follows, examining diffraction theory, interference patterns, and the fundamental limits of optical resolution.

The chapter on Lasers ties together many previously discussed concepts, exploring laser properties, optical resonators, and stimulated emission through Einstein's theory.  We have included a chapter on the application of ray matrices to thick lens analysis.

## Key Features

The textbook combines comprehensive coverage with interactive elements in its digital version, all freely available under a Creative Commons Attribution-ShareAlike 4.0 International License.

**Progressive Web App (PWA)**: The textbook is now available as a Progressive Web App, which means you can:
- Install it on your device (desktop, mobile, or tablet) for app-like experience
- Access content offline once cached
- Enjoy fast loading times with optimized caching
- Read in standalone mode without browser UI

See [PWA_SETUP.md](doc/PWA_SETUP.md) for details on PWA features and usage.

## For Contributors

### Quick Start

To contribute to this textbook, you'll need Node.js installed. Follow these steps to get started:

```bash
# Clone the repository
git clone https://github.com/QuadriviumPress/opticsTextbook.git
cd opticsTextbook

# Install dependencies
npm install

# Launch development server (with live reload)
npm run start
# Open http://localhost:3000 in your browser

# Static HTML build (also runs image/export/PWA steps)
npm run build
```

### Documentation

For detailed workflows and maintenance tasks, see the `doc/` directory:

- **[MAINTENANCE.md](doc/MAINTENANCE.md)** - Comprehensive guide for common tasks
- **[MYST_CONVENTIONS.md](doc/MYST_CONVENTIONS.md)** - MyST Markdown conventions
- **[scripts/README.md](doc/scripts/README.md)** - Utility scripts documentation

### Need Help?

- Report issues: [GitHub Issues](https://github.com/QuadriviumPress/opticsTextbook/issues)
- View workflows: [GitHub Actions](https://github.com/QuadriviumPress/opticsTextbook/actions)

## Contributions and Acknowledgments

This repository is a fork of the Interactive Textbook (https://books.open.tudelft.nl/home/catalog/book/232) developed at TU Delft. We acknowledge and thank the original authors for their foundational work, which has made this adaptation possible.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
