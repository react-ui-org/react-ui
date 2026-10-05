import React from 'react';
import { InputGroup } from '..';
import type { InputGroupProps } from '..';
import { SelectField } from '../../SelectField';
import { Button } from '../../Button';
import { TextField } from '../../TextField';
import type { ValidationState } from '../../../types';
import type { StoryProps } from '../../../../tests/playwright';

type InputGroupTestProps = StoryProps<InputGroupProps, 'label'> & {
  // Children rendered by the story instead of `children`, which cannot be passed as JSX to `mount()`
  childrenVariant?: 'multiple' | 'single';
};
type InputGroupWithCustomInputTestProps = InputGroupTestProps & {
  inputProps?: { validationState: ValidationState };
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

const defaultChildren = [
  <SelectField
    key="selectField"
    label="Select label"
    options={options}
    value={options[0].value}
  />,
  <TextField
    key="textField"
    label="Text label"
    placeholder="Placeholder"
  />,
  <Button
    key="button"
    label="Submit"
  />,
];

const childrenVariants = {
  multiple: defaultChildren,
  single: (
    <TextField
      label="Text label"
      placeholder="Placeholder"
    />
  ),
};

export const InputGroupForTest = ({
  children,
  childrenVariant,
  label = 'Input group label',
  ...props
}: InputGroupTestProps) => (
  <InputGroup label={label} {...props}>
    {childrenVariant ? childrenVariants[childrenVariant] : (children ?? defaultChildren)}
  </InputGroup>
);

export const InputGroupWithCustomInputPropsForTest = ({
  ...props
}: InputGroupWithCustomInputTestProps) => {
  const {
    inputProps,
    label = 'Input group label',
    ...inputGroupProps
  } = props;

  return (
    <InputGroup label={label} {...inputGroupProps}>
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
  label = 'Input group label',
  ...props
}: InputGroupTestProps) => (
  <InputGroup label={label} {...props} />
);
