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
          props.options.map(option => (
            <li key={option.value}>
              { /* Rule is deprecated: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md */ }
              { /* eslint-disable-next-line jsx-a11y/label-has-for */ }
              <label className={styles.inputWrap}>
                <input
                  name={props.fieldId}
                  type="radio"
                  value={option.value}
                  onChange={props.changeHandler}
                  className={styles.input}
                  disabled={props.disabled || option.disabled}
                  checked={(props.value === option.value) || false}
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
