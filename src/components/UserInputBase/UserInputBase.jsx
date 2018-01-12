import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable jsx-a11y/label-has-for */
const UserInputBase = (
  WrappedComponent,
  labelFollowsInput = false // eslint-disable-line comma-dangle
) => {
  const Wrapper = (props) => {
    const {
      disabled,
      errors,
      fieldId,
      helpText,
      label,
      required,
      value,
      ...passThruProps
    } = props;
    const wrapped = (
      <WrappedComponent
        disabled={disabled}
        id={fieldId}
        required={required}
        value={value}
        {...passThruProps}
      />
    );

    return (
      <div>
        {(label && !labelFollowsInput)
          && <label htmlFor={fieldId}>{label}</label>
        }
        { wrapped }
        {(label && labelFollowsInput)
          && <label htmlFor={fieldId}>{label}</label>
        }
        { helpText && <div>{helpText}</div> }
        {
          errors.map(errorText => (
            <div key={errorText}>{errorText}</div>
          ))
        }
      </div>
    );
  };

  Wrapper.defaultProps = {
    disabled: false,
    errors: [],
    helpText: null,
    label: null,
    required: false,
    value: undefined,
  };

  Wrapper.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    fieldId: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  return Wrapper;
};

export default UserInputBase;
