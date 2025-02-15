/**
 * @typedef {Object} PropTest
 * @property {string} name - The name of the prop.
 * @property {Object} props - The props of the component.
 *
 * @typedef {PropTest[]} PropTests
 */

/**
 * Make combinations of two prop tests.
 *
 * @param {PropTests} propTestsA
 * @param {PropTests} propTestsB
 * @returns {PropTests}
 */
const mixTwoPropTests = (propTestsA, propTestsB) => {
  const mixedPropTests = [];
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
 *
 * @param {PropTests[]} propTestsArray
 * @returns {PropTests}
 */
export const mixPropTests = (propTestsArray) => propTestsArray.reduce(mixTwoPropTests);
