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
  ButtonForTest,
  ButtonForRefTest,
} from './Button.story';

test.describe('Button', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.afterLabelPropTest,
      ...propTests.beforeLabelPropTest,
      ...propTests.blockPropTest,
      ...propTests.endCornerPropTest,
      ...propTests.feedbackIconPropTest,
      ...propTests.labelPropTest,
      ...propTests.labelVisibilityPropTest,
      ...propTests.sizePropTest,
      ...propTests.startCornerPropTest,
      ...mixPropTests([
        [
          ...propTests.actionColorPropTest,
          ...propTests.feedbackColorPropTest,
          ...propTests.neutralColorPropTest,
        ],
        propTests.disabledPropTest,
        propTests.priorityPropTest,
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
          <ButtonForTest
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
      const testId = 'testId';
      const testLabel = 'testLabel';

      const component = await mount(
        <ButtonForTest
          id={testId}
          label={testLabel}
        />,
      );

      await expect(component).toHaveAttribute('id', testId);
      await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
    });

    test('ref', async ({ mount }) => {
      const component = await mount(
        <ButtonForRefTest
          testRefAttrName="test-ref"
          testRefAttrValue="test-ref-value"
        />,
      );

      await expect(component).toHaveAttribute('test-ref', 'test-ref-value');
    });
  });

  test.describe('functionality', () => {
    test('calls onClick when clicked', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <ButtonForTest
          onClick={() => {
            clicked = true;
          }}
        />,
      );
      await component.click();

      expect(clicked).toBeTruthy();
    });

    test('calls onClick when Enter pressed', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <ButtonForTest
          onClick={() => {
            clicked = true;
          }}
        />,
      );
      await component.press('Enter');

      expect(clicked).toBeTruthy();
    });

    test('is disabled when disabled is set', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <ButtonForTest
          disabled
          onClick={() => {
            clicked = true;
          }}
        />,
      );
      await component.click({ force: true });

      await expect(component).toBeDisabled();
      expect(clicked).toBeFalsy();
    });

    test('is disabled when feedbackIcon is set', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <ButtonForTest
          feedbackIcon={<span>Placeholder</span>}
          onClick={() => {
            clicked = true;
          }}
        />,
      );
      await component.click({ force: true });

      await expect(component).toBeDisabled();
      expect(clicked).toBeFalsy();
    });
  });
});
