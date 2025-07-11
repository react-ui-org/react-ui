import {
  useRef,
  useEffect,
} from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';

export const useScrollPosition = (effect, contentEl, viewportEl, wait) => {
  const throttleTimeout = useRef(null);

  const callBack = (wasDelayed = false) => {
    effect(getElementsPositionDifference(contentEl, viewportEl));

    if (wasDelayed) {
      throttleTimeout.current = null;
    }
  };

  useEffect(() => {
    const viewport = viewportEl.current;

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(callBack, wait, true);
        }
      } else {
        callBack();
      }
    };

    viewport.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(throttleTimeout.current);
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useScrollPosition;
