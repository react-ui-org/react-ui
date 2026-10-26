import type { IndexMove } from '../../MultiSelectField.types';
import { getClampedIndex } from './getClampedIndex';

/**
 * Same as `getClampedIndex`, but keeps moving in the direction of the move until it lands on an enabled item.
 * When there is no enabled item in that direction, the current item is kept if it is enabled.
 *
 * @param currentIndex Index the move starts from, `-1` when no item is active.
 * @param count Number of items.
 * @param move Direction of the move.
 * @param isDisabled Tells whether the item at the given index is disabled.
 * @returns Index of the reached enabled item, `-1` when no item is enabled.
 */
export const getNextEnabledIndex = (
  currentIndex: number,
  count: number,
  move: IndexMove,
  isDisabled: (index: number) => boolean,
): number => {
  const startIndex = getClampedIndex(currentIndex, count, move);

  if (startIndex === -1) {
    return -1;
  }

  const step = (move === 'previous' || move === 'last') ? -1 : 1;

  for (let index = startIndex; index >= 0 && index < count; index += step) {
    if (!isDisabled(index)) {
      return index;
    }
  }

  const isCurrentEnabled = currentIndex >= 0 && currentIndex < count && !isDisabled(currentIndex);

  return isCurrentEnabled ? currentIndex : -1;
};
