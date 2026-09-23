# Optics Textbook Style Guide

This document outlines the formatting and structural conventions for the Optics Textbook.

## Problem Sets

- **Format**: `**Problem X.Y: Title**`
  - X = chapter number
  - Y = problem number within chapter
  - Example: `**Problem 3.1: Snell's Law Application**`
- **Sub-parts**: Use **(a)**, **(b)**, **(c)** in bold
  - Example: `**(a)** Calculate the angle of refraction.`
- **Units**: All problems should include units in given values
  - Example: "A beam of light with wavelength 550 nm..."

## Cross-References

- **Use MyST `{ref}` and `{eq}` syntax exclusively**
- **Equation labels**: `eq:chap-abbrev:descriptiveName`
  - Format: `eq:` + chapter abbreviation + `:` + descriptive name
  - Example: `{eq}\`eq:geo:snellLaw\``
- **Figure labels**: `fig:chap-abbrev:descriptiveName`
  - Format: `fig:` + chapter abbreviation + `:` + descriptive name
  - Example: `{ref}\`fig:geo:refraction\``

## Callout Boxes

Use MyST admonition syntax with the following conventions:

- **`{note}`**: Learning objectives, external resources
  - Example: Links to PhET simulations, video lectures
- **`{important}`**: Key equations, laws, principles
  - Example: Snell's Law, Fermat's Principle
- **`{tip}`**: Practical advice, shortcuts
  - Example: Problem-solving strategies, approximations
- **`{warning}`**: Common mistakes, pitfalls
  - Example: Sign conventions, unit conversions

## Chapter Structure

Each chapter should follow this structure:

1. **Learning objectives** (in a `{note}` box)
2. **Main content** with examples
3. **Advanced topics** (if applicable)
4. **External resources** (in a `{note}` box)
5. **Chapter summary**

## Additional Guidelines

- Use consistent notation throughout the textbook
- Include worked examples after introducing new concepts
- Provide clear diagrams with proper labels
- Ensure all equations are numbered and labeled for cross-referencing
- Use SI units unless otherwise specified
