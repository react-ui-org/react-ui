import PropTypes from 'prop-types';
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
Option.propTypes = {
  /**
   * If `true` the option cannot be selected.
   */
  disabled: PropTypes.bool,
  /**
   * ID of an individual option.
   */
  id: PropTypes.string,
  /**
   * Option label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Option value.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Option;
