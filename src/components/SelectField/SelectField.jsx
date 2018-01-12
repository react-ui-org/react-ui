import PropTypes from 'prop-types';
import React from 'react';
import UserInputBase from '../UserInputBase';

const SelectField = (props) => {
  const {
    options,
    ...higherOrderProps
  } = props;

  return (
    <select {...higherOrderProps}>
      {
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
};

export default UserInputBase(SelectField);
