import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  ModalCloseButtonForRefTest,
  ModalCloseButtonForTest,
} from './ModalCloseButton.story';

test.describe('ModalCloseButton', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.disabledPropTest,
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
          <ModalCloseButtonForTest
            {...props}
          />,
        );

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot({ animations: 'disabled' });
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('ref', async ({ mount }) => {
      const component = await mount(
        <ModalCloseButtonForRefTest
          testRefAttrName="test-ref"
          testRefAttrValue="test-ref-value"
        />,
      );

      await expect(component.getByRole('button')).toHaveAttribute('test-ref', 'test-ref-value');
    });
    test('id', async ({ mount }) => {
      const testId = 'testId';

      const component = await mount(
        <ModalCloseButtonForTest id={testId} />,
      );

      await expect(component.getByRole('button')).toHaveAttribute('id', testId);
    });
  });
});
