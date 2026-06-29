import React from 'react';
import type { HTMLAttributes } from 'react';
import {
  FormLayout,
  FormLayoutCustomField,
} from '..';
import { TextField } from '../../TextField';
// Types for story component will be improved when we have full TypeScript support
type FormLayoutForTestProps = HTMLAttributes<HTMLDivElement>;
type FormLayoutCustomFieldForTestProps = FormLayoutForTestProps & {
  customFieldLayoutProps?: HTMLAttributes<HTMLDivElement>;
  customFieldProps?: HTMLAttributes<HTMLDivElement>;
};

export const FormLayoutCustomFieldForTest = (props: FormLayoutCustomFieldForTestProps) => {
  const {
    customFieldLayoutProps,
    customFieldProps,
    ...restProps
  } = props;

  return (
    <FormLayout {...restProps}>
      <TextField label="Label1" />
      <TextField label="Label2" />
      <FormLayoutCustomField {...customFieldLayoutProps}>
        {customFieldProps ? <TextField {...customFieldProps} /> : null}
      </FormLayoutCustomField>
    </FormLayout>
  );
};

FormLayoutCustomFieldForTest.defaultProps = {
  customFieldLayoutProps: undefined,
  customFieldProps: undefined,
};
