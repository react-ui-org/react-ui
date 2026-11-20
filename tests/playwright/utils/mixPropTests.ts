import type {
  PropTest,
  PropTests,
} from '../types';

/**
 * Make combinations of two prop tests.
 */
const mixTwoPropTests = (
  propTestsA: PropTests,
  propTestsB: PropTests,
) => {
  const mixedPropTests: PropTests = [];
  propTestsA.forEach((propTestA) => {
    propTestsB.forEach((propTestB) => {
      const mixedPropTest: PropTest = {
        name: `${propTestA.name} & ${propTestB.name}`,
        props: {
          ...propTestA.props,
          ...propTestB.props,
        },
      };

      if (propTestA.onBeforeSnapshot || propTestB.onBeforeSnapshot) {
        mixedPropTest.onBeforeSnapshot = async (page, component) => {
          if (propTestA.onBeforeSnapshot) {
            await propTestA.onBeforeSnapshot(page, component);
          }
          if (propTestB.onBeforeSnapshot) {
            await propTestB.onBeforeSnapshot(page, component);
          }
        };
      }

      if (propTestA.onBeforeTest || propTestB.onBeforeTest) {
        mixedPropTest.onBeforeTest = async (page) => {
          if (propTestA.onBeforeTest) {
            await propTestA.onBeforeTest(page);
          }
          if (propTestB.onBeforeTest) {
            await propTestB.onBeforeTest(page);
          }
        };
      }

      mixedPropTests.push(mixedPropTest);
    });
  });
  return mixedPropTests;
};

/**
 * Make combinations of all prop tests.
 */
export const mixPropTests = (propTestsArray: PropTests[]) => propTestsArray.reduce(mixTwoPropTests);
