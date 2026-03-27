import { validationStatePropTest } from '../../../../../../tests/playwright/propTests/validationStatePropTest';
import type { CustomFieldTestsType } from './types';

export const customFieldValidationStatesDisabledPropTest: CustomFieldTestsType = validationStatePropTest
  .map((propTest) => ({
    customFieldLayoutProps: {
      disabled: true,
      label: 'Form layout custom field label',
      ...propTest.props,
    },
    customFieldProps: {
      isLabelVisible: false,
      label: 'Custom field label',
    },
    name: `${propTest.name} disabled:boolean=true`,
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'auto',
    },
  }));
