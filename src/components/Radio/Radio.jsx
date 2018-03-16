import PropTypes from 'prop-types';
import React from 'react';
import styles from './Radio.scss';

const Radio = (props) => {
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
      <div className={labelClass}>
        {props.label}
      </div>
      <ul className={styles.list}>
        {
          props.options.map((option, index) => (
            <li key={option.value}>
              <label htmlFor={`${props.fieldId}-${index}`} className={styles.inputWrap}>
                <input
                  id={`${props.fieldId}-${index}`}
                  name={props.fieldId}
                  type="radio"
                  value={option.value}
                  onChange={props.changeHandler}
                  className={styles.input}
                  disabled={props.disabled || option.disabled}
                  checked={(props.value === option.value) || undefined}
                />
                <span className={styles.radioLabel}>
                  { option.label }
                </span>
              </label>
            </li>
          ))
        }
      </ul>
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

Radio.defaultProps = {
  changeHandler: null,
  description: null,
  disabled: false,
  error: null,
  isLabelVisible: true,
  required: false,
  value: undefined,
};

Radio.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
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

export default Radio;
