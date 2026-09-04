# Agent Instructions: learn-css

Welcome to the **learn-css** repository. This document outlines guidelines and conventions for AI agents and human contributors working with this codebase.

## Repository Purpose
- Provide an enterprise-grade, comprehensive curriculum, interactive application, and reference implementation for **Modern CSS (Cascading Style Sheets)**.
- Demonstrate cutting-edge CSS features: Cascade Layers (`@layer`), CSS Nesting, `:has()`, Container Queries (`@container`), Modern Color Spaces (OKLCH, Display P3), Subgrid, Modern Animations (`@starting-style`, scroll-driven animations), and View Transitions.
- Maintain strict accessibility (WCAG 2.2 AAA), modern layout techniques (Grid/Flexbox), and resilient CI/CD pipelines.

## Project Structure
- `src/index.html`: Interactive CSS showcase presenting modern layouts, components, and selectors.
- `src/styles.css`: Pure modern CSS design system with `@layer` architecture and CSS custom properties.
- `src/validator.ts`: CSS specificity calculator, color validator (hex, rgb, hsl, oklch), and unit parser.
- `src/validator.test.ts`: Vitest test suite testing calculation logic, color models, and length units.
- `src/server.ts`: Express static showcase server and REST API for specificity calculation.
- `.github/workflows/`: Hardened CI/CD workflows for DockerHub publishing and releases.

## Development Commands
- `npm run dev`: Start local development server with hot-reloading via `tsx watch src/server.ts`.
- `npm run build`: Compile TypeScript with `tsc`.
- `npm run test`: Run the test suite via `vitest run`.
- `npm start`: Run the production server from `dist/server.js`.

## Code Style & Best Practices
1. **Modern CSS Over Legacy Hacks**:
   - Use CSS Grid and Flexbox for layouts; avoid floats or inline-block layout hacks.
   - Use Cascade Layers (`@layer`) for managing specificity: `reset`, `base`, `components`, `utilities`.
   - Prefer modern selectors (`:is()`, `:where()`, `:has()`) and CSS native nesting over preprocessor workarounds.
   - Use Container Queries (`@container`) for component-level responsiveness.
2. **Color & Typography**:
   - Leverage `oklch()` for perceptually uniform color palettes and accessible contrast ratios.
   - Use fluid typography with `clamp()`.
3. **Accessibility (a11y)**:
   - Always honor `prefers-reduced-motion` and `prefers-color-scheme`.
   - Ensure interactive elements feature visible focus rings (`:focus-visible`).
