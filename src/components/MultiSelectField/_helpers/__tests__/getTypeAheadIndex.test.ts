import { getTypeAheadIndex } from '../getTypeAheadIndex';

const options = [
  {
    disabled: false,
    label: 'Austria',
  },
  {
    disabled: false,
    label: 'Belgium',
  },
  {
    disabled: true,
    label: 'Bulgaria',
  },
  {
    disabled: false,
    label: 'Croatia',
  },
  {
    disabled: false,
    label: 'Czech Republic',
  },
  {
    disabled: false,
    label: 'Cyprus',
  },
];

describe('getTypeAheadIndex', () => {
  it('finds the first option starting with the search string, ignoring case', () => {
    expect(getTypeAheadIndex(options, 'b', -1)).toBe(1);
    expect(getTypeAheadIndex(options, 'CZ', -1)).toBe(4);
  });

  it('searches a single character from the option after the active one and wraps around', () => {
    expect(getTypeAheadIndex(options, 'c', 3)).toBe(4);
    expect(getTypeAheadIndex(options, 'a', 1)).toBe(0);
  });

  it('keeps the active option while a longer search string still matches it', () => {
    // "c" activated Croatia (3), "cr" and "cro" keep it instead of jumping to the next option starting with "c"
    expect(getTypeAheadIndex(options, 'cr', 3)).toBe(3);
    expect(getTypeAheadIndex(options, 'cro', 3)).toBe(3);
    // "cz" no longer matches Croatia, so the search moves on to Czech Republic
    expect(getTypeAheadIndex(options, 'cz', 3)).toBe(4);
  });

  it('cycles through options starting with a repeated character', () => {
    // After "c" activated Croatia (3), searching from the next option finds Czech Republic, then Cyprus
    expect(getTypeAheadIndex(options, 'cc', 3)).toBe(4);
    expect(getTypeAheadIndex(options, 'ccc', 4)).toBe(5);
    expect(getTypeAheadIndex(options, 'cccc', 5)).toBe(3);
  });

  it('skips disabled options', () => {
    expect(getTypeAheadIndex(options, 'bu', -1)).toBe(-1);
    expect(getTypeAheadIndex(options, 'b', 1)).toBe(1);
  });

  it('returns -1 when no option matches', () => {
    expect(getTypeAheadIndex(options, 'x', -1)).toBe(-1);
    expect(getTypeAheadIndex([], 'a', -1)).toBe(-1);
  });
});
