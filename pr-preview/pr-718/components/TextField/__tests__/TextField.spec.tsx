import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
import { inputSizePropTest } from './_propTests/inputSizePropTest';
import { typePropTest } from './_propTests/typePropTest';

test.describe('TextField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
          propTests.variantPropTest,
        ]),
        ...mixPropTests([
          propTests.fullWidthPropTest,
          propTests.layoutPropTest,
        ]),
        ...propTests.helpTextAndValidationTextPropType,
        ...inputSizePropTest,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.requiredPropTest,
        ...mixPropTests([
          propTests.renderAsRequiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.requiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...propTests.sizePropTest,
        ...typePropTest,
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

          const component = await mount('TextField/TextFieldForTest', props);

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

        const component = await mount('TextField/TextFieldForTest', {
          helpText: testHelpText,
          id: testId,
          label: testLabel,
          validationText: testValidationText,
        });

        await expect(component).toHaveAttribute('id', `${testId}__label`);
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component.getByText(testHelpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(testValidationText)).toHaveAttribute('id', `${testId}__validationText`);
        await expect(component.getByRole('textbox')).toHaveAttribute('id', testId);
      });

      test('inputSize styles applied', async ({ mount }) => {
        const inputSize = 5;

        const component = await mount('TextField/TextFieldForTest', {
          inputSize,
        });

        await expect(component).toHaveCSS('--rui-custom-input-size', `${inputSize}`);
      });

      test.describe('pass type into input', () => {
        ([
          'email',
          'number',
          'password',
          'tel',
          'text',
        ] as const).forEach((type) => {
          test(`input type ${type} passed`, async ({ mount }) => {
            const component = await mount('TextField/TextFieldForTest', {
              type,
            });

            await expect(component.locator('input')).toHaveAttribute('type', type);
          });
        });
      });

      test('ref', async ({ mount }) => {
        const component = await mount('TextField/TextFieldForRefTest', {
          testRefAttrName: 'test-ref',
          testRefAttrValue: 'test-ref-value',
          type: 'email',
        });

        await expect(component.getByRole('textbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange() when typing into field', async ({ mount }) => {
        const value = 'testvalue';

        const component = await mount('TextField/TextFieldSpyForTest');

        await component.getByRole('textbox').pressSequentially(value);
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('labelWidth:string=100px', async ({ mount }) => {
        const component = await mount('TextField/TextFieldForFormLayoutLabelWidthTests');

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });

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

          const component = await mount('TextField/TextFieldForFormLayoutTests', props);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });
  });

  test.describe('formLayoutCustomField', () => {
    test.describe('visual', () => {
      test('label:hidden', async ({ mount }) => {
        const component = await mount('TextField/TextFieldForFormLayoutCustomFieldTests');

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });
});
