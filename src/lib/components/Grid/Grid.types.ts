type SpacingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable @typescript-eslint/sort-type-union-intersection-members */
export type StringBreakPoints = {
  lg?: string;
  md?: string;
  sm?: string;
  x2l?: string;
  x3l?: string;
  xl?: string;
  xs?: string;
};

export type NumberBreakPoints = {
  lg?: number,
  md?: number,
  sm?: number,
  x2l?: number,
  x3l?: number,
  xl?: number,
  xs?: number
};

export type ResponsiveString = string | StringBreakPoints;

export type ResponsiveNumber = SpacingValues | NumberBreakPoints;

interface GridProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content alignment. Accepts any valid value of `align-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) for more.
   */
  alignContent?: ResponsiveString,
  /**
   * Items alignment. Accepts any valid value of `align-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) for more.
   */
  alignItems?: ResponsiveString,
  /**
   * Grid auto-flow algorithm to be used. Accepts any valid value of `grid-auto-flow` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) for more.
   */
  autoFlow?: ResponsiveString,
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children: React.ReactNode,
  /**
   * Gap between columns. Accepts any of [spacing values](/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more about `column-gap`.
   */
  columnGap?: ResponsiveNumber,
  /**
   * Grid columns. Accepts any valid value of `grid-template-columns` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) for more.
   */
  columns?: ResponsiveString,
  /**
   * Content justification. Accepts any valid value of `justify-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for more.
   */
  justifyContent?: ResponsiveString,

  /**
   * Items justification. Accepts any valid value of `justify-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) for more.
   */
  justifyItems?: ResponsiveString,
  /**
   * Gap between rows. Accepts any of [spacing values](/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more about `row-gap`.
   */
  rowGap?: ResponsiveNumber
  /**
   * Grid rows. Accepts any valid value of `grid-template-rows` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) for more.
   */
  rows?: ResponsiveString,
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements,
}

export interface GridSpanProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children?: React.ReactNode;
  /**
   * Number of columns to span.
   */
  columns?: ResponsiveNumber;
  /**
   * Number of rows to span.
   */
  rows?: ResponsiveNumber;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements;
}

export default GridProps;
