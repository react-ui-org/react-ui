import PropTypes from 'prop-types';
import React from 'react';
import styles from './Radio.scss';

const Radio = (props) => {
  let labelClass = styles.label;
  let rootValidationStateClass = '';

  if (props.isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  if (props.validationState === 'invalid') {
    rootValidationStateClass = styles.isRootStateInvalid;
  } else if (props.validationState === 'valid') {
    rootValidationStateClass = styles.isRootStateValid;
  } else if (props.validationState === 'warning') {
    rootValidationStateClass = styles.isRootStateWarning;
  }

  return (
    <div
      className={`
        ${styles.root}
        ${rootValidationStateClass}
      `.trim()}
    >
      <div
        className={labelClass}
        id={`${props.id}__label`}
      >
        {props.label}
      </div>
      <ul className={styles.list}>
        {
          props.options.map((option) => (
            <li key={option.value}>
              { /* Rule is deprecated: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md */ }
              { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
              <label className={styles.inputWrap}>
                <input
                  {...props.htmlElementAttributes}
                  id={`${props.id}__item__${option.value}`}
                  name={props.id}
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
        <div
          className={styles.description}
          id={`${props.id}__descriptionText`}
        >
          {props.description}
        </div>
      )}
      {props.error && (
        <div
          className={styles.error}
          id={`${props.id}__errorText`}
        >
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
  htmlElementAttributes: {},
  isLabelVisible: true,
  required: false,
  validationState: null,
  value: undefined,
};

Radio.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  htmlElementAttributes: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
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
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Radio;
