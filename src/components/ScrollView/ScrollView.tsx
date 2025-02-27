import React, {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TranslationsContext } from '../../providers/translations';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { Layout } from '../../types';
import { getElementsPositionDifference } from './_helpers/getElementsPositionDifference';
import { useLoadResize } from './_hooks/useLoadResizeHook';
import { useScrollPosition } from './_hooks/useScrollPositionHook';
import {
  PositionDifference,
  ScrollViewProps,
} from './ScrollView.types';
import styles from './ScrollView.module.scss';

// Function `getElementsPositionDifference` sometimes returns floating point values that results
// in inaccurate detection of start/end. It is necessary to accept this inaccuracy and take
// every value less or equal to 1px as start/end.
const EDGE_DETECTION_INACCURACY_PX = 1;

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>((props, ref) => {
  const {
    arrows = false,
    arrowsScrollStep = 200,
    autoScroll = 'off',
    children,
    endShadowBackground = 'linear-gradient(var(--rui-local-end-shadow-direction), rgba(255 255 255 / 1), rgba(255 255 255 / 0))',
    endShadowInitialOffset = '-1rem',
    endShadowSize = '2em',
    id,
    debounce = 50,
    direction,
    nextArrowColor,
    nextArrowElement,
    nextArrowInitialOffset = '-0.5rem',
    prevArrowColor,
    prevArrowElement,
    prevArrowInitialOffset = '-0.5rem',
    scrollbar = true,
    shadows = true,
    startShadowBackground = 'linear-gradient(var(--rui-local-start-shadow-direction), rgba(255 255 255 / 1), rgba(255 255 255 / 0))',
    startShadowInitialOffset = '-1rem',
    startShadowSize = '2em',
    ...restProps
  } = props;

  const translations = useContext(TranslationsContext);

  const [isAutoScrollInProgress, setIsAutoScrollInProgress] = useState(false);
  const [isScrolledAtStart, setIsScrolledAtStart] = useState(false);
  const [isScrolledAtEnd, setIsScrolledAtEnd] = useState(false);

  const scrollPositionStart = direction === 'horizontal' ? 'left' : 'top';
  const scrollPositionEnd = direction === 'horizontal' ? 'right' : 'bottom';
  const scrollViewContentEl = useRef<HTMLDivElement>(null);
  const blankRef = useRef<HTMLDivElement>(null);
  const scrollViewViewportEl: React.RefObject<HTMLDivElement> = (ref as React.RefObject<HTMLDivElement> ?? blankRef);

  const handleScrollViewState = (currentPosition: PositionDifference | null) => {
    if (currentPosition === null) {
      return;
    }

    const isScrolledAtStartActive = currentPosition[scrollPositionStart]
      <= -1 * EDGE_DETECTION_INACCURACY_PX;
    const isScrolledAtEndActive = currentPosition[scrollPositionEnd]
      >= EDGE_DETECTION_INACCURACY_PX;

    if (isScrolledAtStartActive !== isScrolledAtStart) {
      setIsScrolledAtStart(isScrolledAtStartActive);
    }

    if (isScrolledAtEndActive !== isScrolledAtEnd) {
      setIsScrolledAtEnd(isScrolledAtEndActive);
    }
  };

  /**
   * It handles scroll event fired on `scrollViewViewportEl` element. If autoScroll is in progress,
   * and element it scrolled to the end of viewport, `isAutoScrollInProgress` is set to `false`.
   */
  const handleScrollWhenAutoScrollIsInProgress = () => {
    if (
      scrollViewContentEl.current === null
      || scrollViewViewportEl.current === null
    ) {
      return;
    }

    const currentPosition = getElementsPositionDifference(
      scrollViewContentEl as React.RefObject<HTMLDivElement>,
      scrollViewViewportEl as React.RefObject<HTMLDivElement>,
    );

    if (
      currentPosition
      && currentPosition[scrollPositionEnd] <= EDGE_DETECTION_INACCURACY_PX
    ) {
      setIsAutoScrollInProgress(false);
      scrollViewViewportEl.current.removeEventListener('scroll', handleScrollWhenAutoScrollIsInProgress);
    }
  };

  /**
   * If autoScroll is enabled, it automatically scrolls viewport element to the end of the
   * viewport when content is changed. It is performed only when viewport element is
   * scrolled to the end of the viewport or when viewport element is in any position but
   * autoScroll triggered by previous change is still in progress.
   */
  const handleScrollWhenAutoScrollIsEnabled = (forceAutoScroll = false) => {
    if (autoScroll === 'off' || scrollViewContentEl.current === null || scrollViewViewportEl.current === null) {
      return () => {};
    }

    const scrollViewContentElement = scrollViewContentEl.current as unknown as HTMLElement;
    const scrollViewViewportElement = scrollViewViewportEl.current as unknown as HTMLElement;

    const differenceX = (direction === 'horizontal' && scrollViewContentElement) ? scrollViewContentElement.offsetWidth : 0;
    const differenceY = (direction !== 'horizontal' && scrollViewContentElement) ? scrollViewContentElement?.offsetHeight : 0;

    if (autoScroll === 'always' || forceAutoScroll) {
      scrollViewViewportElement?.scrollBy(differenceX, differenceY);
    } else if (!isScrolledAtEnd || isAutoScrollInProgress) {
      setIsAutoScrollInProgress(true);
      scrollViewViewportElement?.scrollBy(differenceX, differenceY);

      // Handler `handleScrollWhenAutoScrollIsInProgress` sets `isAutoScrollInProgress` to `false`
      // when viewport element is scrolled to the end of the viewport
      scrollViewViewportElement?.addEventListener('scroll', handleScrollWhenAutoScrollIsInProgress);

      return () => {
        scrollViewViewportElement?.removeEventListener('scroll', handleScrollWhenAutoScrollIsInProgress);
      };
    }

    return () => {};
  };

  useEffect(
    () => {
      handleScrollViewState(
        getElementsPositionDifference(
          scrollViewContentEl as React.RefObject<HTMLDivElement>,
          scrollViewViewportEl as React.RefObject<HTMLDivElement>,
        ),
      );
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useLoadResize(
    (currentPosition) => {
      handleScrollViewState(currentPosition);
      handleScrollWhenAutoScrollIsEnabled(true);
    },
    [isScrolledAtStart, isScrolledAtEnd],
    scrollViewContentEl,
    scrollViewViewportEl,
    debounce,
  );

  useScrollPosition(
    (currentPosition) => (handleScrollViewState(currentPosition)),
    [isScrolledAtStart, isScrolledAtEnd],
    scrollViewContentEl,
    scrollViewViewportEl,
    debounce,
  );

  const autoScrollChildrenKeys = autoScroll !== 'off' && React.Children.toArray(children)
    .map((child: ReactNode) => (child as React.ReactElement).key)
    .filter((key) => key !== null && key !== undefined)
    .reduce((reducedKeys, childKey) => reducedKeys + childKey.toString(), '');
  const autoScrollChildrenLength = autoScroll !== 'off' && children && Object.prototype.hasOwnProperty.call(children, 'length');

  useLayoutEffect(
    handleScrollWhenAutoScrollIsEnabled,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoScroll, autoScrollChildrenKeys, autoScrollChildrenLength],
  );

  const arrowHandler = (
    contentEl: React.RefObject<HTMLDivElement | null>,
    viewportEl: React.RefObject<HTMLDivElement>,
    shiftDirection: string,
    step: number,
    scrollViewDirection?: Layout,
  ) => {
    const offset = shiftDirection === 'next' ? step : -1 * step;
    const differenceX = scrollViewDirection === 'horizontal' ? offset : 0;
    const differenceY = scrollViewDirection !== 'horizontal' ? offset : 0;

    viewportEl.current.scrollBy(differenceX, differenceY);
  };

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        isScrolledAtStart && styles.isRootScrolledAtStart,
        isScrolledAtEnd && styles.isRootScrolledAtEnd,
        !scrollbar && styles.hasRootScrollbarDisabled,
        direction === 'horizontal' ? styles.isRootHorizontal : styles.isRootVertical,
      )}
      id={id}
      style={{
        '--rui-local-end-shadow-background': endShadowBackground,
        '--rui-local-end-shadow-direction': direction === 'horizontal' ? 'to left' : 'to top',
        '--rui-local-end-shadow-initial-offset': endShadowInitialOffset,
        '--rui-local-end-shadow-size': endShadowSize,
        '--rui-local-next-arrow-color': nextArrowColor,
        '--rui-local-next-arrow-initial-offset': nextArrowInitialOffset,
        '--rui-local-prev-arrow-color': prevArrowColor,
        '--rui-local-prev-arrow-initial-offset': prevArrowInitialOffset,
        '--rui-local-start-shadow-background': startShadowBackground,
        '--rui-local-start-shadow-direction': direction === 'horizontal' ? 'to right' : 'to bottom',
        '--rui-local-start-shadow-initial-offset': startShadowInitialOffset,
        '--rui-local-start-shadow-size': startShadowSize,
      } as React.CSSProperties}
    >
      <div
        className={styles.viewport}
        ref={scrollViewViewportEl}
      >
        <div
          className={styles.content}
          id={id && `${id}__content`}
          ref={scrollViewContentEl}
        >
          {children}
        </div>
      </div>
      {shadows && (
        <div
          aria-hidden
          className={styles.scrollingShadows}
        />
      )}
      {arrows && (
        <>
          <button
            className={styles.arrowPrev}
            id={id && `${id}__arrowPrevButton`}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              'prev',
              arrowsScrollStep,
              direction,
            )}
            title={translations.ScrollView.previous}
            type="button"
          >
            {prevArrowElement || (
              <span
                aria-hidden
                className={styles.arrowIcon}
              />
            )}
          </button>
          <button
            className={styles.arrowNext}
            id={id && `${id}__arrowNextButton`}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              'next',
              arrowsScrollStep,
              direction,
            )}
            title={translations.ScrollView.next}
            type="button"
          >
            {nextArrowElement || (
              <span
                aria-hidden
                className={styles.arrowIcon}
              />
            )}
          </button>
        </>
      )}
    </div>
  );
});

export const ScrollViewWithGlobalProps = withGlobalProps(ScrollView, 'ScrollView');

export default ScrollViewWithGlobalProps;
