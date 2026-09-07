import React from 'react';
import type { PropTests } from '../../../../../tests/playwright/types';
import { ButtonWithGlobalProps as Button } from '../../../Button/Button';
import { SelectFieldWithGlobalProps as SelectField } from '../../../SelectField/SelectField';
import { TextFieldWithGlobalProps as TextField } from '../../../TextField/TextField';

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

export const childrenPropTest: PropTests = [
  {
    name: 'children:node[single]',
    props: {
      children: (
        <TextField
          label="Text label"
          placeholder="Placeholder"
        />
      ),
    },
  },
  {
    name: 'children:node[multiple]',
    props: {
      children: [
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
      ],
    },
  },
];
