import PropTypes from 'prop-types';
import React from 'react';

export const Option = ({
  disabled,
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

Option.defaultProps = {
  disabled: false,
  id: undefined,
};

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
