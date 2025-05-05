import type { Page } from 'playwright/test';

export const getActualFocusedElementText = (page: Page) => page.evaluate(() => {
  const selector = document.activeElement;
  return selector ? selector.textContent : null;
});
