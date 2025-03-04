import { Justify } from '../../../types';

export const getJustifyClassName = (value: Justify, styles: Record<string, string>) => {
  if (value === 'start') {
    return styles.isRootJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isRootJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isRootJustifiedToEnd;
  }

  if (value === 'space-between') {
    return styles.isRootJustifiedToSpaceBetween;
  }

  return styles.isRootJustifiedToStretch;
};
