import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { TextLinkForTest } from './TextLink.story';

test.describe('TextLink', () => {
  test.describe('visual', () => {
    [
      ...propTests.labelPropTest,
    ].forEach(({
      name,
      onBeforeTest,
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
          <TextLinkForTest
            {...props}
          />,
        );

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('href', async ({ mount }) => {
      const component = await mount(
        <TextLinkForTest />,
      );

      await expect(component).toHaveAttribute('href', '/test/uri');
    });
  });

  test.describe('functionality', () => {
    test('calls native redirect when clicked on', async ({ mount }) => {
      const testHref = '/test/uri';

      const component = await mount(<TextLinkForTest />);
      const page = component.page();

      await Promise.all([
        page.waitForURL(testHref),
        component.click(),
      ]);

      expect(page.url()).toContain(testHref);
    });

    test('calls native redirect when enter pressed', async ({ mount }) => {
      const testHref = '/test/uri';

      const component = await mount(<TextLinkForTest />);
      const page = component.page();

      await Promise.all([
        page.waitForURL(testHref),
        component.press('Enter'),
      ]);

      expect(page.url()).toContain(testHref);
    });

    test('calls onClick when clicked', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <TextLinkForTest
          onClick={() => {
            clicked = true;
          }}
        />,
      );
      await component.click();

      expect(clicked).toBeTruthy();
    });

    test('calls onClick when Enter pressed', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <TextLinkForTest
          onClick={() => {
            clicked = true;
          }}
        />,
      );

      await component.press('Enter');
      expect(clicked).toBeTruthy();
    });
  });
});
