/* eslint-disable sort-keys */

// Keep this file in sync with value in `src/styles/settings/_breakpoints.scss`.
// Recalculation between px and em is done using the following formula:
// em = px / font-size

export const breakpoints = {
  // This value is skipped as its value is zero and might cause issues with the comparison.
  // Tests for xs breakpoint should be covered separately unless its value is higher than 0.
  // xs: 0,
  sm: 576,
  md: 768,
  lg: 1056,
  xl: 1344,
  x2l: 1600,
  x3l: 1920,
};
