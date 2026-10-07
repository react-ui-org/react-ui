import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';
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

          const component = await mount('Toolbar/ToolbarForTest', props);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });

      test.describe('flexible', () => {
        test('toolbarItem:shape[flexible]', async ({ mount }) => {
          const component = await mount('Toolbar/ToolbarWithFlexibleItemForTest');

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });

    test.describe('non-visual', () => {
      test('pass custom id', async ({ mount }) => {
        const id = 'custom-id';
        const component = await mount('Toolbar/ToolbarForTest', {
          id,
        });

        await expect(component).toHaveAttribute('id', id);
      });
    });

    test.describe('functionality', () => {
      test('return null when no children provided', async ({ mount }) => {
        const component = await mount('Toolbar/ToolbarWithoutChildrenForTest');

        await expect(component).toBeEmpty();
      });
    });
  });
});
