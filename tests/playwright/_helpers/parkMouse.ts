import type { Page } from '@playwright/test';

/**
 * Move the mouse pointer outside the viewport.
 *
 * Components are mounted in the top left corner of the viewport where the pointer rests (`0, 0` on a fresh page).
 * Chromium dispatches a hover at the pointer position whenever an element is scrolled into view, e.g. by
 * `locator.screenshot()`, so the component would get into the `:hover` state, which may start a transition and make
 * snapshots unstable.
 */
export const parkMouse = async (page: Page) => {
  await page.mouse.move(-1, -1);
};
