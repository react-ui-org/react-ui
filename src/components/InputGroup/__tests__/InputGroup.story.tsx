import React from 'react';
import type { HTMLAttributes } from 'react';
import { InputGroup } from '..';
import { SelectField } from '../../SelectField';
import { Button } from '../../Button';
import { TextField } from '../../TextField';

// Types for story component will be improved when we have full TypeScript support
type InputGroupTestProps = HTMLAttributes<HTMLFieldSetElement>;
type InputGroupWithCustomInputTestProps = InputGroupTestProps & {
  inputProps: { validationState: string }
};

const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
];

export const InputGroupForTest = ({
  ...props
}: InputGroupTestProps) => (
  <InputGroup label="Input group label" {...props}>
    <SelectField
      label="Select label"
      options={options}
      value={options[0].value}
    />
    <TextField
      label="Text label"
      placeholder="Placeholder"
    />
    <Button label="Submit" />
  </InputGroup>
);

export const InputGroupWithCustomInputPropsForTest = ({
  ...props
}: InputGroupWithCustomInputTestProps) => {
  const {
    inputProps,
    ...inputGroupProps
  } = props;

  return (
    <InputGroup label="Input group label" {...inputGroupProps}>
      <SelectField
        label="Select label"
        options={options}
        value={options[0].value}
        {...inputProps}
      />
      <TextField
        label="Text label"
        placeholder="Placeholder"
        {...inputProps}
      />
      <Button label="Submit" />
    </InputGroup>
  );
};

export const InputGroupWithoutChildrenForTest = ({
  ...props
}: InputGroupTestProps) => (
  <InputGroup {...props} />
);
