import type { IndexMove } from '../../MultiSelectField.types';

/**
 * Get the index for arrow, Home and End navigation. Moves stop at the first and the last item, they do not
 * wrap around.
 *
 * @param currentIndex Index the move starts from, `-1` when no item is active.
 * @param count Number of items.
 * @param move Direction of the move.
 * @returns Index of the reached item, `-1` when there are no items.
 */
export const getClampedIndex = (currentIndex: number, count: number, move: IndexMove): number => {
  if (count <= 0) {
    return -1;
  }

  switch (move) {
    case 'next':
      return Math.min(currentIndex + 1, count - 1);
    case 'previous':
      return Math.max(currentIndex - 1, 0);
    case 'first':
      return 0;
    case 'last':
      return count - 1;
    default:
      return -1;
  }
};
