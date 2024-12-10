import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import cleanPlacementStyle from './_helpers/cleanPlacementStyle';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import styles from './Popover.module.scss';

export const Popover = React.forwardRef((props, ref) => {
  const {
    placement,
    children,
    placementStyle,
    portalId,
    position,
    x,
    y,
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
      style={cleanPlacementStyle(placementStyle)}
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
  placementStyle: null,
  portalId: null,
  position: null,
  x: null,
  y: null,
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
   * Used for positioning the popover with a library like Floating UI. It is filtered,
   * then passed as to the popover as the `style` prop.
   */
  placementStyle: PropTypes.shape({
    bottom: PropTypes.string,
    inset: PropTypes.string,
    'inset-block-end': PropTypes.string,
    'inset-block-start': PropTypes.string,
    'inset-inline-end': PropTypes.string,
    'inset-inline-start': PropTypes.string,
    left: PropTypes.string,
    position: PropTypes.string,
    right: PropTypes.string,
    top: PropTypes.string,
    'transform-origin': PropTypes.string,
    translate: PropTypes.string,
  }),
  /**
   * If set, popover is rendered in the React Portal with that ID.
   */
  portalId: PropTypes.string,
  /**
   * This sets the CSS property `position` of the popover. This is reserved for use with Floating UI.
   */
  position: PropTypes.string,
  /**
   * This sets the CSS property `top` of the popover. This is reserved for use with Floating UI.
   */
  x: PropTypes.string,
  /**
   * This sets the CSS property `left` of the popover. This is reserved for use with Floating UI.
   */
  y: PropTypes.string,
};

export const PopoverWithGlobalProps = withGlobalProps(Popover, 'Popover');

export default PopoverWithGlobalProps;
