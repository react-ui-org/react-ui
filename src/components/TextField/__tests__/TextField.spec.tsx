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
  TextFieldForTest,
  TextFieldForRefTest,
  TextFieldForFormLayoutTests,
} from './TextField.story';
import type { TextFieldForFormLayoutTestsProps } from './TextField.story';
import { inputSizePropTest } from './_propTests/inputSizePropTest';
import { typePropTest } from './_propTests/typePropTest';

test.describe('TextField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.labelPropTest,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.sizePropTest,
        ...propTests.requiredPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...inputSizePropTest,
        ...typePropTest,
        ...mixPropTests([
          propTests.fullWidthPropTest,
          propTests.layoutPropTest,
        ]),
        ...mixPropTests([
          propTests.requiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.renderAsRequiredPropTest,
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
            <TextFieldForTest
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
          <TextFieldForTest
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

      test('inputSize styles applied', async ({ mount }) => {
        const inputSize = 5;

        const component = await mount(
          <TextFieldForTest
            inputSize={inputSize}
          />,
        );

        await expect(component).toHaveCSS('--rui-custom-input-size', `${inputSize}`);
      });

      test.describe('pass type into input', () => {
        [
          'email',
          'number',
          'password',
          'tel',
          'text',
        ].forEach((type) => {
          test(`input type ${type} passed`, async ({ mount }) => {
            const component = await mount(
              <TextFieldForTest
                type={type}
              />,
            );

            await expect(component.locator('input')).toHaveAttribute('type', type);
          });
        });
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <TextFieldForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
            type="email"
          />,
        );

        await expect(component.getByRole('textbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange() when typing into field', async ({ mount }) => {
        let called = false;
        const value = 'testvalue';

        const component = await mount(
          <TextFieldForTest
            onChange={() => {
              called = true;
            }}
          />,
        );

        await component.getByRole('textbox').pressSequentially(value);
        expect(called).toBeTruthy();
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
            <TextFieldForFormLayoutTests
              {...props as unknown as TextFieldForFormLayoutTestsProps}
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
