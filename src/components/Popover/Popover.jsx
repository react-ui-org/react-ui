import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import styles from './Popover.module.scss';

export const Popover = React.forwardRef((props, ref) => {
  const {
    placement,
    children,
    portalId,
    ...restProps
  } = props;

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

  if (portalId === null) {
    return PopoverEl;
  }

  return createPortal(PopoverEl, document.getElementById(portalId));
});

Popover.defaultProps = {
  placement: 'bottom',
  portalId: null,
};

Popover.propTypes = {
  /**
   * Popover content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Popover placement affects position of the arrow.
   * Compatible with [Floating UI API](https://floating-ui.com/docs/computePosition#placement).
   */
  placement: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ]),
  /**
   * If set, popover is rendered in the React Portal with that ID.
   */
  portalId: PropTypes.string,
};

export const PopoverWithGlobalProps = withGlobalProps(Popover, 'Popover');

export default PopoverWithGlobalProps;
