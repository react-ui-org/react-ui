import PropTypes from 'prop-types';
import React from 'react';
import styles from './SelectField.scss';

const SelectField = (props) => {
  let labelClass = styles.label;
  if (props.isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  let rootClass = styles.root;
  if (props.isLabelVisible) {
    if (props.disabled) {
      rootClass = styles.isRootDisabled;
    }
  } else {
    rootClass = styles.isRootCondensed;
  }

  return (
    <div className={rootClass}>
      <label htmlFor={props.fieldId}>
        <div className={labelClass}>
          {props.label}
        </div>
        <select
          id={props.fieldId}
          disabled={props.disabled}
          required={props.required}
          value={props.value}
          className={props.error ? styles.isSelectInvalid : styles.select}
          onChange={props.changeHandler}
        >
          {
            props.options.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
        </select>
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

SelectField.defaultProps = {
  changeHandler: null,
  description: null,
  disabled: false,
  error: null,
  isLabelVisible: true,
  required: false,
  value: undefined,
};

SelectField.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SelectField;
