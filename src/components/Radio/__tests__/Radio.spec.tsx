import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import { partialDisabledOptionsPropTest } from './_propTests/partialDisabledOptionsPropTest';
import { RadioForTest } from './Radio.story';

const options = [
  {
    disabled: false,
    key: 'customKey1',
    label: 'customLabel1',
    value: 'customValue1',
  },
  {
    disabled: false,
    key: 'customKey2',
    label: 'customLabel2',
    value: 'customValue2',
  },
  {
    disabled: false,
    label: 'customLabel3',
    value: 'customValue3',
  },
];

test.describe('CheckboxField', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.requiredPropTest,
      ...propTests.labelPropTest,
      ...propTests.isLabelVisiblePropTest,
      ...propTests.renderAsRequiredPropTest,
      ...propTests.layoutPropTest,
      ...mixPropTests([
        propTests.validationStatePropTest,
        propTests.validationTextPropTest,
        propTests.disabledPropTest,
      ]),
      ...mixPropTests([
        propTests.validationStatePropTest,
        propTests.helpTextPropTest,
      ]),
      ...mixPropTests([
        partialDisabledOptionsPropTest,
        propTests.validationStatePropTest,
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
          <RadioForTest
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
      const radioId = 'radioId';
      const label = 'radioLabel';

      const component = await mount(
        <RadioForTest
          id={radioId}
          label={label}
          options={options}
        />,
      );

      await expect(component).toHaveAttribute('id', radioId);
      await expect(component.getByText(label).first()).toHaveAttribute('id', `${radioId}__label`);
      await expect(component.getByText(label).last()).toHaveAttribute('id', `${radioId}__displayLabel`);
      await expect(component.getByText(options[0].label)).toHaveAttribute('id', `${radioId}__item__${options[0].key}__labelText`);
      await expect(component.getByText(options[1].label)).toHaveAttribute('id', `${radioId}__item__${options[1].key}__labelText`);
      await expect(component.getByText(options[2].label)).toHaveAttribute('id', `${radioId}__item__${options[2].value}__labelText`);
      await expect(component.locator(`input[id=${radioId}__item__${options[0].key}]`)).not.toBeEmpty();
      await expect(component.locator(`input[id=${radioId}__item__${options[1].key}]`)).not.toBeEmpty();
      await expect(component.locator(`input[id=${radioId}__item__${options[2].value}]`)).not.toBeEmpty();
      await expect(component.locator(`label[id=${radioId}__item__${options[0].key}__label]`)).not.toBeEmpty();
      await expect(component.locator(`label[id=${radioId}__item__${options[1].key}__label]`)).not.toBeEmpty();
      await expect(component.locator(`label[id=${radioId}__item__${options[2].value}__label]`)).not.toBeEmpty();
    });
  });

  test.describe('functionality', () => {
    test('calls synthetic event onChange()', async ({ mount }) => {
      let changeCalled = false;

      const component = await mount(
        <RadioForTest
          onChange={() => {
            changeCalled = true;
          }}
          options={options}
        />,
      );

      await component.getByText(options[1].label).click({ force: true });
      expect(changeCalled).toBeTruthy();
    });

    test('check on space press when focused', async ({ mount }) => {
      let changeCalled = false;
      const testId = 'testId';

      const component = await mount(
        <RadioForTest
          id={testId}
          onChange={() => { changeCalled = true; }}
          options={options}
        />,
      );

      const input = component.locator(`input[id=${testId}__item__${options[1].key}]`);
      await input.focus();
      await input.press('Space');
      expect(changeCalled).toBeTruthy();
    });
  });
});
