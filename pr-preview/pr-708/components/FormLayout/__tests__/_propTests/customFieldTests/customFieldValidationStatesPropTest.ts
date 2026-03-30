import { validationStatePropTest } from '../../../../../../tests/playwright/propTests/validationStatePropTest';
import type { CustomFieldTestsType } from './types';

export const customFieldValidationStatesPropTest: CustomFieldTestsType = validationStatePropTest
  .filter((test) => test.props.validationState !== undefined)
  .map((propTest) => ({
    customFieldLayoutProps: {
      label: 'Form layout custom field label',
      ...propTest.props,
    },
    customFieldProps: {
      isLabelVisible: false,
      label: 'Custom field label',
    },
    name: propTest.name,
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'auto',
    },
  }));
