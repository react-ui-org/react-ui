import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import {
  ScrollViewForDetectEndAutoscrollTest,
  ScrollViewForRefTest,
  ScrollViewForTest,
} from './ScrollView.story';
import { directionPropTest } from './_propTests/directionPropTest';
import { nextArrowColorPropTest } from './_propTests/nextArrowColorPropTest';
import { nextArrowElementPropTest } from './_propTests/nextArrowElementPropTest';
import { prevArrowColorPropTest } from './_propTests/prevArrowColorPropTest';
import { prevArrowElementPropTest } from './_propTests/prevArrowElementPropTest';
import { endShadowSizePropTest } from './_propTests/endShadowSizePropTest';
import { startShadowSizePropTest } from './_propTests/startShadowSizePropTest';
import { mixArrowsDirectionPropTest } from './_propTests/mixes/mixArrowsDirectionPropTest';
import { mixEndShadowBackgroundDirectionPropTest } from './_propTests/mixes/mixEndShadowBackgroundDirectionPropTest';
import { mixStartShadowBackgroundDirectionPropTest } from './_propTests/mixes/mixStartShadowBackgroundDirectionPropTest';
import { shadowsPropTest } from './_propTests/shadowsPropTest';
import type { ExtendedWindow } from './types';

test.describe('ScrollView', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...mixArrowsDirectionPropTest,
      ...mixEndShadowBackgroundDirectionPropTest,
      ...mixPropTests([
        endShadowSizePropTest,
        directionPropTest,
      ]),
      ...nextArrowColorPropTest,
      ...nextArrowElementPropTest,
      ...prevArrowColorPropTest,
      ...prevArrowElementPropTest,
      ...shadowsPropTest,
      ...mixStartShadowBackgroundDirectionPropTest,
      ...mixPropTests([
        startShadowSizePropTest,
        directionPropTest,
      ]),
    ].forEach(({
      name,
      onBeforeTest,
      onBeforeSnapshot,
      props,
    }) => {
      test(name, async ({
        mount,
        page,
      }) => {
        if (onBeforeTest) {
          await onBeforeTest(page);
        }

        const component = await mount(
          <ScrollViewForTest
            {...props}
          />,
        );

        /**
         * Because onBeforeSnapshot is not propagated through mixPropTests
         */
        if (
          props?.startShadowBackground !== undefined
          || props?.startShadowSize !== undefined
        ) {
          await page.evaluate((id) => {
            (window as ExtendedWindow).scrollEnd = false;
            const parent = document.getElementById(id);
            parent.children[0].addEventListener('scrollend', () => {
              (window as ExtendedWindow).scrollEnd = true;
            }, { once: true });
          }, 'scrollbar');

          if (props?.direction === 'horizontal') {
            await page.evaluate((id) => {
              const parent = document.getElementById(id);
              parent.children[0].scrollLeft += 124;
            }, 'scrollbar');
          } else {
            await page.evaluate((id) => {
              const parent = document.getElementById(id);
              parent.children[0].scrollTop += 124;
            }, 'scrollbar');
          }

          await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);
        }

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot({ animations: 'disabled' });
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const id = 'testId';

      const component = await mount(
        <ScrollViewForTest
          arrows
          id={id}
        />,
      );

      expect(component.locator(`div[id="${id}"]`)).toBeDefined();
      expect(component.locator(`div[id="${id}__content"]`)).toBeDefined();
      expect(component.locator(`div[id="${id}__arrowPrevButton"]`)).toBeDefined();
      expect(component.locator(`div[id="${id}__arrowNextButton"]`)).toBeDefined();
    });

    test('ref', async ({ mount }) => {
      const id = 'testId';

      const component = await mount(
        <ScrollViewForRefTest
          id={id}
          testRefAttrName="test-ref"
          testRefAttrValue="test-ref-value"
        />,
      );

      const refValue = await component.evaluate((_, idArg) => document.getElementById(idArg).firstElementChild.getAttribute('test-ref'), id);

      expect(refValue).toBe('test-ref-value');
    });
  });

  test.describe('functionality', () => {
    test('scroll by arrowScrollStep when click on arrow', async ({
      mount,
      page,
    }) => {
      const id = 'testId';

      const component = await mount(
        <ScrollViewForTest
          arrows
          arrowsScrollStep={600}
          id={id}
        />,
      );

      const arrow = component.locator(`button[id="${id}__arrowNextButton"]`);
      await page.evaluate((idArg) => {
        const parent = document.getElementById(idArg);
        parent.children[0].setAttribute('style', 'scroll-behavior: unset;');
      }, id);
      const scroll = component.locator(`div[id="${id}"] > div:first-child`);
      await arrow.click();

      const atrValue = await scroll.evaluate((element) => element.scrollTop);

      expect(atrValue).toBe(600);
    });

    test('scroll at end when content change and autoScroll is "always"', async ({
      mount,
      page,
    }) => {
      const id = 'testId';

      const component = await mount(
        <ScrollViewForTest
          autoScroll="always"
          id={id}
        />,
      );

      await page.evaluate((idArg) => {
        (window as ExtendedWindow).scrollEnd = false;
        const parent = document.getElementById(idArg);
        parent.children[0].setAttribute('style', 'scroll-behavior: unset;');
      }, id);

      await page.evaluate((idArg) => {
        const parent = document.getElementById(idArg);
        parent.children[0].addEventListener('scrollend', () => {
          (window as ExtendedWindow).scrollEnd = true;
        });
        parent.children[0].textContent += 'content fragment content fragment content fragment';
      }, id);

      await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);

      const scroll = component.locator(`div[id="${id}"] > div:first-child`);
      const atrValue = await scroll.evaluate((element) => element.scrollTop);

      expect(atrValue).not.toBe(0);
    });

    test('scroll at end when scrolled down and content change and autoScroll is "detectEnd"', async ({
      mount,
      page,
    }) => {
      const id = 'testId';
      let initialScrollTop = 0;

      await page.exposeFunction('onScrollEnd', (value: number) => {
        initialScrollTop = value;
      });

      const component = await mount(
        <ScrollViewForDetectEndAutoscrollTest
          id={id}
        />,
      );

      /**
       * First need to wait for initial scroll down.
       */
      await page.evaluate((idArg) => {
        (window as ExtendedWindow).scrollEnd = false;

        const parent = document.getElementById(idArg);
        parent.children[0].addEventListener('scrollend', () => {
          (window as ExtendedWindow).scrollEnd = true;
          (window as ExtendedWindow)?.onScrollEnd(parent.children[0].scrollTop);
        }, { once: true });
      }, id);

      await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);

      /**
       * Add scroll detect setup.
       */
      await page.evaluate((idArg) => {
        (window as ExtendedWindow).scrollEnd = false;
        const parent = document.getElementById(idArg);
        parent.children[0].addEventListener('scrollend', () => {
          (window as ExtendedWindow).scrollEnd = true;
        });
      }, id);

      const button = component.getByRole('button');
      await button.click();

      /**
       * Wait for scroll down.
      */
      await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);

      const scrollTopAfter = await page.evaluate((idArg) => {
        const parent = document.getElementById(idArg);
        return parent.children[0].scrollTop;
      }, id);

      expect(scrollTopAfter).toBeGreaterThan(initialScrollTop);
    });

    test('do not display top arrow after scroll before debounce expires', async ({
      mount,
      page,
    }) => {
      const id = 'testId';
      const debounceTimeout = 2000;

      const component = await mount(
        <ScrollViewForTest
          arrows
          debounce={debounceTimeout}
          id={id}
        />,
      );

      /**
       * Setup scroll down listener.
       */
      await page.evaluate((idArg) => {
        (window as ExtendedWindow).scrollEnd = false;
        const parent = document.getElementById(idArg);
        parent.children[0].addEventListener('scrollend', () => {
          (window as ExtendedWindow).scrollEnd = true;
        }, { once: true });
      }, id);

      /**
       * Scroll down
       */
      await page.evaluate((idArg) => {
        const parent = document.getElementById(idArg);
        parent.children[0].scrollTop += 200;
      }, id);
      await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);

      const bottomArrowAfter = component.locator(`button[id="${id}__arrowPrevButton"]`);
      await expect(bottomArrowAfter).not.toBeVisible();
    });

    test('do not display bottom arrow after scroll when debounce expires', async ({
      mount,
      page,
    }) => {
      const id = 'testId';
      const debounceTimeout = 5000;

      const component = await mount(
        <ScrollViewForTest
          arrows
          debounce={debounceTimeout}
          id={id}
        />,
      );

      /**
       * Setup scroll down listener.
       */
      await page.evaluate((idArg) => {
        (window as ExtendedWindow).scrollEnd = false;
        const parent = document.getElementById(idArg);
        parent.children[0].addEventListener('scrollend', () => {
          (window as ExtendedWindow).scrollEnd = true;
        }, { once: true });
      }, id);

      /**
       * Scroll down
       */
      await page.evaluate((idArg) => {
        const parent = document.getElementById(idArg);
        parent.children[0].scrollTop = parent.children[0].children[0].clientHeight;
      }, id);
      await page.waitForFunction(() => (window as ExtendedWindow).scrollEnd === true);

      const bottomArrowBefore = component.locator(`button[id="${id}__arrowNextButton"]`);
      await expect(bottomArrowBefore).toBeVisible();

      /**
       * Wait on debounce timeout to expire.
       */
      await page.waitForTimeout(1.5 * debounceTimeout);

      const bottomArrowAfter = component.locator(`button[id="${id}__arrowNextButton"]`);
      await expect(bottomArrowAfter).not.toBeVisible();
    });
  });
});
