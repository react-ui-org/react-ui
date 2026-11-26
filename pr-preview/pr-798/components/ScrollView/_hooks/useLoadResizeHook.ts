import {
  useLayoutEffect,
  useRef,
} from 'react';
import type {
  DependencyList,
  RefObject,
} from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';
import type { ElementsPositionDifference } from '../ScrollView.types';

export const useLoadResize = (
  effect: (currentPosition: ElementsPositionDifference) => void,
  dependencies: DependencyList,
  contentEl: RefObject<HTMLElement | null>,
  viewportEl: RefObject<HTMLElement | null>,
  wait: number,
) => {
  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      clearTimeout(throttleTimeout.current ?? undefined);
      window.removeEventListener('load', handleLoadResize);
      window.removeEventListener('resize', handleLoadResize);
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useLoadResize;
