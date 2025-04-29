import {
  useLayoutEffect,
  useRef,
} from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';
import type { PositionDifference } from '../ScrollView.types';

export const useLoadResize = (
  effect: (currentPosition: PositionDifference | null) => void,
  dependencies: boolean[],
  contentEl: React.RefObject<HTMLDivElement | null>,
  viewportEl: React.RefObject<HTMLDivElement>,
  wait: number,
) => {
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

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
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      window.removeEventListener('load', handleLoadResize);
      window.removeEventListener('resize', handleLoadResize);
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useLoadResize;
