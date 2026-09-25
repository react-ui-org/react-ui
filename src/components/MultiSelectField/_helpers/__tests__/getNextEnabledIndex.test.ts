import {
  getNextEnabledIndex,
  getWrappedIndex,
} from '../getNextEnabledIndex';

describe('getWrappedIndex', () => {
  it.each([
    [0, 3, 'next', 1],
    [2, 3, 'next', 0],
    [0, 3, 'previous', 2],
    [2, 3, 'previous', 1],
    [1, 3, 'first', 0],
    [1, 3, 'last', 2],
    [-1, 3, 'next', 0],
    [0, 0, 'next', -1],
  ] as const)('moves from %i of %i to %s → %i', (currentIndex, count, move, expected) => {
    expect(getWrappedIndex(currentIndex, count, move)).toBe(expected);
  });
});

describe('getNextEnabledIndex', () => {
  const isDisabled = (disabledIndexes: number[]) => (index: number) => disabledIndexes.includes(index);

  it('skips disabled items in the direction of the move', () => {
    expect(getNextEnabledIndex(0, 4, 'next', isDisabled([1]))).toBe(2);
    expect(getNextEnabledIndex(3, 4, 'previous', isDisabled([2]))).toBe(1);
    expect(getNextEnabledIndex(2, 4, 'first', isDisabled([0]))).toBe(1);
    expect(getNextEnabledIndex(0, 4, 'last', isDisabled([3]))).toBe(2);
  });

  it('wraps around', () => {
    expect(getNextEnabledIndex(3, 4, 'next', isDisabled([0]))).toBe(1);
    expect(getNextEnabledIndex(0, 4, 'previous', isDisabled([3]))).toBe(2);
  });

  it('starts from the first or last item when nothing is active', () => {
    expect(getNextEnabledIndex(-1, 3, 'next', isDisabled([]))).toBe(0);
    expect(getNextEnabledIndex(-1, 3, 'last', isDisabled([]))).toBe(2);
  });

  it('returns -1 when all items are disabled or there are none', () => {
    expect(getNextEnabledIndex(0, 2, 'next', isDisabled([0, 1]))).toBe(-1);
    expect(getNextEnabledIndex(-1, 0, 'next', isDisabled([]))).toBe(-1);
  });
});
