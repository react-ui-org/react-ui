import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Calls the callback when the user clicks anywhere on the page outside the referenced element.
 * Keep the callback stable, e.g. with `useCallback`, so the document listener is not reattached on every render.
 *
 * @param ref Ref of the element clicks inside of which are ignored.
 * @param callback Called on a click outside the element.
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    /**
     * Calls the callback when the click did not happen inside the referenced element.
     *
     * @param event Click event of the document.
     */
    const handleClick = (event: MouseEvent) => {
      // `composedPath()` is used instead of `event.target`, which is retargeted to the shadow DOM host
      // when the element is rendered inside a shadow DOM. The path is captured when the event is dispatched,
      // so the click still counts as inside when its handler removed the clicked node from the element.
      if (ref.current && !event.composedPath().includes(ref.current)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
