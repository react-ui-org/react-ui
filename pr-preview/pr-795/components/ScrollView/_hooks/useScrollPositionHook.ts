import {
  useRef,
  useEffect,
} from 'react';
import type { RefObject } from 'react';
import { getElementsPositionDifference } from '../_helpers/getElementsPositionDifference';
import type { ElementsPositionDifference } from '../ScrollView.types';

export const useScrollPosition = (
  effect: (currentPosition: ElementsPositionDifference) => void,
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

  useEffect(() => {
    const viewport = viewportEl.current as HTMLElement;

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
      clearTimeout(throttleTimeout.current ?? undefined);
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useScrollPosition;
