import React from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import styles from './Popover.scss';
import { PopoverProps } from './Popover.types';

export const Popover: React.FunctionComponent<PopoverProps> = React.forwardRef<HTMLDivElement, PopoverProps>((
  {
    placement = 'bottom',
    children,
    portalId,
    ...restProps
  },
  ref,
) => {
  const PopoverEl = (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        ref && styles.isRootControlled,
        getRootSideClassName(placement, styles),
        getRootAlignmentClassName(placement, styles),
      )}
      ref={ref}
    >
      {children}
      <span className={styles.arrow} />
    </div>
  );

  if (portalId && document.getElementById(portalId)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return createPortal(PopoverEl, document.getElementById(portalId)!);
  }
  return PopoverEl;
});

export const PopoverWithGlobalProps = withGlobalProps(Popover, 'Popover');

export default PopoverWithGlobalProps;
