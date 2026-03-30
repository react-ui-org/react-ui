import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  TextForRenderTest,
  TextForTest,
} from './Text.story';
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
        const component = await mount(
          <TextForTest {...props} />,
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
      const children = 'Test';

      const component = await mount(
        <TextForTest
          id={id}
        >
          {children}
        </TextForTest>,
      );

      await expect(component.getByText(children)).toHaveAttribute('id', id);
    });

    test('render div when blockLevel is true', async ({ mount }) => {
      const component = await mount(
        <TextForTest blockLevel />,
      );

      expect(component.locator('div')).toBeDefined();
    });
  });

  test.describe('functionality', () => {
    test('should render null when no children', async ({ mount }) => {
      const component = await mount(
        <TextForRenderTest>
          {null}
        </TextForRenderTest>,
      );

      const innerHTML = await component.innerHTML();
      expect(innerHTML).toBe('');
    });
  });
});
