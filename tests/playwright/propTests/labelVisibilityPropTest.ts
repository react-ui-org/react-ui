import { breakpoints } from '../constants/breakpoints';
import type { PropTests } from '../types';

const windowHeight = 100;

const generateLabelVisibilityPropTests = () => {
  const tests: PropTests = [
    {
      name: 'labelVisibility:string[hidden]=none',
      props: {
        labelVisibility: 'none',
      },
    },
    {
      name: 'labelVisibility:string[visible]=xs',
      props: {
        labelVisibility: 'xs',
      },
    },
  ];

  Object.entries(breakpoints).forEach(([breakpointName, breakpointValue]) => {
    tests.push({
      name: `labelVisibility:string[visible]=${breakpointName}`,
      onBeforeTest: async (page) => {
        await page.setViewportSize({
          height: windowHeight,
          width: breakpointValue,
        });
      },
      props: {
        labelVisibility: breakpointName,
      },
    });
    tests.push({
      name: `labelVisibility:string[hidden]=${breakpointName}`,
      onBeforeTest: async (page) => {
        await page.setViewportSize({
          height: windowHeight,
          width: breakpointValue - 1,
        });
      },
      props: {
        labelVisibility: breakpointName,
      },
    });
  });

  return tests;
};

export const labelVisibilityPropTest = generateLabelVisibilityPropTests();
