import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextField.scss';

const TextField = (props) => {
  let labelClass = styles.label;
  if (props.isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  return (
    <div className={styles.root}>
      <label htmlFor={props.fieldId}>
        <div className={labelClass}>
          {props.label}
        </div>
        <input
          id={props.fieldId}
          disabled={props.disabled}
          placeholder={props.placeholder}
          required={props.required}
          type={props.type}
          value={props.value}
          onChange={props.changeHandler}
          className={props.error ? styles.isInputInvalid : styles.input}
        />
      </label>
      {props.description && (
        <div className={styles.description}>
          {props.description}
        </div>
      )}
      {props.error && (
        <div className={styles.error}>
          {props.error}
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
