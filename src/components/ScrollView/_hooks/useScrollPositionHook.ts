import {
  useLayoutEffect,
  useRef,
} from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';
import { PositionDifference } from '../ScrollView.types';

export const useScrollPosition = (
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
    if (!viewportEl.current) { return undefined; }

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
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useScrollPosition;
