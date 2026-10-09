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
    expect(getTypeAheadIndex(options, 'b', 0)).toBe(1);
    expect(getTypeAheadIndex(options, 'CZ', 0)).toBe(4);
  });

  it('searches from the start index and wraps around', () => {
    expect(getTypeAheadIndex(options, 'c', 4)).toBe(4);
    expect(getTypeAheadIndex(options, 'a', 2)).toBe(0);
  });

  it('cycles through options starting with a repeated character', () => {
    // After "c" activated Croatia (3), searching from the next option finds Czech Republic, then Cyprus
    expect(getTypeAheadIndex(options, 'cc', 4)).toBe(4);
    expect(getTypeAheadIndex(options, 'ccc', 5)).toBe(5);
    expect(getTypeAheadIndex(options, 'cccc', 0)).toBe(3);
  });

  it('skips disabled options', () => {
    expect(getTypeAheadIndex(options, 'bu', 0)).toBe(-1);
    expect(getTypeAheadIndex(options, 'b', 2)).toBe(1);
  });

  it('returns -1 when no option matches', () => {
    expect(getTypeAheadIndex(options, 'x', 0)).toBe(-1);
    expect(getTypeAheadIndex([], 'a', 0)).toBe(-1);
  });
});
