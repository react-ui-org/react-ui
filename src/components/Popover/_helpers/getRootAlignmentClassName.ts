import type { CssModuleClasses } from '../../../types';
import type { PopoverPlacement } from '../Popover.types';

export default (placement: PopoverPlacement, styles: CssModuleClasses) => {
  const alignment = placement.split('-')[1];

  if (alignment === 'start') {
    return styles.isRootAtStart;
  }

  if (alignment === 'end') {
    return styles.isRootAtEnd;
  }

  return styles.isRootAtCenter;
};
