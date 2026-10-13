import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';
import { columnPropTest } from './_propTests/columnsPropTest';
import { rowsPropTest } from './_propTests/rowsPropTest';
import { justifyItemsPropTest } from './_propTests/justifyItemsPropTest';
import { justifyContentPropTest } from './_propTests/justifyContentPropTest';
import { alignContentPropTest } from './_propTests/alignContentPropTest';
import { columnGapPropTest } from './_propTests/columnGapPropTest';
import { rowGapPropTest } from './_propTests/rowGapPropTest';
import { autoFlowPropTest } from './_propTests/autoFlowPropTest';

test.describe('Grid', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...autoFlowPropTest,
        ...columnPropTest,
        ...columnGapPropTest,
        ...justifyContentPropTest,
        ...justifyItemsPropTest,
        ...rowGapPropTest,
        ...rowsPropTest,
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

          const component = await mount('Grid/GridForTest', props);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });

      test.describe('fixedCardHeight', () => {
        [
          ...alignContentPropTest,
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

            const component = await mount('Grid/GridWithFixedCardsHeightForTest', props);

            if (onBeforeSnapshot) {
              await onBeforeSnapshot(page, component);
            }

            const screenshot = await component.screenshot();
            expect(screenshot).toMatchSnapshot();
          });
        });
      });

      test.describe('withGridSpan', () => {
        [
          ...propTests.defaultComponentPropTest,
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

            const component = await mount('Grid/GridWithGridSpanForTest', props);

            if (onBeforeSnapshot) {
              await onBeforeSnapshot(page, component);
            }

            const screenshot = await component.screenshot();
            expect(screenshot).toMatchSnapshot();
          });
        });
      });
    });

    test.describe('non-visual', () => {
      test('pass custom id', async ({
        mount,
        page,
      }) => {
        const id = 'custom-id';

        await mount('Grid/GridForTest', {
          id,
        });

        await expect(page.locator(`div[id=${id}]`)).not.toBeEmpty();
      });
    });

    test.describe('functionality', () => {
      test('have custom tag', async ({
        mount,
        page,
      }) => {
        await mount('Grid/GridForTest', {
          tag: 'ul',
        });

        await expect(page.locator('ul')).not.toBeEmpty();
      });

      test('return null when no children provided', async ({ mount }) => {
        const component = await mount('Grid/GridWithoutChildrenForTest');

        await expect(component).toBeEmpty();
      });
    });
  });
});
