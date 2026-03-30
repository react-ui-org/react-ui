import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  FormLayoutForTest,
  FormLayoutWithoutChildrenForTest,
} from './FormLayout.story';
import { labelWidthPropTest } from './_propTests/labelWidthPropTest';
import { fieldLayoutPropTest } from './_propTests/fieldLayoutPropTest';

test.describe('FormLayout', () => {
  test.describe('base', () => {
    /**
     * `autoWidth` is not tested because subgrid is already supported in all browsers
     * we aim to support within RUI. The issue this property was intended to solve has
     * either already been resolved or cannot be reproduced with the tools
     * currently available to us.
    */
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...labelWidthPropTest,
        ...fieldLayoutPropTest,
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

          const component = await mount(<FormLayoutForTest {...props} />);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });

    test.describe('non-visual', () => {
      test('pass id into root component', async ({ mount }) => {
        const id = 'custom-id';

        const component = await mount(
          <FormLayoutForTest id={id} />,
        );

        const root = await component.getAttribute('id');
        expect(root).toBe(id);
      });
    });

    test.describe('functionality', () => {
      test('render null when no children provided', async ({ mount }) => {
        const component = await mount(
          <FormLayoutWithoutChildrenForTest />,
        );

        const innerHTML = await component.innerHTML();
        expect(innerHTML).toBe('');
      });
    });
  });
});
