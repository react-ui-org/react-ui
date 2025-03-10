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
  CheckboxFieldForTest,
  CheckboxFieldForRefTest,
  CheckboxForFormLayoutTests,
} from './CheckboxField.story';
import type { CheckboxForFormLayoutTestsProps } from './CheckboxField.story';
import { checkedPropTest } from './_propTests/checkedPropTest';

test.describe('CheckboxField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.labelPropTest,
        ...propTests.renderAsRequiredPropTest,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPositionPropTest,
        ...mixPropTests([
          checkedPropTest,
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          checkedPropTest,
          propTests.requiredPropTest,
        ]),
        ...mixPropTests([
          checkedPropTest,
          propTests.validationTextPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          checkedPropTest,
          propTests.validationTextPropTest,
          propTests.helpTextPropTest,
        ]),
      ].forEach(({
        name,
        onBeforeTest,
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
            <CheckboxFieldForTest
              {...props}
            />,
          );

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });

    test.describe('non-visual', () => {
      test('id', async ({ mount }) => {
        const idValue = 'checkbox-id';
        const label = 'checkbox-label';
        const helpText = 'checkbox-helpText';
        const validationText = 'checkbox-validationText';

        const component = await mount(
          <CheckboxFieldForTest
            helpText={helpText}
            id={idValue}
            label={label}
            validationText={validationText}
          />,
        );

        await expect(component.getByRole('checkbox')).toHaveAttribute('id', idValue);
        await expect(component).toHaveAttribute('id', `${idValue}__label`);
        await expect(component.getByText(label)).toHaveAttribute('id', `${idValue}__labelText`);
        await expect(component.getByText(helpText)).toHaveAttribute('id', `${idValue}__helpText`);
        await expect(component.getByText(validationText)).toHaveAttribute('id', `${idValue}__validationText`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <CheckboxFieldForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
          />,
        );

        await expect(component.getByRole('checkbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange()', async ({ mount }) => {
        let changeCalled = false;

        const component = await mount(
          <CheckboxFieldForTest
            onChange={() => {
              changeCalled = true;
            }}
          />,
        );

        await component.click({ force: true });
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
            <CheckboxForFormLayoutTests
              {...props as unknown as CheckboxForFormLayoutTestsProps}
            />,
          );

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });
  });
});
