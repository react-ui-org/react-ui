import type { Page } from 'playwright/test';
import { breakpoints } from '../../../../../tests/playwright/constants/breakpoints';
import type {
  PropTest,
  PropTests,
} from '../../../../../tests/playwright/types';

const baseColumnsTest = {
  name: 'columns:string="1fr 1fr 1fr"',
  props: {
    columns: '1fr 1fr 1fr',
  },
};

const repeatColumnsTest = {
  name: 'columns:string=repeat(3, 1fr)',
  props: {
    columns: 'repeat(3, 1fr)',
  },
};

const shapeColumnsTest = {
  name: 'columns:shape[breakpointShape]',
  props: {
    /* eslint-disable sort-keys */
    columns: {
      xs: '1fr',
      md: '1fr 1fr',
      lg: '1fr 1fr 1fr',
      xl: '1fr 1fr 2fr',
      x2l: '1fr 2fr 2fr',
      x3l: '1fr 2fr 3fr',
    },
  },
};

const setViewportSize = async (page: Page, width: number) => {
  await page.setViewportSize({
    height: 200,
    width,
  });
};

const getShapeTest = (breakpointName: string, breakpointValue: number) => ({
  name: `${shapeColumnsTest.name} breakpoint=${breakpointName}`,
  onBeforeTest: async (page: Page) => {
    await setViewportSize(page, breakpointValue);
  },
  props: {
    ...shapeColumnsTest.props,
  },
});

const getColumnTest = (
  breakpointName: string,
  breakpointValue: number,
  test: PropTest,
) => ({
  name: `${test.name} breakpoint=${breakpointName}`,
  onBeforeTest: async (page: Page) => {
    await setViewportSize(page, breakpointValue);
  },
  props: {
    ...test.props,
  },
});

const generateTests = () => {
  const tests: PropTests = [];

  Object.entries(breakpoints).forEach(([breakpointName, breakpointValue]) => {
    tests.push(getColumnTest(breakpointName, breakpointValue, baseColumnsTest));
    tests.push(getColumnTest(breakpointName, breakpointValue, repeatColumnsTest));
    tests.push(getShapeTest(breakpointName, breakpointValue));
  });

  return tests;
};

export const columnPropTest = generateTests();
