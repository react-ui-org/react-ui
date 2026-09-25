import { getFieldIds } from '../getFieldIds';

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
});
