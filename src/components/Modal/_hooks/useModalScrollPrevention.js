import { useLayoutEffect } from 'react';

export const useModalScrollPrevention = (preventScrollUnderneath) => {
  useLayoutEffect(
    () => {
      if (preventScrollUnderneath === 'off') {
        return () => {};
      }

      if (preventScrollUnderneath === 'default') {
        const scrollbarWidth = Math.abs(window.innerWidth - window.document.documentElement.clientWidth);
        const prevOverflow = window.document.body.style.overflow;
        const prevPaddingRight = window.document.body.style.paddingRight;

        window.document.body.style.overflow = 'hidden';

        if (Number.isNaN(parseInt(prevPaddingRight, 10))) {
          window.document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
          window.document.body.style.paddingRight = `calc(${prevPaddingRight} + ${scrollbarWidth}px)`;
        }

        return () => {
          window.document.body.style.overflow = prevOverflow;
          window.document.body.style.paddingRight = prevPaddingRight;
        };
      }

      preventScrollUnderneath?.start();

      return preventScrollUnderneath?.reset;
    },
    [preventScrollUnderneath],
  );
};
