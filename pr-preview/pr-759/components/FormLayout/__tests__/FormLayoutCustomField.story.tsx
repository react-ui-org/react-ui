import React from 'react';
import type { ComponentProps } from 'react';
import { TextField } from '../../TextField';
import {
  FormLayout,
  FormLayoutCustomField,
} from '..';
import type {
  FormLayoutCustomFieldProps,
  FormLayoutProps,
} from '..';

type FormLayoutForTestProps = FormLayoutProps;
type FormLayoutCustomFieldForTestProps = FormLayoutForTestProps & {
  customFieldLayoutProps?: FormLayoutCustomFieldProps;
  customFieldProps?: ComponentProps<typeof TextField>;
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
