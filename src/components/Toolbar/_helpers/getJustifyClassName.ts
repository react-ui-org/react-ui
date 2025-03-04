import { Justify } from '../../../types';

export const getJustifyClassName = (value: Exclude<Justify, 'stretch'>, styles: Record<string, string>) => {
  if (value === 'start') {
    return styles.isToolbarJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isToolbarJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isToolbarJustifiedToEnd;
  }

  return styles.isToolbarJustifiedToSpaceBetween;
};

