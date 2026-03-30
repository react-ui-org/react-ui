import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { customFieldValidationStatesPropTest } from './_propTests/customFieldTests/customFieldValidationStatesPropTest';
import { customFieldLabelAlignmentPropTest } from './_propTests/customFieldTests/customFieldLabelAlignmentPropTest';
import { customFieldRequiredPropTest } from './_propTests/customFieldTests/customFieldRequiredPropTest';
import { FormLayoutCustomFieldForTest } from './FormLayoutCustomField.story';
import { customFieldValidationStatesDisabledPropTest } from './_propTests/customFieldTests/customFieldValidationStatesDisabledPropTest';

test.describe('FormLayoutCustomField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...customFieldLabelAlignmentPropTest,
        ...customFieldValidationStatesPropTest,
        ...customFieldValidationStatesDisabledPropTest,
        ...customFieldRequiredPropTest,
      ].forEach(({
        name,
        onBeforeTest,
        onBeforeSnapshot,
        props,
        customFieldLayoutProps,
        customFieldProps,
      }) => {
        test(name, async ({
          mount,
          page,
        }) => {
          if (onBeforeTest) {
            await onBeforeTest(page);
          }

          const component = await mount(
            <FormLayoutCustomFieldForTest
              {...props}
              customFieldLayoutProps={customFieldLayoutProps}
              customFieldProps={customFieldProps}
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
      test('pass id into custom field', async ({ mount }) => {
        const id = 'custom-id';

        const component = await mount(
          <FormLayoutCustomFieldForTest
            customFieldLayoutProps={{
              fieldLayout: 'horizontal',
              id,
              label: 'CustomLayoutFieldLabel',
            }}
            customFieldProps={{
              label: 'CustomFieldLabel',
            }}
          />,
        );

        await expect(component.locator(`div[id=${id}]`)).not.toBeEmpty();
        await expect(component.locator(`div[id=${id}__label]`)).not.toBeEmpty();
        await expect(component.locator(`div[id=${id}__field]`)).not.toBeEmpty();
      });

      test('render label with labelForId', async ({ mount }) => {
        const id = 'custom-id';
        const labelForId = 'custom-labelForId';

        const component = await mount(
          <FormLayoutCustomFieldForTest
            customFieldLayoutProps={{
              id,
              label: 'CustomFieldLabel',
              labelForId,
            }}
            customFieldProps={{
              label: 'CustomFieldLabel',
            }}
          />,
        );

        await expect(component.locator(`label[id=${id}__label][for=${labelForId}]`)).not.toBeEmpty();
      });
    });

    test.describe('functionality', () => {
      test('render null when no children to custom field provided', async ({ mount }) => {
        const component = await mount(<FormLayoutCustomFieldForTest />);

        const numberOfInputComponents = await component.getByRole('textbox').count();
        expect(numberOfInputComponents).toBe(2);
      });
    });
  });
});
