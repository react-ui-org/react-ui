import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import { getElementsPositionDifference } from './_helpers/getElementsPositionDifference';
import { useLoadResize } from './_hooks/useLoadResizeHook';
import { useScrollPosition } from './_hooks/useScrollPositionHook';
import styles from './ScrollView.scss';

// Function `getElementsPositionDifference` sometimes returns floating point values that results
// in inaccurate detection of start/end. It is necessary to accept this inaccuracy and take
// every value less or equal to 1px as start/end.
const EDGE_DETECTION_INACCURACY_PX = 1;

export const ScrollView = React.forwardRef((props, ref) => {
  const {
    arrows,
    arrowsScrollStep,
    autoScroll,
    children,
    endShadowBackground,
    endShadowInitialOffset,
    endShadowSize,
    id,
    debounce,
    direction,
    nextArrowColor,
    nextArrowElement,
    nextArrowInitialOffset,
    prevArrowColor,
    prevArrowElement,
    prevArrowInitialOffset,
    scrollbar,
    shadows,
    startShadowBackground,
    startShadowInitialOffset,
    startShadowSize,
    ...restProps
  } = props;

  const { translations } = useContext(RUIContext);

  const [isAutoScrollInProgress, setIsAutoScrollInProgress] = useState(false);
  const [isScrolledAtStart, setIsScrolledAtStart] = useState(false);
  const [isScrolledAtEnd, setIsScrolledAtEnd] = useState(false);

  const scrollPositionStart = direction === 'horizontal' ? 'left' : 'top';
  const scrollPositionEnd = direction === 'horizontal' ? 'right' : 'bottom';
  const scrollViewContentEl = useRef(null);
  const blankRef = useRef(null);
  const scrollViewViewportEl = ref ?? blankRef;

  const handleScrollViewState = (currentPosition) => {
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
    const currentPosition = getElementsPositionDifference(
      scrollViewContentEl,
      scrollViewViewportEl,
    );

    if (currentPosition[scrollPositionEnd] <= EDGE_DETECTION_INACCURACY_PX) {
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
    if (autoScroll === 'off') {
      return () => {};
    }

    const scrollViewContentElement = scrollViewContentEl.current;
    const scrollViewViewportElement = scrollViewViewportEl.current;

    const differenceX = direction === 'horizontal' ? scrollViewContentElement.offsetWidth : 0;
    const differenceY = direction !== 'horizontal' ? scrollViewContentElement.offsetHeight : 0;

    if (autoScroll === 'always' || forceAutoScroll) {
      scrollViewViewportElement.scrollBy(differenceX, differenceY);
    } else if (!isScrolledAtEnd || isAutoScrollInProgress) {
      setIsAutoScrollInProgress(true);
      scrollViewViewportElement.scrollBy(differenceX, differenceY);

      // Handler `handleScrollWhenAutoScrollIsInProgress` sets `isAutoScrollInProgress` to `false`
      // when viewport element is scrolled to the end of the viewport
      scrollViewViewportElement.addEventListener('scroll', handleScrollWhenAutoScrollIsInProgress);

      return () => {
        scrollViewViewportElement.removeEventListener('scroll', handleScrollWhenAutoScrollIsInProgress);
      };
    }

    return () => {};
  };

  useEffect(
    () => {
      handleScrollViewState(
        getElementsPositionDifference(scrollViewContentEl, scrollViewViewportEl),
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

  const autoScrollChildrenKeys = autoScroll !== 'off' && children && React.Children
    .map(children, (child) => child.key)
    .reduce((reducedKeys, childKey) => reducedKeys + childKey, '');
  const autoScrollChildrenLength = autoScroll !== 'off' && children && children.length;

  useLayoutEffect(
    handleScrollWhenAutoScrollIsEnabled,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoScroll, autoScrollChildrenKeys, autoScrollChildrenLength],
  );

  const arrowHandler = (contentEl, viewportEl, scrollViewDirection, shiftDirection, step) => {
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
      }}
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
        <div className={styles.scrollingShadows} aria-hidden />
      )}
      {arrows && (
        <>
          <button
            className={styles.arrowPrev}
            id={id && `${id}__arrowPrevButton`}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'prev',
              arrowsScrollStep,
            )}
            title={translations.ScrollView.previous}
            type="button"
          >
            {prevArrowElement || (
              <span className={styles.arrowIcon} aria-hidden />
            )}
          </button>
          <button
            className={styles.arrowNext}
            id={id && `${id}__arrowNextButton`}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'next',
              arrowsScrollStep,
            )}
            title={translations.ScrollView.next}
            type="button"
          >
            {nextArrowElement || (
              <span className={styles.arrowIcon} aria-hidden />
            )}
          </button>
        </>
      )}
    </div>
  );
});

