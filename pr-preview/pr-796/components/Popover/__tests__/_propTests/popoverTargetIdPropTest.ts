import type { PropTests } from '../../../../../tests/playwright/types';

export const popoverTargetIdPropTest: PropTests = [
  {
    name: 'popoverTargetId:shape=closed',
    props: {
      popoverTargetId: 'target-id',
    },
  },
  {
    name: 'opoverTargetId:shape=open',
    onBeforeSnapshot: async (page, component) => {
      const button = component.getByRole('button');
      await button.click({ force: true });
      await page.waitForTimeout(500);
    },
    props: {
      popoverTargetId: 'target-id',
    },
  },
];
