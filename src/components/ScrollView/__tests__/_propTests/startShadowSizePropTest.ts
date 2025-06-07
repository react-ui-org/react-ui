import type { PropTests } from '../../../../../tests/playwright/types';
import type { ExtendedWindow } from '../types';
import { lengthValueForms } from './constants';

export const startShadowSizePropTest: PropTests = lengthValueForms.map((length) => ({
  name: `startShadowSize:string=${length}`,
  onBeforeSnapshot: async (page) => {
    await page.evaluate((id) => {
      (window as ExtendedWindow).scrollEnd = false;
      const parent = document.getElementById(id);
      parent.children[0].addEventListener('scrollend', () => {
        (window as ExtendedWindow).scrollEnd = true;
      }, { once: true });
    }, 'scrollbar');

    await page.evaluate((id) => {
      const parent = document.getElementById(id);
      parent.children[0].scrollTop += 124;
    }, 'scrollbar');

    await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);
  },
  props: {
    startShadowBackground: 'red',
    startShadowSize: length,
  },
}));
