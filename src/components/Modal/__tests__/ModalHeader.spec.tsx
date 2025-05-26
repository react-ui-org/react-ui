import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { ModalHeaderForTest } from './ModalHeader.story';
import { justifyPropTest } from './_propTests/justifyPropTest';

test.describe('ModalHeader', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...justifyPropTest,
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
          <ModalHeaderForTest
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
    test('id', async ({ mount }) => {
      const testId = 'testId';

      const component = await mount(
        <ModalHeaderForTest id={testId} />,
      );

      expect(component.locator(`div[id="${testId}"]`)).toBeDefined();
    });
  });
});
