import React from 'react';
import { OptionProps } from './Option.types';

export const Option: React.FunctionComponent<OptionProps> = ({
  disabled = false,
  id,
  label,
  value,
}) => (
  <option
    disabled={disabled}
    id={id}
    value={value}
  >
    {label}
  </option>
);

export default Option;
