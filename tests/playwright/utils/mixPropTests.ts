import type { PropTests } from '../types';

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
      mixedPropTests.push({
        name: `${propTestA.name} & ${propTestB.name}`,
        props: {
          ...propTestA.props,
          ...propTestB.props,
        },
      });
    });
  });
  return mixedPropTests;
};

/**
 * Make combinations of all prop tests.
 */
export const mixPropTests = (propTestsArray: PropTests[]) => propTestsArray.reduce(mixTwoPropTests);
