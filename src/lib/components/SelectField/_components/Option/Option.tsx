import React from 'react';
import { OptionProps } from '../../SelectField.types';

export const Option = ({
  disabled = false,
  id,
  label,
  value,
}: OptionProps) => (
  <option
    disabled={disabled}
    id={id}
    value={value}
  >
    {label}
  </option>
);

export default Option;
