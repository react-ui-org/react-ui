import { validationStatePropTest } from '../../../../../../tests/playwright/propTests/validationStatePropTest';
import type { FormLayoutCustomFieldProps } from '../../..';
import type { CustomFieldTestsType } from './types';

export const customFieldValidationStatesDisabledPropTest: CustomFieldTestsType = validationStatePropTest
  .map((propTest) => ({
    customFieldLayoutProps: {
      disabled: true,
      label: 'Form layout custom field label',
      ...propTest.props as Pick<FormLayoutCustomFieldProps, 'validationState'>,
    },
    customFieldProps: {
      label: 'Custom field label',
    },
    name: `${propTest.name} disabled:boolean=true`,
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'auto',
    },
  }));
