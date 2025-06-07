import type {
  PropTest,
  PropTests,
} from '../../../../../tests/playwright/types';
import type { ExtendedWindow } from '../types';
import { colorForms } from './constants';

export const startShadowBackgroundPropTest: PropTests = [
  ...colorForms.map((color) => ({
    name: `startShadowBackground:string=${color}`,
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
      startShadowBackground: color,
    },
  }) as PropTest),
  {
    name: 'startShadowBackground:string=gradient',
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
      startShadowBackground: 'linear-gradient(90deg,rgba(155, 83, 42, 1) 39%, rgba(115, 199, 87, 1) 100%, rgba(83, 93, 237, 1) 100%)',
    },
  },
];
