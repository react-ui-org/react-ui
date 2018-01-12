import PropTypes from 'prop-types';
import React from 'react';
import UserInputBase from '../UserInputBase';

const TextArea = (props) => {
  const {
    placeholder,
    rows,
    ...higherOrderProps
  } = props;

  return (
    <textarea
      {...higherOrderProps}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

TextArea.defaultProps = {
  placeholder: null,
  rows: 3,
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default UserInputBase(TextArea);
