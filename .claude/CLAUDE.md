# Claude Guidelines: learn-css

- **Language & Runtime**: TypeScript 5.7+, Node.js (ESM), Modern CSS Living Standard.
- **Commands**:
  - Test: `npm test` (`vitest run`)
  - Build: `npm run build` (`tsc`)
  - Dev: `npm run dev` (`tsx watch src/server.ts`)
- **Coding Conventions**:
  - Use Cascade Layers (`@layer`) for managing specificity.
  - Implement modern CSS selectors (`:has()`, `:is()`, `:where()`) and native CSS nesting.
  - Keep responsive designs container-centric using `@container` queries.
  - Follow WCAG 2.2 AA/AAA guidelines, including `prefers-reduced-motion` and `prefers-color-scheme`.
