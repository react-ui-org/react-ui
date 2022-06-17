import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { tagPropTest } from '../../../../../tests/propTests/tagPropTest';
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
      { columnGap: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('column-gap')),
    ],
    [
      { columnGap: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-column-gap-xs': 'placeholder' }),
    ],
    [
      { columns: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('columns')),
    ],
    [
      { columns: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-columns-xs': 'placeholder' }),
    ],
    ...idPropTest,
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
      { rowGap: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('row-gap')),
    ],
    [
      { rowGap: 'placeholder' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-row-gap-xs': 'placeholder' }),
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
