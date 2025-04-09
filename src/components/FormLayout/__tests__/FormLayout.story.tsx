import React from 'react';
import type { HTMLAttributes } from 'react';
import {
  FormLayout,
  FormLayoutCustomField,
} from '..';
import { TextField } from '../../TextField';
import { CheckboxField } from '../../CheckboxField';
import { FileInputField } from '../../FileInputField';
import { Radio } from '../../Radio';
import { SelectField } from '../../SelectField';
import { TextArea } from '../../TextArea';
import { Toggle } from '../../Toggle';

// Types for story component will be improved when we have full TypeScript support
type FormLayoutForTestProps = HTMLAttributes<HTMLDivElement>;

export const FormLayoutForTest = ({
  ...props
}: FormLayoutForTestProps) => (
  <FormLayout {...props}>
    <TextField
      label={
        'Another form element with a very long label that is so '
        + 'long that in the auto mode, it should make the label column '
        + 'grow until the inputs reach the end of the line, but it will '
        + 'not exceed 50 % of the FormLayout width in the limited label '
        + 'width mode'
      }
    />
    <CheckboxField
      checked
      label="Label2"
    />
    <Radio
      label="Label3"
      options={[
        {
          label: 'Value',
          value: 'value',
        },
        {
          label: 'Value2',
          value: 'value2',
        },
      ]}
      value="value"
    />
    <SelectField
      label="Label4"
      options={[
        {
          label: 'Value1',
          value: 'value1',
        },
        {
          label: 'Value2',
          value: 'value2',
        },
      ]}
      value="value1"
    />
    <TextArea label="Label5" />
    <Toggle
      checked={false}
      label="Label6"
    />
    <FormLayoutCustomField label="Custom field label">
      <TextField label="Label7" />
    </FormLayoutCustomField>
    <FileInputField label="Attachment label 8" />
  </FormLayout>
);

export const FormLayoutWithoutChildrenForTest = ({
  ...props
}: FormLayoutForTestProps) => (
  <FormLayout {...props} />
);
