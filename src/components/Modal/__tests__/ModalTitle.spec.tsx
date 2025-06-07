import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { ModalTitleForTest } from './ModalTitle.story';
import { levelPropTest } from './_propTests/ModalTitle/levelPropTest';
import { contentPropTest } from './_propTests/contentPropTest';

test.describe('ModalTitle', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...contentPropTest,
      ...levelPropTest,
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
          <ModalTitleForTest
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
        <ModalTitleForTest id={testId} />,
      );

      expect(component.locator(`div[id="${testId}"]`)).toBeDefined();
    });
  });
});
