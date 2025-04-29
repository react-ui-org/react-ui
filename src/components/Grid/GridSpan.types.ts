import type {
  JSX,
  ReactNode,
} from 'react';
/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable typescript-sort-keys/interface */

export type RowColumnsBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  x2l: number;
  x3l: number;
};

export type GridSpanProps = {
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children?: ReactNode;

  /**
   * Number of columns to span.
   */
  columns?: number | RowColumnsBreakpoints;

  /**
   * Number of rows to span.
   */
  rows?: number | RowColumnsBreakpoints;

  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements;
};
