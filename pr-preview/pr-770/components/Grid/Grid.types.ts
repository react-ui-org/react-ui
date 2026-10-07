import type {
  HTMLAttributes,
  JSX,
  ReactNode,
} from 'react';
import type { Breakpoint } from '../../types';

/**
 * A value that is either the same for all breakpoints or defined per breakpoint.
 */
export type GridResponsiveValue<Value> = Value | Partial<Record<Breakpoint, Value>>;

export type GridSpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Any valid HTML tag.
 */
export type GridTag = keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap;

/**
 * Props of the `Grid` component.
 */
export type GridProps = HTMLAttributes<HTMLElement> & {
  /**
   * Content alignment. Accepts any valid value of `align-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) for more.
   */
  alignContent?: GridResponsiveValue<string>;
  /**
   * Items alignment. Accepts any valid value of `align-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) for more.
   */
  alignItems?: GridResponsiveValue<string>;
  /**
   * Grid auto-flow algorithm to be used. Accepts any valid value of `grid-auto-flow` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) for more.
   */
  autoFlow?: GridResponsiveValue<string>;
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Gap between columns. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more about `column-gap`.
   */
  columnGap?: GridResponsiveValue<GridSpacingValue>;
  /**
   * Grid columns. Accepts any valid value of `grid-template-columns` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) for more.
   */
  columns?: GridResponsiveValue<string>;
  /**
   * Content justification. Accepts any valid value of `justify-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for more.
   */
  justifyContent?: GridResponsiveValue<string>;
  /**
   * Items justification. Accepts any valid value of `justify-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) for more.
   */
  justifyItems?: GridResponsiveValue<string>;
  /**
   * Gap between rows. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more about `row-gap`.
   */
  rowGap?: GridResponsiveValue<GridSpacingValue>;
  /**
   * Grid rows. Accepts any valid value of `grid-template-rows` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) for more.
   */
  rows?: GridResponsiveValue<string>;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: GridTag;
};

/**
 * Props of the `GridSpan` component.
 */
export type GridSpanProps = HTMLAttributes<HTMLElement> & {
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Number of columns to span.
   */
  columns?: GridResponsiveValue<number>;
  /**
   * Number of rows to span.
   */
  rows?: GridResponsiveValue<number>;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: GridTag;
};

/**
 * Value of a single breakpoint of a responsive Grid prop.
 */
export type GridResponsivePropertyValue = string | number;
