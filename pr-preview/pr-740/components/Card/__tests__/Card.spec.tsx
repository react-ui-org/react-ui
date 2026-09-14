import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import {
  CadForTest,
  CadWithScrollableForTest,
  CardOnlyWithBodyForTest,
} from './Card.story';
import { densePropTest } from './_propTests/densePropTest';

test.describe('Card', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...densePropTest,
      ...mixPropTests([
        propTests.disabledPropTest,
        propTests.feedbackColorPropTest,
      ]),
      ...propTests.raisedPropTest,
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
          <CadForTest
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

    test.describe('composition', () => {
      /**
       * Card with body and footer is omitted from composition section, because
       * it is included in base visual tests.
       */
      test.describe('onlyBody', () => {
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

            const component = await mount(
              <CardOnlyWithBodyForTest
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

      test.describe('scrollView', () => {
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

            const component = await mount(
              <CadWithScrollableForTest
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
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const id = 'test-id';

      const component = await mount(
        <CadForTest
          id={id}
        />,
      );

      await expect(component.locator(`div[id=${id}]`)).toHaveAttribute('id', id);
    });
  });
});
