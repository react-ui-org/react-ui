import type { CssModuleClasses } from '../../../types';
import type { PopoverPlacement } from '../Popover.types';

export default (placement: PopoverPlacement, styles: CssModuleClasses) => {
  const side = placement.split('-')[0];

  if (side === 'top') {
    return styles.isRootAtTop;
  }

  if (side === 'right') {
    return styles.isRootAtRight;
  }

  if (side === 'bottom') {
    return styles.isRootAtBottom;
  }

  return styles.isRootAtLeft;
};
