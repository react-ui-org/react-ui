import PropTypes from 'prop-types';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getElementsPositionDifference } from './_helpers/getElementsPositionDifference';
import { useLoadResize } from './_hooks/useLoadResizeHook';
import { useScrollPosition } from './_hooks/useScrollPositionHook';
import styles from './ScrollView.scss';

// Function `getElementsPositionDifference` sometimes returns floating point values that results
// in inaccurate detection of start/end. It is necessary to accept this inaccuracy and take
// every value less or equal to 1px as start/end.
const EDGE_DETECTION_INACCURACY_PX = 1;

export const ScrollView = (props) => {
  const {
    arrows,
    arrowsColor,
    arrowsScrollStep,
    autoScroll,
    children,
    customEndShadowStyle,
    customNextArrow,
    customPrevArrow,
    customStartShadowStyle,
    id,
    debounce,
    direction,
    scrollbar,
    shadowColor,
    shadowSize,
    translations,
  } = props;

  const [isAutoScrollInProgress, setIsAutoScrollInProgress] = useState(false);
  const [isScrolledAtStart, setIsScrolledAtStart] = useState(false);
  const [isScrolledAtEnd, setIsScrolledAtEnd] = useState(false);

  const scrollPositionStart = direction === 'horizontal' ? 'left' : 'top';
  const scrollPositionEnd = direction === 'horizontal' ? 'right' : 'bottom';
  const scrollViewContentEl = useRef(null);
  const scrollViewViewportEl = useRef(null);

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
   * the viewport when content is changed. It is performed only when viewport element is
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

  const setAlpha = (rgba, alpha) => ({
    ...rgba,
    alpha,
  });

  const rgbaToString = (rgba) => (
    `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
  );

  const inlineStyle = (
    scrollDirection,
    customArrowsColor,
    customShadowColor,
    customShadowSize,
    startShadowStyle,
    endShadowStyle,
  ) => {
    const shadowStartColor = rgbaToString(customShadowColor);
    const shadowEndColor = rgbaToString(setAlpha(customShadowColor, 0));

    /* eslint-disable sort-keys */
    return {
      '--rui-local-arrow-color': customArrowsColor || 'inherit',
      '--rui-local-shadow-width': scrollDirection === 'horizontal' ? shadowSize : 'auto',
      '--rui-local-shadow-height': scrollDirection === 'horizontal' ? 'auto' : shadowSize,
      '--rui-local-start-shadow-background':
        startShadowStyle.background
        || `linear-gradient(${direction === 'horizontal' ? 'to right' : 'to bottom'}, ${shadowStartColor}, ${shadowEndColor})`,
      '--rui-local-start-shadow-box-shadow': startShadowStyle.boxShadow || 'none',
      '--rui-local-end-shadow-background':
        endShadowStyle.background
        || `linear-gradient(${direction === 'horizontal' ? 'to left' : 'to top'}, ${shadowStartColor}, ${shadowEndColor})`,
      '--rui-local-end-shadow-box-shadow': endShadowStyle.boxShadow || 'none',
    };
    /* eslint-enable sort-keys */
  };

  const arrowHandler = (contentEl, viewportEl, scrollViewDirection, shiftDirection, step) => {
    const offset = shiftDirection === 'next' ? step : -1 * step;
    const differenceX = scrollViewDirection === 'horizontal' ? offset : 0;
    const differenceY = scrollViewDirection !== 'horizontal' ? offset : 0;

    viewportEl.current.scrollBy(differenceX, differenceY);
  };

  return (
    <div
      className={classNames(
        styles.root,
        isScrolledAtStart && styles.isRootScrolledAtStart,
        isScrolledAtEnd && styles.isRootScrolledAtEnd,
        !scrollbar && styles.hasRootScrollbarDisabled,
        direction === 'horizontal' ? styles.isRootHorizontal : styles.isRootVertical,
      )}
      style={inlineStyle(
        direction,
        arrowsColor,
        shadowColor,
        shadowSize,
        customStartShadowStyle,
        customEndShadowStyle,
      )}
      id={id}
    >
      <div className={styles.viewport} ref={scrollViewViewportEl}>
        <div
          className={styles.content}
          ref={scrollViewContentEl}
          id={id && `${id}__content`}
        >
          {children}
        </div>
      </div>
      <div className={styles.scrollingShadows} aria-hidden />
      {arrows && (
        <>
          <button
            type="button"
            className={styles.arrowPrev}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'prev',
              arrowsScrollStep,
            )}
            title={translations.previous}
            id={id && `${id}__arrowPrevButton`}
          >
            {customPrevArrow || (
              <span className={styles.arrowIcon} aria-hidden />
            )}
          </button>
          <button
            type="button"
            className={styles.arrowNext}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'next',
              arrowsScrollStep,
            )}
            title={translations.next}
            id={id && `${id}__arrowNextButton`}
          >
            {customNextArrow || (
              <span className={styles.arrowIcon} aria-hidden />
            )}
          </button>
        </>
      )}
    </div>
  );
};

ScrollView.defaultProps = {
  arrows: false,
  arrowsColor: undefined,
  arrowsScrollStep: 200,
  autoScroll: 'off',
  customEndShadowStyle: {},
  customNextArrow: null,
  customPrevArrow: null,
  customStartShadowStyle: {},
  debounce: 50,
  direction: 'vertical',
  id: undefined,
  scrollbar: true,
  shadowColor: {
    alpha: 1,
    blue: 255,
    green: 255,
    red: 255,
  },
  shadowSize: '2em',
};

ScrollView.propTypes = {
  /**
   * If `true`, display the arrow controls.
   */
  arrows: PropTypes.bool,
  /**
   * Text color of the arrow controls. Accepts any valid CSS color value.
   */
  arrowsColor: PropTypes.string,
  /**
   * Portion to scroll by when the arrows are clicked, in px.
   */
  arrowsScrollStep: PropTypes.number,
  /**
   * Auto scroll mechanism requires to have the `key` prop set for every child present in `children`
   * prop because it detects changes of these keys. Without the keys, it will not work.
   *
   * Option `always` means that auto scroll scrolls to the end every time the content changes.
   * Option `detectEnd` means that auto scroll scrolls to the end only when the content is changed
   * and the user scrolled at the end of the viewport at the moment of the change.
   *
   * See https://reactjs.org/docs/lists-and-keys.html#keys
   */
  autoScroll: PropTypes.oneOf(['always', 'detectEnd', 'off']),
  /**
   * Content to be scrollable.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom CSS to replace the default end scrolling shadow.
   */
  customEndShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  /**
   * Custom HTML or React Component to replace the default next-arrow control.
   */
  customNextArrow: PropTypes.node,
  /**
   * Custom HTML or React Component to replace the default prev-arrow control.
   */
  customPrevArrow: PropTypes.node,
  /**
   * Custom CSS to replace the default start scrolling shadow.
   */
  customStartShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  /**
   * Delay in ms before the display of arrows and scrolling shadows is evaluated during interaction.
   */
  debounce: PropTypes.number,
  /**
   * Direction of scrolling.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__content`
   * * `<ID>__arrowPrevButton`
   * * `<ID>__arrowNextButton`
   */
  id: PropTypes.string,
  /**
   * If `false`, the system scrollbar will be hidden.
   */
  scrollbar: PropTypes.bool,
  /**
   * Color of the default scrolling shadows in the RGBA format. It doesn't have effect on custom
   * scrolling shadows.
   */
  shadowColor: PropTypes.shape({
    alpha: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }),
  /**
   * Size of scrolling shadows. Works as height in the vertical mode and as width in the horizontal
   * mode.
   */
  shadowSize: PropTypes.string,
  /**
   * Translations required by the component.
   */
  translations: PropTypes.shape({
    next: PropTypes.string.isRequired,
    previous: PropTypes.string.isRequired,
  }).isRequired,
};

export const ScrollViewWithContext = withProviderContext(ScrollView, 'ScrollView');

export default ScrollViewWithContext;
