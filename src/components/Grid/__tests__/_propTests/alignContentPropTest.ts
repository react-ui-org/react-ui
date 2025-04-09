import type { Page } from 'playwright/test';
import { breakpoints } from '../../../../../tests/playwright/constants/breakpoints';
import type { PropTests } from '../../../../../tests/playwright/types';

const alignContentValues = [
  'start',
  'center',
  'space-between',
  'space-around',
  'end',
];

/* eslint-disable sort-keys */
const breakpointShape = {
  sm: 'start',
  md: 'center',
  lg: 'space-between',
  xl: 'space-around',
  x2l: 'end',
};

export const alignContentPropTest: PropTests = [
  ...alignContentValues.map((alignContent) => (
    {
      name: `alignContent:string=${alignContent}`,
      props: {
        alignContent,
        columns: 'repeat(3, 10em)',
        id: 'fixedHeightGrid',
      },
    }
  )),
  ...Object.entries(breakpoints).map(([breakpointName, breakpointValue]) => ({
    name: `alignContent:shape[breakpointShape=${breakpointShape[breakpointName]}] breakpoint=${breakpointName}`,
    onBeforeTest: async (page: Page) => {
      await page.setViewportSize({
        height: 200,
        width: breakpointValue,
      });
    },
    props: {
      alignContent: breakpointShape,
      columns: 'repeat(3, 10em)',
      id: 'fixedHeightGrid',
    },
  })),
];
