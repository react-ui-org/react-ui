import type { PropTests } from '../../../../../tests/playwright/types';

export const nowrapPropTest: PropTests = [
  {
    name: 'nowrap:boolean=false',
    onBeforeTest: async (page) => {
      await page.setViewportSize({
        height: 100,
        width: 150,
      });
    },
    props: {
      nowrap: false,
    },
  },
  {
    name: 'nowrap:boolean=true',
    onBeforeTest: async (page) => {
      await page.setViewportSize({
        height: 100,
        width: 150,
      });
    },
    props: {
      nowrap: true,
    },
  },
];
