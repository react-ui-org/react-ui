import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import withForwardedRef from '../withForwardedRef';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import styles from './Popover.scss';

export const Popover = ({
  forwardedRef,
  placement,
  children,
  id,
  portalId,
  ...restProps
}) => {
  const PopoverEl = (
    <div
      className={classNames(
        styles.root,
        forwardedRef && styles.isRootControlled,
        getRootSideClassName(placement, styles),
        getRootAlignmentClassName(placement, styles),
      )}
      id={id}
      ref={forwardedRef}
      {...transferProps(restProps)}
    >
      {children}
      <span className={styles.arrow} />
    </div>
  );

  if (portalId === null) {
    return PopoverEl;
  }

  return createPortal(PopoverEl, document.getElementById(portalId));
};

Popover.defaultProps = {
  forwardedRef: undefined,
  id: undefined,
  placement: 'bottom',
  portalId: null,
};

Popover.propTypes = {
  /**
   * Popover content.
   */
  children: PropTypes.node.isRequired,
  /**
   * Reference forwarded to the root `div` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
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

export const PopoverWithContext = withForwardedRef(withGlobalProps(Popover, 'Popover'));

export default PopoverWithContext;
