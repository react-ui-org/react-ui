import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  getActualFocusedElementText,
  propTests,
} from '../../../../tests/playwright';
import { TabsForTest } from './Tabs.story';

test.describe('Tabs', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
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
          <TabsForTest {...props} />,
        );
        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const id = 'test-id';

      const component = await mount(
        <TabsForTest
          id={id}
        />,
      );

      expect(component.locator(`nav[id=${id}]`)).toBeDefined();
      await expect(component.getByRole('list')).toHaveAttribute('id', `${id}__list`);
    });
  });

  test.describe('functionality', () => {
    test('has correct tab focus order', async ({
      mount,
      page,
    }) => {
      await mount(
        <TabsForTest />,
      );

      await page.keyboard.press('Tab');
      const label1 = await getActualFocusedElementText(page);
      expect(label1).toBe('Tab1');

      await page.keyboard.press('Tab');
      const label2 = await getActualFocusedElementText(page);
      expect(label2).toBe('Tab2');

      await page.keyboard.press('Tab');
      const label3 = await getActualFocusedElementText(page);
      expect(label3).toBe('Tab3');

      await page.keyboard.press('Shift+Tab');
      const label4 = await getActualFocusedElementText(page);
      expect(label4).toBe('Tab2');

      await page.keyboard.press('Shift+Tab');
      const label5 = await getActualFocusedElementText(page);
      expect(label5).toBe('Tab1');
    });
  });
});
