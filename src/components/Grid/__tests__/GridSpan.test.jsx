import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../tests/jest/propTests/childrenEmptyPropTest';
import { tagPropTest } from '../../../../tests/jest/propTests/tagPropTest';
import { GridSpan } from '../GridSpan';

const defaultProps = {
  children: <div>content</div>,
};

/* eslint-disable sort-keys */
const responsiveBreakpoints = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  x2l: 6,
  x3l: 7,
};
/* eslint-enable sort-keys */

const responsiveStyles = (infix) => ({
  [`--rui-local-${infix}-xs`]: 1,
  [`--rui-local-${infix}-sm`]: 2,
  [`--rui-local-${infix}-md`]: 3,
  [`--rui-local-${infix}-lg`]: 4,
  [`--rui-local-${infix}-xl`]: 5,
  [`--rui-local-${infix}-x2l`]: 6,
  [`--rui-local-${infix}-x3l`]: 7,
});

describe('rendering', () => {
  it.each([
    ...childrenEmptyPropTest,
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { columns: responsiveBreakpoints },
      (rootElement) => {
        // `toHaveStyle()` does not work well with numeric object values
        const styles = responsiveStyles('column-span');
        Object.keys(styles).forEach((key) => expect(rootElement).toHaveStyle(`${key}: ${styles[key]}`));
      },
    ],
    [
      { columns: 14 },
      (rootElement) => expect(rootElement).toHaveStyle('--rui-local-column-span-xs: 14'),
    ],
    [
      { rows: responsiveBreakpoints },
      (rootElement) => {
        // `toHaveStyle()` does not work well with numeric object values
        const styles = responsiveStyles('row-span');
        Object.keys(styles).forEach((key) => expect(rootElement).toHaveStyle(`${key}: ${styles[key]}`));
      },
    ],
    [
      { rows: 14 },
      (rootElement) => expect(rootElement).toHaveStyle('--rui-local-row-span-xs: 14'),
    ],
    ...tagPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <GridSpan
        {...defaultProps}
        {...testedProps}
      />
    ));
    assert(dom.container.firstChild);
  });
});
