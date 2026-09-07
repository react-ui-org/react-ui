import {
  useLayoutEffect,
  useRef,
} from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';

export const useLoadResize = (effect, dependencies, contentEl, viewportEl, wait) => {
  const throttleTimeout = useRef(null);

  const callBack = (wasDelayed = false) => {
    effect(getElementsPositionDifference(contentEl, viewportEl));

    if (wasDelayed) {
      throttleTimeout.current = null;
    }
  };

  useLayoutEffect(() => {
    const handleLoadResize = () => {
      if (wait) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(callBack, wait, true);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('load', handleLoadResize);
    window.addEventListener('resize', handleLoadResize);

    return () => {
      clearTimeout(throttleTimeout.current);
      window.removeEventListener('load', handleLoadResize);
      window.removeEventListener('resize', handleLoadResize);
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useLoadResize;
