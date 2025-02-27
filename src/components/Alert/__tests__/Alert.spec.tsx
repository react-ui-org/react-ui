import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { AlertForTest } from './Alert.story';

test.describe('Alert', () => {
  test.describe('visual', () => {
    [
      ...propTests.feedbackColorPropTest,
      ...propTests.neutralColorPropTest,
      ...propTests.iconPropTest,
      {
        name: 'onClose',
        props: { onClose: () => {} },
      },
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
          <AlertForTest
            {...props}
          />,
        );

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const component = await mount(
        <AlertForTest
          id="test-id"
        />,
      );

      await expect(component).toHaveAttribute('id', 'test-id');
    });
  });

  test.describe('functionality', () => {
    test('calls onClose when close button clicked', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <AlertForTest
          onClose={() => {
            clicked = true;
          }}
        />,
      );
      const closeButton = component.getByRole('button');
      await closeButton.click();

      expect(clicked).toBeTruthy();
    });

    test('calls onClose when Enter pressed on close button', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <AlertForTest
          onClose={() => {
            clicked = true;
          }}
        />,
      );
      const closeButton = component.getByRole('button');
      await closeButton.press('Enter');

      expect(clicked).toBeTruthy();
    });
  });
});
