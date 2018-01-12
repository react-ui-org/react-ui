import PropTypes from 'prop-types';
import React from 'react';
import UserInputBase from '../UserInputBase';

/* eslint-disable jsx-a11y/label-has-for */
const Radio = (props) => {
  const {
    options,
    ...higherOrderProps
  } = props;
  return (
    <ul {...higherOrderProps}>
      {
        options.map(option => (
          <li key={option.value}>
            <label>
              <input
                disabled={higherOrderProps.disabled}
                name={higherOrderProps.id}
                type="radio"
                value={option.value}
              />
              { option.label }
            </label>
          </li>
        ))
      }
    </ul>
  );
};

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
};

export default UserInputBase(Radio);
