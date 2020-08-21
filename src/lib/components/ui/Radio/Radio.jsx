import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import styles from './Radio.scss';

export const Radio = (props) => {
  let labelClass = styles.label;
  let rootInFormLayoutClass = '';
  let rootLayoutClass = '';
  let rootValidationStateClass = '';

  if (props.isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  if (props.inFormLayout) {
    rootInFormLayoutClass = styles.isRootInFormLayout;
  }

  if (props.layout === 'horizontal') {
    rootLayoutClass = styles.isRootLayoutHorizontal;
  }

  if (props.validationState === 'invalid') {
    rootValidationStateClass = styles.isRootStateInvalid;
  } else if (props.validationState === 'valid') {
    rootValidationStateClass = styles.isRootStateValid;
  } else if (props.validationState === 'warning') {
    rootValidationStateClass = styles.isRootStateWarning;
  }

  const propsToTransfer = transferProps(
    props,
    ['changeHandler', 'description', 'disabled', 'error', 'id', 'inFormLayout', 'isLabelVisible',
      'label', 'layout', 'options', 'required', 'validationState', 'value'],
  );

  return (
    <div
      className={`
        ${styles.root}
        ${rootInFormLayoutClass}
        ${rootLayoutClass}
        ${rootValidationStateClass}
      `.trim()}
    >
      <div
        className={labelClass}
        id={`${props.id}__labelText`}
      >
        {props.label}
      </div>
      <ul className={styles.list}>
        {
          props.options.map((option) => (
            <li key={option.value}>
              { /* Rule is deprecated: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md */ }
              { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
              <label
                className={styles.inputWrap}
                id={`${props.id}__item__${option.value}__label`}
              >
                <input
                  {...propsToTransfer}
                  id={`${props.id}__item__${option.value}`}
                  name={props.id}
                  type="radio"
                  value={option.value}
                  onChange={props.changeHandler}
                  className={styles.input}
                  disabled={props.disabled || option.disabled}
                  checked={(props.value === option.value) || false}
                />
                <span
                  className={styles.radioLabel}
                  id={`${props.id}__item__${option.value}__labelText`}
                >
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
  inFormLayout: false,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  validationState: null,
  value: undefined,
};

Radio.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * Optional description.
   */
  description: PropTypes.string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Error message to be displayed.
   */
  error: PropTypes.string,
  /**
   * Prefix for ID of important inner elements: `<ID>__labelText`, `<ID>__descriptionText`,
   * `<ID>__errorText`, and all options: `<ID>__item__<VALUE>` (individual inputs),
   * `<ID>__item__<VALUE>__label`, and `<ID>__item__<VALUE>__labelText`.
   */
  id: PropTypes.string.isRequired,
  /**
   * Treat the field differently when it's inside a FormLayout. Do not set manually!
   */
  inFormLayout: PropTypes.bool,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible: PropTypes.bool,
  /**
   * Label of the group of options.
   */
  label: PropTypes.string.isRequired,
  /**
   * Layout of the field. It has impact only on Radio inside a FormLayout.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Set of options to be chosen from.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  /**
   * Value of the input.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Radio;
