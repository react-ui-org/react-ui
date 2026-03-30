import type { Page } from 'playwright/test';
import { breakpoints } from '../../../../../tests/playwright/constants/breakpoints';
import type { PropTests } from '../../../../../tests/playwright/types';

const justifyItemsValues = [
  'start',
  'end',
  'center',
  'stretch',
];

/* eslint-disable sort-keys */
const breakpointShape = {
  sm: 'start',
  md: 'end',
  lg: 'center',
  xl: 'stretch',
  x2l: 'start',
  x3l: 'end',
};

export const justifyItemsPropTest: PropTests = [
  ...justifyItemsValues.map((justifyItems) => (
    {
      name: `justifyItems:string=${justifyItems}`,
      props: {
        justifyItems,
      },
    }
  )),
  ...Object.entries(breakpoints).map(([breakpointName, breakpointValue]) => ({
    name: `justifyItems:shape[breakpointShape=${breakpointShape[breakpointName]}] breakpoint=${breakpointName}`,
    onBeforeTest: async (page: Page) => {
      await page.setViewportSize({
        height: 200,
        width: breakpointValue,
      });
    },
    props: {
      justifyItems: breakpointShape,
    },
  })),
];
