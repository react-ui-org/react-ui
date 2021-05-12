import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { idPropTest } from '../../../../../../tests/propTests/idPropTest';
import { Grid } from '../Grid';

/* eslint-disable sort-keys */
const responsiveBreakpoints = {
  xs: 'placeholder-xs',
  sm: 'placeholder-sm',
  md: 'placeholder-md',
  lg: 'placeholder-lg',
  xl: 'placeholder-xl',
  xxl: 'placeholder-xxl',
  xxxl: 'placeholder-xxxl',
};
/* eslint-enable sort-keys */

const responsiveStyles = (infix) => ({
  [`--rui-local-${infix}-xs`]: 'placeholder-xs',
  [`--rui-local-${infix}-sm`]: 'placeholder-sm',
  [`--rui-local-${infix}-md`]: 'placeholder-md',
  [`--rui-local-${infix}-lg`]: 'placeholder-lg',
  [`--rui-local-${infix}-xl`]: 'placeholder-xl',
  [`--rui-local-${infix}-xxl`]: 'placeholder-xxl',
  [`--rui-local-${infix}-xxxl`]: 'placeholder-xxxl',
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
      { autoFlow: 'row' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow': 'row' }),
    ],
    [
      { autoFlow: 'column' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow': 'column' }),
    ],
    [
      { autoFlow: 'dense' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow': 'dense' }),
    ],
    [
      { autoFlow: 'row dense' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow': 'row dense' }),
    ],
    [
      { autoFlow: 'column dense' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-auto-flow': 'column dense' }),
    ],
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeNull(),
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
