import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { ModalTitleForTest } from './ModalTitle.story';
import { contentPropTest } from './_propTests/contentPropTest';

test.describe('ModalTitle', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...contentPropTest,
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

    test('title level', async ({ mount }) => {
      const component = await mount(<ModalTitleForTest level={1} />);

      const title1 = component.getByText('Modal title');
      const nodeName1 = await title1.evaluate((element) => element.nodeName);
      expect(nodeName1).toBe('H1');

      await component.update(<ModalTitleForTest level={2} />);

      const title2 = component.getByText('Modal title');
      const nodeName2 = await title2.evaluate((element) => element.nodeName);
      expect(nodeName2).toBe('H2');
    });
  });
});