ScrollView.defaultProps = {
  arrows: false,
  arrowsScrollStep: 200,
  autoScroll: 'off',
  children: null,
  debounce: 50,
  direction: 'vertical',
  endShadowBackground: 'linear-gradient(var(--rui-local-end-shadow-direction), rgba(255 255 255 / 1), rgba(255 255 255 / 0))',
  endShadowInitialOffset: '-1rem',
  endShadowSize: '2em',
  id: undefined,
  nextArrowColor: undefined,
  nextArrowElement: null,
  nextArrowInitialOffset: '-0.5rem',
  prevArrowColor: undefined,
  prevArrowElement: null,
  prevArrowInitialOffset: '-0.5rem',
  ref: undefined,
  scrollbar: true,
  shadows: true,
  startShadowBackground: 'linear-gradient(var(--rui-local-start-shadow-direction), rgba(255 255 255 / 1), rgba(255 255 255 / 0))',
  startShadowInitialOffset: '-1rem',
  startShadowSize: '2em',
};

ScrollView.propTypes = {
  /**
   * If `true`, display the arrow controls.
   */
  arrows: PropTypes.bool,
  /**
   * Portion to scroll by when the arrows are clicked, in px.
   */
  arrowsScrollStep: PropTypes.number,
  /**
   * The auto-scroll mechanism requires having the `key` prop set for every child present in `children`
   * because it detects changes of those keys. Without the keys, the auto-scroll will not work.
   *
   * Option `always` means the auto-scroll scrolls to the end every time the content changes.
   * Option `detectEnd` means the auto-scroll scrolls to the end only when the content is changed
   * and the user has scrolled at the end of the viewport at the moment of the change.
   *
   * See https://reactjs.org/docs/lists-and-keys.html#keys
   */
  autoScroll: PropTypes.oneOf(['always', 'detectEnd', 'off']),
  /**
   * Content to be scrollable.
   */
  children: PropTypes.node,
  /**
   * Delay in ms before the display of arrows and scrolling shadows is evaluated during interaction.
   */
  debounce: PropTypes.number,
  /**
   * Direction of scrolling.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Custom background of the end scrolling shadow. Can be a CSS gradient or an image `url()`.
   */
  endShadowBackground: PropTypes.string,
  /**
   * Initial offset of the end scrolling shadow (transitioned). If set, the end scrolling shadow slides in
   * by this distance.
   */
  endShadowInitialOffset: PropTypes.string,
  /**
   * Size of the end scrolling shadow. Accepts any valid CSS length value.
   */
  endShadowSize: PropTypes.string,
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__content`
   * * `<ID>__arrowPrevButton`
   * * `<ID>__arrowNextButton`
   */
  id: PropTypes.string,
  /**
   * Text color of the end arrow control. Accepts any valid CSS color value.
   */
  nextArrowColor: PropTypes.string,
  /**
   * Custom HTML or React Component to replace the default next-arrow control.
   */
  nextArrowElement: PropTypes.node,
  /**
   * Initial offset of the end arrow control (transitioned). If set, the next arrow slides in by this distance.
   */
  nextArrowInitialOffset: PropTypes.string,
  /**
   * Text color of the start arrow control. Accepts any valid CSS color value.
   */
  prevArrowColor: PropTypes.string,
  /**
   * Custom HTML or React Component to replace the default prev-arrow control.
   */
  prevArrowElement: PropTypes.node,
  /**
   * Initial offset of the start arrow control (transitioned). If set, the prev arrow slides in by this distance.
   */
  prevArrowInitialOffset: PropTypes.string,
  /**
   * Reference forwarded to the scrolling viewport `div` element.
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * If `false`, the system scrollbar will be hidden.
   */
  scrollbar: PropTypes.bool,
  /**
   * If `true`, display scrolling shadows.
   */
  shadows: PropTypes.bool,
  /**
   * Custom background of the start scrolling shadow. Can be a CSS gradient or an image `url()`.
   */
  startShadowBackground: PropTypes.string,
  /**
   * Initial offset of the start scrolling shadow (transitioned). If set, the start scrolling shadow slides in
   * by this distance.
   */
  startShadowInitialOffset: PropTypes.string,
  /**
   * Size of the start scrolling shadow. Accepts any valid CSS length value.
   */
  startShadowSize: PropTypes.string,
};

export const ScrollViewWithGlobalProps = withGlobalProps(ScrollView, 'ScrollView');

export default ScrollViewWithGlobalProps;
