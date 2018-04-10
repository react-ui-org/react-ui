import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextField.scss';

const TextField = (props) => {
  const {
    changeHandler,
    description,
    error,
    fieldId,
    isLabelVisible,
    ...otherProps
  } = props;

  let labelClass = styles.label;
  if (isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  return (
    <div className={styles.root}>
      <label htmlFor={fieldId}>
        <div className={labelClass}>
          {props.label}
        </div>
        <input
          {...otherProps}
          id={fieldId}
          onChange={changeHandler}
          className={error ? styles.isInputInvalid : styles.input}
        />
      </label>
      {description && (
        <div className={styles.description}>
          {description}
        </div>
      )}
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  changeHandler: null,
  description: null,
  disabled: false,
  error: null,
  isLabelVisible: true,
  placeholder: null,
  required: false,
  type: 'text',
  value: undefined,
};

TextField.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextField;
