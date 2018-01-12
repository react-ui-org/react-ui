import PropTypes from 'prop-types';
import React from 'react';
import UserInputBase from '../UserInputBase';

/* eslint-disable jsx-a11y/label-has-for */
const RadioList = (props) => {
  const {
    options,
    ...higherOrderProps
  } = props;
  return (
    <ul {...higherOrderProps}>
      {
        options.map(option => (
          <li key={option}>
            <label>
              <input
                disabled={higherOrderProps.disabled}
                name={higherOrderProps.id}
                type="radio"
              />
              { option }
            </label>
          </li>
        ))
      }
    </ul>
  );
};

RadioList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserInputBase(RadioList);
