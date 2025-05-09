import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { transferProps } from '../../helpers/transferProps';
import { classNames } from '../../helpers/classNames';
import { withGlobalProps } from '../../providers/globalProps';
import cleanPlacementStyle from './_helpers/cleanPlacementStyle';
import getRootSideClassName from './_helpers/getRootSideClassName';
import getRootAlignmentClassName from './_helpers/getRootAlignmentClassName';
import type { PopoverProps } from './Popover.types';
import styles from './Popover.module.scss';

export const Popover = forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const {
    placement = 'bottom',
    children,
    placementStyle,
    popoverTargetId,
    portalId,
    ...restProps
  }: PopoverProps = props;

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

  return createPortal(PopoverEl, document.getElementById(portalId) as HTMLElement);
});

export const PopoverWithGlobalProps = withGlobalProps(Popover, 'Popover');

export default PopoverWithGlobalProps;
