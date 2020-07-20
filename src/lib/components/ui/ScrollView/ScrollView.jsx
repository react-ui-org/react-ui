import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLoadResize } from '../../../hooks/useLoadResizeHook';
import { useScrollPosition } from '../../../hooks/useScrollPositionHook';
import { getElementsPositionDifference } from '../../../services/elementPositionService';
import { withTranslationContext } from '../../../translation';
import styles from './ScrollView.scss';

export const ScrollView = (props) => {
  const {
    arrows,
    arrowsColor,
    arrowsScrollStep,
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

  const [isScrolledAtStart, setIsScrolledAtStart] = useState(false);
  const [isScrolledAtEnd, setIsScrolledAtEnd] = useState(false);

  const scrollPositionStart = direction === 'horizontal' ? 'left' : 'top';
  const scrollPositionEnd = direction === 'horizontal' ? 'right' : 'bottom';
  const scrollViewContentEl = useRef(null);
  const scrollViewViewportEl = useRef(null);

  const handleScrollViewState = (currentPosition) => {
    const isScrolledAtStartActive = currentPosition[scrollPositionStart] < 0;
    const isScrolledAtEndActive = currentPosition[scrollPositionEnd] > 0;

    if (isScrolledAtStartActive !== isScrolledAtStart) {
      setIsScrolledAtStart(isScrolledAtStartActive);
    }

    if (isScrolledAtEndActive !== isScrolledAtEnd) {
      setIsScrolledAtEnd(isScrolledAtEndActive);
    }
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
    (currentPosition) => (handleScrollViewState(currentPosition)),
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
      className={[
        styles.root,
        isScrolledAtStart ? styles.isRootScrolledAtStart : '',
        isScrolledAtEnd ? styles.isRootScrolledAtEnd : '',
        scrollbar ? '' : styles.hasRootScrollbarDisabled,
        direction === 'horizontal' ? styles.isRootHorizontal : styles.isRootVertical,
      ].join(' ')}
      style={inlineStyle(
        direction,
        arrowsColor,
        shadowColor,
        shadowSize,
        customStartShadowStyle,
        customEndShadowStyle,
      )}
      {...(id && { id })}
    >
      <div className={styles.viewport} ref={scrollViewViewportEl}>
        <div
          className={styles.content}
          ref={scrollViewContentEl}
          {...(id && { id: `${id}__content` })}
        >
          {children}
        </div>
      </div>
      <div className={styles.scrollingShadows} aria-hidden />
      {arrows && (
        <>
          <button
            className={styles.arrowPrev}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'prev',
              arrowsScrollStep,
            )}
            title={translations.previous}
            {...(id && { id: `${id}__arrowPrevButton` })}
          >
            {customPrevArrow || (
              <span className={styles.arrowIcon} aria-hidden />
            )}
          </button>
          <button
            className={styles.arrowNext}
            onClick={() => arrowHandler(
              scrollViewContentEl,
              scrollViewViewportEl,
              direction,
              'next',
              arrowsScrollStep,
            )}
            title={translations.next}
            {...(id && { id: `${id}__arrowNextButton` })}
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
  arrows: PropTypes.bool,
  arrowsColor: PropTypes.string,
  arrowsScrollStep: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  customEndShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  customNextArrow: PropTypes.node,
  customPrevArrow: PropTypes.node,
  customStartShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  debounce: PropTypes.number,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  id: PropTypes.string,
  scrollbar: PropTypes.bool,
  shadowColor: PropTypes.shape({
    alpha: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }),
  shadowSize: PropTypes.string,
  translations: PropTypes.shape({
    next: PropTypes.string.isRequired,
    previous: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(ScrollView, 'ScrollView');
