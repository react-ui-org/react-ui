import { test as base } from '@playwright/experimental-ct-react';

/**
 * Playwright component test with pointer moved out of the viewport after each mount.
 *
 * Components are mounted in the top left corner of the viewport where the pointer
 * rests. Chromium then may apply `:hover` to the mounted component (e.g. to a form
 * field whose label is under the pointer), which starts a transition and makes
 * snapshots unstable.
 */
export const test = base.extend({
  mount: async ({
    mount,
    page,
  }, provideMount) => {
    await provideMount((async (...mountArguments: Parameters<typeof mount>) => {
      const mountResult = await mount(...mountArguments);
      await page.mouse.move(-1, -1);

      return mountResult;
    }) as typeof mount);
  },
});

export { expect } from '@playwright/experimental-ct-react';
