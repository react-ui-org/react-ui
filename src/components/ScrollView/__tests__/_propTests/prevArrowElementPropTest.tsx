import React from 'react';
import { propTests } from '../../../../../tests/playwright';
import type {
  PropTest,
  PropTests,
} from '../../../../../tests/playwright/types';
import type { ExtendedWindow } from '../types';

export const prevArrowElementPropTest: PropTests = [
  {
    name: 'prevArrowElement:node=customElement',
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
      prevArrowElement: (
        <div
          style={{
            background: 'red',
            padding: '10px',
          }}
        >
          Custom node arrow
        </div>
      ),
    },
  },
  {
    name: 'prevArrowElement:node=string',
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
      prevArrowElement: 'Custom string arrow',
    },
  },
  ...propTests.iconPropTest.map((test) => ({
    name: 'prevArrowElement:node=icon',
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
      prevArrowElement: test.props.icon,
    },
  }) as PropTest),
];
