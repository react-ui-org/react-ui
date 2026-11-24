import type { RefObject } from 'react';
import type { ElementsPositionDifference } from '../ScrollView.types';

export const getElementsPositionDifference = (
  contentEl: RefObject<HTMLElement | null>,
  viewportEl: RefObject<HTMLElement | null>,
): ElementsPositionDifference => {
  const contentPosition = (contentEl.current as HTMLElement).getBoundingClientRect();
  const viewportPosition = (viewportEl.current as HTMLElement).getBoundingClientRect();

  return {
    bottom: contentPosition.bottom - viewportPosition.bottom,
    left: contentPosition.left - viewportPosition.left,
    right: contentPosition.right - viewportPosition.right,
    top: contentPosition.top - viewportPosition.top,
  };
};
