import type { HTMLAttributes } from 'react';
import type { PropTest } from '../../../../../../tests/playwright/types';

export type CustomFieldTestType = PropTest & {
  customFieldLayoutProps: HTMLAttributes<HTMLDivElement>;
  customFieldProps?: HTMLAttributes<HTMLDivElement>;
};

export type CustomFieldTestsType = CustomFieldTestType[];
