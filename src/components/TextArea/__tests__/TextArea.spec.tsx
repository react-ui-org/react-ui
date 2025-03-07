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
  TextAreaForTest,
  TextAreaForRefTest,
  TextAreaForFormLayoutTests,
} from './TextArea.story';
import type { TextAreaForFormLayoutTestsProps } from './TextArea.story';

test.describe('TextArea', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.requiredPropTest,
        ...propTests.sizePropTest,
        ...mixPropTests([
          propTests.fullWidthPropTest,
          propTests.layoutPropTest,
        ]),
        ...mixPropTests([
          propTests.requiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
          propTests.variantPropTest,
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
            <TextAreaForTest
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
        const testHelpText = 'testHelpText';
        const testValidationText = 'testValidationText';

        const component = await mount(
          <TextAreaForTest
            helpText={testHelpText}
            id={testId}
            label={testLabel}
            validationText={testValidationText}
          />,
        );

        await expect(component).toHaveAttribute('id', `${testId}__label`);
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component.getByText(testHelpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(testValidationText)).toHaveAttribute('id', `${testId}__validationText`);
        await expect(component.getByRole('textbox')).toHaveAttribute('id', testId);
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <TextAreaForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
          />,
        );

        await expect(component.getByRole('textbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange() on typing', async ({ mount }) => {
        let clickedCount = 0;
        const value = 'testValue';

        const component = await mount(
          <TextAreaForTest
            onChange={() => {
              clickedCount += 1;
            }}
            value={value}
          />,
        );

        await component.getByRole('textbox').pressSequentially(value);
        expect(clickedCount).toBe(value.length);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      [
        ...propTests.layoutPropTest,
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
            <TextAreaForFormLayoutTests
              {...props as unknown as TextAreaForFormLayoutTestsProps}
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
  });
});
