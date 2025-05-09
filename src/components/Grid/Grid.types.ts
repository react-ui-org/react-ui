import type {
  JSX,
  ReactNode,
} from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';
/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable typescript-sort-keys/interface */

export type GridBreakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  x2l: string;
  x3l: string;
};

type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GridGapBreakpoints = {
  xs: GridGap;
  sm: GridGap;
  md: GridGap;
  lg: GridGap;
  xl: GridGap;
  x2l: GridGap;
  x3l: GridGap;
};

export type BreakPointKeys = keyof GridBreakpoints & keyof GridGapBreakpoints;

export type GridProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content alignment. Accepts any valid value of `align-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) for more.
   */
  alignContent?: string | GridBreakpoints;

  /**
   * Items alignment. Accepts any valid value of `align-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) for more.
   */
  alignItems?: string | GridBreakpoints;

  /**
   * Grid auto-flow algorithm to be used. Accepts any valid value of `grid-auto-flow` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) for more.
   */
  autoFlow?: string | GridBreakpoints;

  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children?: ReactNode;

  /**
   * Gap between columns. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more about `column-gap`.
   */
  columnGap?: string | GridGapBreakpoints;

  /**
   * Grid columns. Accepts any valid value of `grid-template-columns` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) for more.
   */
  columns?: string | GridBreakpoints;

  /**
   * Content justification. Accepts any valid value of `justify-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for more.
   */
  justifyContent?: string | GridBreakpoints;

  /**
   * Items justification. Accepts any valid value of `justify-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) for more.
   */
  justifyItems?: string | GridBreakpoints;

  /**
   * Gap between rows. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more about `row-gap`.
   */
  rowGap?: string | GridGapBreakpoints;

  /**
   * Grid rows. Accepts any valid value of `grid-template-rows` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) for more.
   */
  rows?: string | GridBreakpoints;

  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements;
};
