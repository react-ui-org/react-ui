import { useEffect } from 'react';

export const useClickOutside = (
  ref,
  callback,
) => {
  useEffect(() => {
    const handleClick = (event) => {
      // `composedPath()` is used to get the real event target even when the element
      // is rendered inside a shadow DOM, where `event.target` on the document level
      // is retargeted to the shadow DOM host element.
      const target = event.composedPath()[0];

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
