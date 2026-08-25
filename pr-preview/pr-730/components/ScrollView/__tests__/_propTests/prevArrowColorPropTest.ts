import type { PropTests } from '../../../../../tests/playwright/types';
import type { ExtendedWindow } from '../types';
import { colorForms } from './constants';

export const prevArrowColorPropTest: PropTests = colorForms.map((color) => ({
  name: `prevArrowColor:string=${color}`,
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
    arrows: true,
    prevArrowColor: color,
  },
}));
