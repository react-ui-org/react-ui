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
  SelectFieldForTest,
  SelectFieldForRefTest,
  SelectFieldForFormLayoutTests,
} from './SelectField.story';
import type { SelectFieldForFormLayoutTestsProps } from './SelectField.story';
import { openSelectFieldOptionsTest } from './_propTests/openSelectFieldOptionsTest';

const groupedOptions = [
  {
    key: 'optgroup_key',
    label: 'optgroup',
    options: [
      {
        disabled: false,
        label: 'option1',
        value: 'value1',
      },
      {
        disabled: true,
        label: 'option2',
        value: 'value2',
      },
    ],
  },
];

const baseOptions = [
  {
    disabled: false,
    key: 'key1',
    label: 'option1',
    value: 'value1',
  },
  {
    disabled: false,
    label: 'option2',
    value: 'value2',
  },
];

test.describe('SelectField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.renderAsRequiredPropTest,
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
            <SelectFieldForTest
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

      /**
       * Full page screenshot is required for option tests
       * because native select options are rendered outside of the DOM.
       */
      test.describe('fullPage', () => {
        [
          ...openSelectFieldOptionsTest,
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
              <SelectFieldForTest
                {...props}
              />,
            );

            if (onBeforeSnapshot) {
              await onBeforeSnapshot(page, component);
            }

            const screenshot = await page.screenshot({ animations: 'disabled' });
            expect(screenshot).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
          });
        });
      });
    });

    test.describe('non-visual', () => {
      test('Have partially disabled group options', async ({ mount }) => {
        const component = await mount(
          <SelectFieldForTest
            options={groupedOptions}
          />,
        );

        await expect(component.getByRole('combobox').getByText(groupedOptions[0].options[0].label)).not.toHaveAttribute('disabled', '');
        await expect(component.getByRole('combobox').getByText(groupedOptions[0].options[1].label)).toHaveAttribute('disabled', '');
      });

      test('Have partially disabled base options', async ({ mount }) => {
        const partiallyDisabledBaseOptions = [
          ...baseOptions,
          {
            disabled: true,
            key: 'key3',
            label: 'option3',
            value: 'value3',
          },
        ];
        const component = await mount(
          <SelectFieldForTest
            options={partiallyDisabledBaseOptions}
          />,
        );

        await expect(component.getByRole('combobox').getByText(partiallyDisabledBaseOptions[0].label)).not.toHaveAttribute('disabled', '');
        await expect(component.getByRole('combobox').getByText(partiallyDisabledBaseOptions[1].label)).not.toHaveAttribute('disabled', '');
        await expect(component.getByRole('combobox').getByText(partiallyDisabledBaseOptions[2].label)).toHaveAttribute('disabled', '');
      });

      test('id', async ({ mount }) => {
        const testId = 'testId';
        const testLabel = 'testLabel';
        const testHelpText = 'testHelpText';
        const testValidationText = 'testValidationText';

        const component = await mount(
          <SelectFieldForTest
            helpText={testHelpText}
            id={testId}
            label={testLabel}
            options={baseOptions}
            validationText={testValidationText}
          />,
        );

        await expect(component.getByRole('combobox')).toHaveAttribute('id', testId);
        await expect(component.getByRole('option').first()).toHaveAttribute('id', `${testId}__item__${baseOptions[0].key}`);
        await expect(component.getByRole('option').last()).toHaveAttribute('id', `${testId}__item__${baseOptions[1].value}`);
        await expect(component.getByText(testHelpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(testValidationText)).toHaveAttribute('id', `${testId}__validationText`);
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component).toHaveAttribute('id', `${testId}__label`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <SelectFieldForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
          />,
        );

        await expect(component.getByRole('combobox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange() on changing selected option', async ({ mount }) => {
        let changeCalled = false;

        const component = await mount(
          <SelectFieldForTest
            onChange={() => { changeCalled = true; }}
            options={baseOptions}
            value={baseOptions[0].value}
          />,
        );

        await component.getByRole('combobox').selectOption(baseOptions[1].value);
        expect(changeCalled).toBeTruthy();
      });

      test('change options on down key press', async ({ mount }) => {
        let changeCalled = false;

        const component = await mount(
          <SelectFieldForTest
            onChange={() => { changeCalled = true; }}
            options={baseOptions}
            value={baseOptions[0].value}
          />,
        );

        const select = component.getByRole('combobox');
        await select.focus();
        await select.press('ArrowDown');
        expect(changeCalled).toBeTruthy();
      });
      test('change options on up key press', async ({ mount }) => {
        let changeCalled = false;

        const component = await mount(
          <SelectFieldForTest
            onChange={() => { changeCalled = true; }}
            options={baseOptions}
            value={baseOptions[1].value}
          />,
        );

        const select = component.getByRole('combobox');
        await select.focus();
        await select.press('ArrowUp');
        expect(changeCalled).toBeTruthy();
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
            <SelectFieldForFormLayoutTests
              {...props as unknown as SelectFieldForFormLayoutTestsProps}
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
