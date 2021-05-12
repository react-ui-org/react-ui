import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { idPropTest } from '../../../../../../tests/propTests/idPropTest';
import { Grid } from '../Grid';

/* eslint-disable sort-keys */
const responsiveBreakpoints = {
  xs: '1px',
  sm: '2px',
  md: '3px',
  lg: '4px',
  xl: '5px',
  xxl: '6px',
  xxxl: '7px',
};
/* eslint-enable sort-keys */

const responsiveStyles = (infix) => ({
  [`--rui-local-${infix}-xs`]: '1px',
  [`--rui-local-${infix}-sm`]: '2px',
  [`--rui-local-${infix}-md`]: '3px',
  [`--rui-local-${infix}-lg`]: '4px',
  [`--rui-local-${infix}-xl`]: '5px',
  [`--rui-local-${infix}-xxl`]: '6px',
  [`--rui-local-${infix}-xxxl`]: '7px',
});

const mandatoryProps = {
  children: <div>content</div>, // not mandatory, but without it nothing renders
};

describe('rendering', () => {
  it.each([
    [
      { alignContent: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('align-content')),
    ],
    [
      { alignContent: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-align-content-xs': '10px' }),
    ],
    [
      { alignItems: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('align-items')),
    ],
    [
      { alignItems: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-align-items-xs': '10px' }),
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
      { columnGap: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-column-gap-xs': '10px' }),
    ],
    [
      { columns: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('columns')),
    ],
    [
      { columns: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-columns-xs': '10px' }),
    ],
    ...idPropTest,
    [
      { justifyContent: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('justify-content')),
    ],
    [
      { justifyContent: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-justify-content-xs': '10px' }),
    ],
    [
      { justifyItems: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('justify-items')),
    ],
    [
      { justifyItems: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-justify-items-xs': '10px' }),
    ],
    [
      { rowGap: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('row-gap')),
    ],
    [
      { rowGap: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-row-gap-xs': '10px' }),
    ],
    [
      { rows: responsiveBreakpoints },
      (rootElement) => expect(rootElement).toHaveStyle(responsiveStyles('rows')),
    ],
    [
      { rows: '10px' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-rows-xs': '10px' }),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Grid
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
