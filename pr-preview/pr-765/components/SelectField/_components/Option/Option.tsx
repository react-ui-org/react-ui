import React from 'react';
import type { OptionProps } from './Option.types';

export const Option: React.FunctionComponent<OptionProps> = ({
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
