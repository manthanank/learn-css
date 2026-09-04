export interface Specificity {
  inline: number;
  a: number; // IDs
  b: number; // Classes, attributes, pseudo-classes
  c: number; // Elements, pseudo-elements
  formatted: string;
}

export interface ColorValidationResult {
  valid: boolean;
  model?: 'hex' | 'rgb' | 'hsl' | 'oklch' | 'named';
  normalized?: string;
  error?: string;
}

/**
 * Calculate CSS selector specificity according to W3C Selectors Level 4 specification.
 */
export function calculateSpecificity(selector: string): Specificity {
  if (!selector || selector.trim() === '') {
    return { inline: 0, a: 0, b: 0, c: 0, formatted: '0,0,0,0' };
  }

  let cleanSelector = selector.trim();
  let a = 0;
  let b = 0;
  let c = 0;

  // Handle :where() - contributes (0,0,0) specificity
  cleanSelector = cleanSelector.replace(/:where\([^)]*\)/g, ' ');

  // Match IDs: #id
  const idMatches = cleanSelector.match(/#[a-zA-Z0-9_-]+/g);
  if (idMatches) {
    a += idMatches.length;
    cleanSelector = cleanSelector.replace(/#[a-zA-Z0-9_-]+/g, ' ');
  }

  // Match attribute selectors: [attr=val]
  const attrMatches = cleanSelector.match(/\[[^\]]+\]/g);
  if (attrMatches) {
    b += attrMatches.length;
    cleanSelector = cleanSelector.replace(/\[[^\]]+\]/g, ' ');
  }

  // Match pseudo-elements (double colon) like ::before, ::after
  const pseudoElementMatches = cleanSelector.match(/::[a-zA-Z0-9_-]+/g);
  if (pseudoElementMatches) {
    c += pseudoElementMatches.length;
    cleanSelector = cleanSelector.replace(/::[a-zA-Z0-9_-]+/g, ' ');
  }

  // Match classes: .class
  const classMatches = cleanSelector.match(/\.[a-zA-Z0-9_-]+/g);
  if (classMatches) {
    b += classMatches.length;
    cleanSelector = cleanSelector.replace(/\.[a-zA-Z0-9_-]+/g, ' ');
  }

  // Match remaining pseudo-classes (single colon) like :hover, :focus, :has(...)
  const pseudoClassMatches = cleanSelector.match(/:[a-zA-Z0-9_-]+(\([^)]*\))?/g);
  if (pseudoClassMatches) {
    b += pseudoClassMatches.length;
    cleanSelector = cleanSelector.replace(/:[a-zA-Z0-9_-]+(\([^)]*\))?/g, ' ');
  }

  // Remove combinators and whitespace
  cleanSelector = cleanSelector.replace(/[>+~*]/g, ' ');

  // Match element types (tags)
  const elementMatches = cleanSelector.match(/\b[a-zA-Z][a-zA-Z0-9_-]*\b/g);
  if (elementMatches) {
    c += elementMatches.length;
  }

  return {
    inline: 0,
    a,
    b,
    c,
    formatted: `0,${a},${b},${c}`
  };
}

/**
 * Validate CSS color formats (hex, rgb, hsl, oklch, named).
 */
export function validateCssColor(colorStr: string): ColorValidationResult {
  const str = colorStr.trim();
  if (!str) {
    return { valid: false, error: 'Empty color string' };
  }

  // 1. Hex Color (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str)) {
    return { valid: true, model: 'hex', normalized: str.toLowerCase() };
  }

  // 2. RGB / RGBA
  if (/^rgba?\(\s*[\d.%\s,/]+\s*\)$/i.test(str)) {
    return { valid: true, model: 'rgb', normalized: str.toLowerCase() };
  }

  // 3. HSL / HSLA
  if (/^hsla?\(\s*[\d.degturnrad%\s,/]+\s*\)$/i.test(str)) {
    return { valid: true, model: 'hsl', normalized: str.toLowerCase() };
  }

  // 4. OKLCH (Modern CSS Color 4)
  if (/^oklch\(\s*[\d.%\s,/]+\s*\)$/i.test(str)) {
    return { valid: true, model: 'oklch', normalized: str.toLowerCase() };
  }

  // 5. Common Named Colors
  const standardNamed = ['currentColor', 'transparent', 'inherit', 'initial', 'unset', 'red', 'blue', 'green', 'black', 'white'];
  if (standardNamed.includes(str.toLowerCase())) {
    return { valid: true, model: 'named', normalized: str.toLowerCase() };
  }

  return { valid: false, error: `Unrecognized or invalid CSS color format: ${str}` };
}

/**
 * Validate CSS length units.
 */
export function isValidCssLength(val: string): boolean {
  const validUnits = ['px', 'rem', 'em', 'vh', 'vw', 'vmin', 'vmax', 'cqi', 'cqw', 'cqb', 'cqh', '%', 'ch', 'ex'];
  if (val === '0') return true;
  const regex = new RegExp(`^-?\\d+(\\.\\d+)?(${validUnits.join('|')})$`);
  return regex.test(val.trim());
}
