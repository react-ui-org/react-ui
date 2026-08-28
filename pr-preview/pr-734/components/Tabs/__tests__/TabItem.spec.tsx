import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  propTests,
  mixPropTests,
} from '../../../../tests/playwright';
import { TabItemForTest } from './TabItem.story';
import { isActivePropTest } from './_propTests/tabItem/isActivePropTest';

test.describe('TabItem', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...mixPropTests([
        propTests.afterLabelPropTest,
        isActivePropTest,
      ]),
      ...mixPropTests([
        propTests.beforeLabelPropTest,
        isActivePropTest,
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
          <TabItemForTest {...props} />,
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
      const label = 'label';

      const component = await mount(
        <TabItemForTest
          id={id}
          label={label}
        />,
      );

      expect(component.locator(`li[id=${id}]`)).toBeDefined();
      await expect(component.getByRole('link')).toHaveAttribute('id', `${id}__link`);
      await expect(component.getByText(label)).toHaveAttribute('id', `${id}__label`);
    });
  });

  test.describe('functionality', () => {
    test('call on click callback', async ({ mount }) => {
      let clicked = false;
      const label = 'label';

      const component = await mount(
        <TabItemForTest
          label={label}
          onClick={() => {
            clicked = true;
          }}
        />,
      );

      const link = component.getByRole('link');
      await link.click({ force: true });
      expect(clicked).toBe(true);
    });

    test('call on click callback when Enter pressed', async ({ mount }) => {
      let clicked = false;
      const label = 'label';

      const component = await mount(
        <TabItemForTest
          label={label}
          onClick={() => {
            clicked = true;
          }}
        />,
      );

      const link = component.getByRole('link');
      await link.focus();
      await link.press('Enter');
      expect(clicked).toBe(true);
    });

    test('calls native redirect when clicked on', async ({ mount }) => {
      const testHref = '/test/custom/uri';

      const component = await mount(
        <TabItemForTest
          href={testHref}
          onClick={() => {}}
        />,
      );

      const link = component.getByRole('link');
      const page = component.page();
      await Promise.all([
        page.waitForURL(testHref),
        link.click({ force: true }),
      ]);

      expect(page.url()).toContain(testHref);
    });
  });
});
