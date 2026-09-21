import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  ToolbarForTest,
  ToolbarWithFlexibleItemForTest,
  ToolbarWithoutChildrenForTest,
} from './Toolbar.story';
import { alignPropTest } from './_propTets/alignPropTest';
import { densePropTest } from './_propTets/densePropTest';
import { justifyPropTest } from './_propTets/justifyPropTest';
import { nowrapPropTest } from './_propTets/nowrapProptest';

test.describe('Toolbar', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...alignPropTest,
        ...densePropTest,
        ...justifyPropTest,
        ...nowrapPropTest,
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
            <ToolbarForTest {...props} />,
          );

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });

      test.describe('flexible', () => {
        test('toolbarItem:shape[flexible]', async ({ mount }) => {
          const component = await mount(
            <ToolbarWithFlexibleItemForTest />,
          );

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });

    test.describe('non-visual', () => {
      test('pass custom id', async ({ mount }) => {
        const id = 'custom-id';
        const component = await mount(
          <ToolbarForTest id={id} />,
        );

        await expect(component).toHaveAttribute('id', id);
      });
    });

    test.describe('functionality', () => {
      test('return null when no children provided', async ({ mount }) => {
        const component = await mount(<ToolbarWithoutChildrenForTest />);

        await expect(component).toBeEmpty();
      });
    });
  });
});
