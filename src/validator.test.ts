import { describe, it, expect } from 'vitest';
import { calculateSpecificity, validateCssColor, isValidCssLength } from './validator.js';

describe('CSS Specificity Calculator', () => {
  it('should calculate specificity for element selector', () => {
    const result = calculateSpecificity('p');
    expect(result.a).toBe(0);
    expect(result.b).toBe(0);
    expect(result.c).toBe(1);
    expect(result.formatted).toBe('0,0,0,1');
  });

  it('should calculate specificity for class and attribute selector', () => {
    const result = calculateSpecificity('.btn[disabled]');
    expect(result.a).toBe(0);
    expect(result.b).toBe(2);
    expect(result.c).toBe(0);
    expect(result.formatted).toBe('0,0,2,0');
  });

  it('should calculate specificity for ID selector', () => {
    const result = calculateSpecificity('#header');
    expect(result.a).toBe(1);
    expect(result.b).toBe(0);
    expect(result.c).toBe(0);
    expect(result.formatted).toBe('0,1,0,0');
  });

  it('should handle complex nested and combinator selectors', () => {
    const result = calculateSpecificity('main#content div.card > a.link:hover::after');
    // ID: #content (1)
    // Class/attr/pseudo-class: .card, .link, :hover (3)
    // Elements/pseudo-elements: main, div, a, ::after (4)
    expect(result.a).toBe(1);
    expect(result.b).toBe(3);
    expect(result.c).toBe(4);
    expect(result.formatted).toBe('0,1,3,4');
  });

  it('should treat :where() as zero specificity', () => {
    const result = calculateSpecificity(':where(#special.class)');
    expect(result.a).toBe(0);
    expect(result.b).toBe(0);
    expect(result.c).toBe(0);
    expect(result.formatted).toBe('0,0,0,0');
  });
});

describe('CSS Color Validator', () => {
  it('should validate hex colors', () => {
    expect(validateCssColor('#fff').valid).toBe(true);
    expect(validateCssColor('#1a2b3c').valid).toBe(true);
    expect(validateCssColor('#1a2b3c80').valid).toBe(true);
  });

  it('should validate modern oklch color model', () => {
    const res = validateCssColor('oklch(0.65 0.22 260)');
    expect(res.valid).toBe(true);
    expect(res.model).toBe('oklch');
  });

  it('should validate rgb and hsl colors', () => {
    expect(validateCssColor('rgb(255, 0, 128)').valid).toBe(true);
    expect(validateCssColor('hsl(210, 50%, 60%)').valid).toBe(true);
  });

  it('should reject invalid color strings', () => {
    expect(validateCssColor('invalid-color-123').valid).toBe(false);
  });
});

describe('CSS Length Validator', () => {
  it('should recognize valid length units including container query units', () => {
    expect(isValidCssLength('16px')).toBe(true);
    expect(isValidCssLength('1.5rem')).toBe(true);
    expect(isValidCssLength('100vh')).toBe(true);
    expect(isValidCssLength('50cqi')).toBe(true);
    expect(isValidCssLength('0')).toBe(true);
  });

  it('should reject unitless non-zero values', () => {
    expect(isValidCssLength('100')).toBe(false);
    expect(isValidCssLength('abc')).toBe(false);
  });
});
