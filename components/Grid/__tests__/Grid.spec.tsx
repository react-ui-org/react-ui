import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  GridForTest,
  GridWithFixedCardsHeightForTest,
  GridWithGridSpanForTest,
  GridWithoutChildrenForTest,
} from './Grid.story';
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

          const component = await mount(<GridForTest {...props} />);

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

            const component = await mount(<GridWithFixedCardsHeightForTest {...props} />);

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

            const component = await mount(<GridWithGridSpanForTest {...props} />);

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
      test('pass custom id', async ({ mount }) => {
        const id = 'custom-id';

        const component = await mount(
          <div>
            <GridForTest id={id} />
          </div>,
        );

        await expect(component.locator(`div[id=${id}]`)).not.toBeEmpty();
      });
    });

    test.describe('functionality', () => {
      test('have custom tag', async ({ mount }) => {
        const component = await mount(
          <div>
            <GridForTest tag="ul" />
          </div>,
        );

        await expect(component.locator('ul')).not.toBeEmpty();
      });

      test('return null when no children provided', async ({ mount }) => {
        const component = await mount(<GridWithoutChildrenForTest />);

        await expect(component).toBeEmpty();
      });
    });
  });
});
