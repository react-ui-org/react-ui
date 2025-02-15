import { breakpoints } from '../constants/breakpoints';

const windowHeight = 100;

const generateLabelVisibilityPropTests = () => {
  const tests = [
    {
      name: 'labelVisibility: none (hidden)',
      props: {
        labelVisibility: 'none',
      },
    },
    {
      name: 'labelVisibility: xs (visible)',
      props: {
        labelVisibility: 'xs',
      },
    },
  ];

  Object.entries(breakpoints).map(([breakpointName, breakpointValue]) => {
    tests.push({
      name: `labelVisibility: ${breakpointName} (visible)`,
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
      name: `labelVisibility: ${breakpointName} (hidden)`,
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
