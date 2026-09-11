import type { CSSProperties } from 'react';
import type { PopoverPlacementStyle } from '../Popover.types';

export default (placementStyle: PopoverPlacementStyle): CSSProperties => {
  const validProps = [
    'position',
    'inset',
    'inset-inline-start',
    'inset-inline-end',
    'inset-block-start',
    'inset-block-end',
    'top',
    'right',
    'bottom',
    'left',
    'translate',
    'transform-origin',
    'visibility',
  ];

  return Object.fromEntries(
    Object.entries(placementStyle).filter(([prop]) => validProps.includes(prop)),
  );
};
