// Ported from Spirit Design System (MIT License, Copyright (c) 2021 Alma Career Czechia s.r.o.),
// https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/gridKeyboardNavigation.ts

import type { IndexMove } from './getNextEnabledIndex.types';

/**
 * Get the next index for arrow, Home and End navigation, wrapping around at both ends.
 * Returns `-1` when there are no items.
 */
export const getWrappedIndex = (currentIndex: number, count: number, move: IndexMove): number => {
  if (count <= 0) {
    return -1;
  }

  switch (move) {
    case 'next':
      return (currentIndex + 1) % count;
    case 'previous':
      return (currentIndex - 1 + count) % count;
    case 'first':
      return 0;
    case 'last':
      return count - 1;
    default:
      return -1;
  }
};

/**
 * Same as `getWrappedIndex`, but keeps moving in the direction of the move until it lands
 * on an enabled item. Returns `-1` when all items are disabled.
 *
 * Use `-1` as `currentIndex` when no item is active.
 */
export const getNextEnabledIndex = (
  currentIndex: number,
  count: number,
  move: IndexMove,
  isDisabled: (index: number) => boolean,
): number => {
  const startIndex = getWrappedIndex(currentIndex, count, move);

  if (startIndex === -1) {
    return -1;
  }

  const step = (move === 'previous' || move === 'last') ? -1 : 1;
  let index = startIndex;

  for (let visited = 0; visited < count; visited += 1) {
    if (!isDisabled(index)) {
      return index;
    }

    index = (index + step + count) % count;
  }

  return -1;
};
