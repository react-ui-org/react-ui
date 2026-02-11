import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { transferProps } from '../../helpers/transferProps';
import { classNames } from '../../helpers/classNames';
import { withGlobalProps } from '../../providers/globalProps';
import cleanPlacementStyle from './_helpers/cleanPlacementStyle';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import styles from './Popover.module.scss';

export const Popover = React.forwardRef((props, ref) => {
  const {
    placement,
    children,
    placementStyle,
    popoverTargetId,
    portalId,
    ...restProps
  } = props;

  const PopoverEl = (
    <>
      {/**
        * This hack is needed because the default behavior of the Popover API is to place the popover into a
        * top-layer. It is currently not possible to position an element in the top-layer relative to a normal element.
        * This will create a hidden browser popover, then with CSS it will open and close the RUI popover.
        */}
      {!!popoverTargetId && (
        <div
          className={styles.helper}
          id={popoverTargetId}
          popover="auto"
        />
      )}
      <div
        {...transferProps(restProps)}
        className={classNames(
          styles.root,
          ref && styles.isRootControlled,
          popoverTargetId && styles.controlledPopover,
          getRootSideClassName(placement, styles),
          getRootAlignmentClassName(placement, styles),
        )}
        ref={ref}
        style={placementStyle ? cleanPlacementStyle(placementStyle) : undefined}
      >
        {children}
        <span className={styles.arrow} />
      </div>
    </>
  );

  if (portalId === undefined) {
    return PopoverEl;
  }

  return createPortal(PopoverEl, document.getElementById(portalId));
});

Popover.defaultProps = {
  placement: 'bottom',
  placementStyle: undefined,
  popoverTargetId: undefined,
  portalId: undefined,
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
   * then passed to the popover as the `style` prop.
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
   * If set, the popover will become controlled, meaning it will be hidden by default and will need a trigger to open.
   * This sets the ID of the internal helper element for the popover.
   * Assign the same ID to `popovertarget` of a trigger to make it open and close.
   */
  popoverTargetId: PropTypes.string,
  /**
   * If set, popover is rendered in the React Portal with that ID.
   */
  portalId: PropTypes.string,
};

export const PopoverWithGlobalProps = withGlobalProps(Popover, 'Popover');

export default PopoverWithGlobalProps;
