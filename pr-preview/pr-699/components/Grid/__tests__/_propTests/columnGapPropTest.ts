import type { Page } from 'playwright/test';
import { breakpoints } from '../../../../../tests/playwright/constants/breakpoints';
import type { PropTests } from '../../../../../tests/playwright/types';

const columnGapValues = [1, 2, 3, 4, 5, 6, 7];

/* eslint-disable sort-keys */
const breakpointShape = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  x2l: 5,
  x3l: 6,
};

export const columnGapPropTest: PropTests = [
  ...columnGapValues.map((columnGap) => (
    {
      name: `columnGap:number=${columnGap}`,
      props: {
        columns: '1fr 1fr 1fr',
        columnGap,
      },
    }
  )),
  ...Object.entries(breakpoints).map(([breakpointName, breakpointValue]) => (
    {
      name: `columnGap:shape[breakpointShape=${breakpointShape[breakpointName]}] breakpoint=${breakpointName}`,
      onBeforeTest: async (page: Page) => {
        await page.setViewportSize({
          height: 200,
          width: breakpointValue,
        });
      },
      props: {
        columns: '1fr 1fr 1fr',
        columnGap: breakpointShape,
      },
    }
  )),
];
