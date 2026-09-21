import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import { PaperForTest } from './Paper.story';
import { mutedPropTest } from './_propTests/mutedPropTest';

test.describe('Paper', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...mixPropTests([
        mutedPropTest,
        propTests.raisedPropTest,
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
          <PaperForTest
            {...props}
          />,
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
        <PaperForTest
          id={id}
        />,
      );

      await expect(component.locator(`div[id=${id}]`)).toHaveAttribute('id', id);
    });
  });
});
