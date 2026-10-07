import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';
import { linesPropTest } from './_propTests/linesPropTest';
import { wordWrappingPropTest } from './_propTests/wordWrappingPropTest';
import { hyphensPropTest } from './_propTests/hiphensPropTest';

test.describe('Text', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...hyphensPropTest,
      ...linesPropTest,
      ...wordWrappingPropTest,
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
        const component = await mount('Text/TextForTest', props);
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
      const children = 'Test';

      const component = await mount('Text/TextForTest', {
        children,
        id,
      });

      await expect(component.getByText(children)).toHaveAttribute('id', id);
    });

    test('render div when blockLevel is true', async ({ mount }) => {
      const component = await mount('Text/TextForTest', {
        blockLevel: true,
      });

      expect(component.locator('div')).toBeDefined();
    });
  });

  test.describe('functionality', () => {
    test('should render null when no children', async ({ mount }) => {
      const component = await mount('Text/TextForRenderTest', {
        children: null,
      });

      const innerHTML = await component.innerHTML();
      expect(innerHTML).toBe('');
    });
  });
});
