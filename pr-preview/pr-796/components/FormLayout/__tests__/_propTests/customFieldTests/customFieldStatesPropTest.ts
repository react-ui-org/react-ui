import { statePropTest } from '../../../../../../tests/playwright/propTests/statePropTest';
import type { FormLayoutCustomFieldProps } from '../../..';
import type { CustomFieldTestsType } from './types';

export const customFieldStatesPropTest: CustomFieldTestsType = statePropTest
  .filter((test) => test.props.state !== undefined)
  .map((propTest) => ({
    customFieldLayoutProps: {
      label: 'Form layout custom field label',
      ...propTest.props as Pick<FormLayoutCustomFieldProps, 'state'>,
    },
    customFieldProps: {
      label: 'Custom field label',
    },
    name: propTest.name,
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'auto',
    },
  }));
