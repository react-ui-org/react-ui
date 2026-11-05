import { encodeIdPart } from '../encodeIdPart';
import { getFieldIds } from '../getFieldIds';

describe('encodeIdPart', () => {
  it('encodes whitespace so the part stays a valid ID reference', () => {
    expect(encodeIdPart('Czech Republic')).toBe('Czech%20Republic');
    expect(encodeIdPart('a\tb\nc')).toBe('a%09b%0Ac');
  });

  it('keeps parts without whitespace and converts numbers to strings', () => {
    expect(encodeIdPart('apple')).toBe('apple');
    expect(encodeIdPart(1)).toBe('1');
  });
});

describe('getFieldIds', () => {
  it('derives IDs of inner elements from the prefix', () => {
    const ids = getFieldIds('fruit');

    expect(ids.input).toBe('fruit');
    expect(ids.label).toBe('fruit__label');
    expect(ids.labelText).toBe('fruit__labelText');
    expect(ids.helpText).toBe('fruit__helpText');
    expect(ids.validationText).toBe('fruit__validationText');
    expect(ids.dropdown).toBe('fruit__dropdown');
    expect(ids.tagDescription).toBe('fruit__tagDescription');
  });

  it('derives IDs of individual options', () => {
    expect(getFieldIds('fruit').item('apple')).toBe('fruit__item__apple');
    expect(getFieldIds('fruit').item(1)).toBe('fruit__item__1');
  });

  it('encodes whitespace in IDs of individual options so they stay valid ID references', () => {
    expect(getFieldIds('country').item('Czech Republic')).toBe('country__item__Czech%20Republic');
  });

  it('derives IDs of option groups and encodes whitespace in them', () => {
    expect(getFieldIds('fruit').group('citrus')).toBe('fruit__group__citrus');
    expect(getFieldIds('fruit').group('Stone fruit')).toBe('fruit__group__Stone%20fruit');
  });
});
