import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../tests/propTests/childrenEmptyPropTest';
import { tagPropTest } from '../../../../tests/propTests/tagPropTest';
import { Grid } from '../Grid';

/* eslint-disable sort-keys */
const responsiveBreakpoints = {
  xs: 'placeholder-xs',
  sm: 'placeholder-sm',
  md: 'placeholder-md',
  lg: 'placeholder-lg',
  xl: 'placeholder-xl',
  x2l: 'placeholder-x2l',
  x3l: 'placeholder-x3l',
};

const responsiveSpacingBreakpoints = {
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
  [`--rui-local-${infix}-xs`]: 'placeholder-xs',
  [`--rui-local-${infix}-sm`]: 'placeholder-sm',
  [`--rui-local-${infix}-md`]: 'placeholder-md',
  [`--rui-local-${infix}-lg`]: 'placeholder-lg',
  [`--rui-local-${infix}-xl`]: 'placeholder-xl',
  [`--rui-local-${infix}-x2l`]: 'placeholder-x2l',
  [`--rui-local-${infix}-x3l`]: 'placeholder-x3l',
});

const responsiveSpacingStyles = (infix) => ({
  [`--rui-local-${infix}-xs`]: 'var(--rui-dimension-space-1)',
  [`--rui-local-${infix}-sm`]: 'var(--rui-dimension-space-2)',
  [`--rui-local-${infix}-md`]: 'var(--rui-dimension-space-3)',
  [`--rui-local-${infix}-lg`]: 'var(--rui-dimension-space-4)',
  [`--rui-local-${infix}-xl`]: 'var(--rui-dimension-space-5)',
  [`--rui-local-${infix}-x2l`]: 'var(--rui-dimension-space-6)',
  [`--rui-local-${infix}-x3l`]: 'var(--rui-dimension-space-7)',
});

const defaultProps = {
  children: <div>content</div>,
};

describe('rendering', () => {
  it.each([
    [
      { alignContent: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('align-content')),
    ],
    [
      { alignContent: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-align-content-xs': 'placeholder' }),
    ],
    [
      { alignItems: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('align-items')),
    ],
    [
      { alignItems: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-align-items-xs': 'placeholder' }),
    ],
    [
      { autoFlow: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('auto-flow')),
    ],
    [
      { autoFlow: 'row dense' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow-xs': 'row dense' }),
    ],
    ...childrenEmptyPropTest,
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { columnGap: responsiveSpacingBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveSpacingStyles('column-gap')),
    ],
    [
      { columnGap: 0 },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-column-gap-xs': 'var(--rui-dimension-space-0)' }),
    ],
    [
      { columns: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('columns')),
    ],
    [
      { columns: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-columns-xs': 'placeholder' }),
    ],
    [
      { justifyContent: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('justify-content')),
    ],
    [
      { justifyContent: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-justify-content-xs': 'placeholder' }),
    ],
    [
      { justifyItems: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('justify-items')),
    ],
    [
      { justifyItems: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-justify-items-xs': 'placeholder' }),
    ],
    [
      { rowGap: responsiveSpacingBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveSpacingStyles('row-gap')),
    ],
    [
      { rowGap: 0 },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-row-gap-xs': 'var(--rui-dimension-space-0)' }),
    ],
    [
      { rows: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('rows')),
    ],
    [
      { rows: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-rows-xs': 'placeholder' }),
    ],
    ...tagPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Grid
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
