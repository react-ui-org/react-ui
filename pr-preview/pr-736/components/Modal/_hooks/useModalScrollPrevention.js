import { useLayoutEffect } from 'react';

export const useModalScrollPrevention = (preventScrollUnderneath) => {
  useLayoutEffect(
    () => {
      if (preventScrollUnderneath === 'off') {
        return () => {};
      }

      if (preventScrollUnderneath instanceof HTMLElement) {
        const scrollableElement = preventScrollUnderneath;

        const scrollbarWidth = Math.abs(window.innerWidth - window.document.documentElement.clientWidth);
        const prevOverflow = scrollableElement.style.overflow;
        const prevPaddingRight = scrollableElement.style.paddingRight;

        scrollableElement.style.overflow = 'hidden';

        if (Number.isNaN(parseInt(prevPaddingRight, 10))) {
          scrollableElement.style.paddingRight = `${scrollbarWidth}px`;
        } else {
          scrollableElement.style.paddingRight = `calc(${prevPaddingRight} + ${scrollbarWidth}px)`;
        }

        return () => {
          scrollableElement.style.overflow = prevOverflow;
          scrollableElement.style.paddingRight = prevPaddingRight;
        };
      }

      preventScrollUnderneath?.start();

      return preventScrollUnderneath?.reset;
    },
    [preventScrollUnderneath],
  );
};
