import type { Page } from 'playwright/test';
import { breakpoints } from '../../../../../tests/playwright/constants/breakpoints';
import type { PropTests } from '../../../../../tests/playwright/types';

const justifyContentValues = [
  'start',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'end',
];

/* eslint-disable sort-keys */
const breakpointShape = {
  sm: 'start',
  md: 'center',
  lg: 'space-between',
  xl: 'space-around',
  x2l: 'space-evenly',
  x3l: 'end',
};

export const justifyContentPropTest: PropTests = [
  ...justifyContentValues.map((justifyContent) => (
    {
      name: `justifyContent:string=${justifyContent}`,
      props: {
        columns: 'repeat(3, 10em)',
        justifyContent,
      },
    }
  )),
  ...Object.entries(breakpoints).map(([breakpointName, breakpointValue]) => (
    {
      name: `justifyContent:shape[breakpointShape=${breakpointShape[breakpointName]}] breakpoint=${breakpointName}`,
      onBeforeTest: async (page: Page) => {
        await page.setViewportSize({
          height: 200,
          width: breakpointValue,
        });
      },
      props: {
        columns: 'repeat(3, 10em)',
        justifyContent: breakpointShape,
      },
    }
  )),
];
