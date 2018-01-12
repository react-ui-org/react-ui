import PropTypes from 'prop-types';
import React from 'react';

const TextField = (props) => {
  const {
    disabled,
    errors,
    fieldId,
    handleChange,
    helpText,
    label,
    placeholder,
    required,
    type,
    value,
  } = props;
  const hasErrors = errors.length > 0;
  const inputEl = (<input
    disabled={disabled}
    id={fieldId}
    onChange={handleChange}
    placeholder={placeholder}
    required={required}
    type={type}
    value={value}
  />);

  return (
    <div>
      {
        label
          ? <label htmlFor={fieldId}>{inputEl}{label}</label>
          : inputEl
      }
      {
        (helpText && !hasErrors)
          && <div>{helpText}</div>
      }
      {
        errors.map(errorText => (
          <div>{errorText}</div>
        ))
      }
    </div>
  );
};

TextField.defaultProps = {
  disabled: false,
  errors: [],
  handleChange: null,
  helpText: null,
  label: null,
  placeholder: null,
  required: false,
  type: 'text',
  value: '',
};

TextField.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  fieldId: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  helpText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextField;
