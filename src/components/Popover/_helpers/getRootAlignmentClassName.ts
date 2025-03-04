import { Placement } from '../../../types';

export default (placement: Placement, styles: Record<string, string>) => {
  const alignment = placement.split('-')[1];

  if (alignment === 'start') {
    return styles.isRootAtStart;
  }

  if (alignment === 'end') {
    return styles.isRootAtEnd;
  }

  return styles.isRootAtCenter;
};
