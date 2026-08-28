import type { ComponentProps } from 'react';
import type { PropTest } from '../../../../../../tests/playwright/types';
import type { TextField } from '../../../../TextField';
import type { FormLayoutCustomFieldProps } from '../../..';

export type CustomFieldTestType = PropTest & {
  customFieldLayoutProps: FormLayoutCustomFieldProps;
  customFieldProps?: ComponentProps<typeof TextField>;
};

export type CustomFieldTestsType = CustomFieldTestType[];
