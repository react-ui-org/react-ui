import { statePropTest } from '../../../../../../tests/playwright/propTests/statePropTest';
import type { FormLayoutCustomFieldProps } from '../../..';
import type { CustomFieldTestsType } from './types';

export const customFieldStatesDisabledPropTest: CustomFieldTestsType = statePropTest
  .map((propTest) => ({
    customFieldLayoutProps: {
      disabled: true,
      label: 'Form layout custom field label',
      ...propTest.props as Pick<FormLayoutCustomFieldProps, 'state'>,
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
