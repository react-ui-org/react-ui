import PropTypes from 'prop-types';
import React from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import styles from './Radio.scss';

export const Radio = ({
  changeHandler,
  disabled,
  helpText,
  id,
  inFormLayout,
  isLabelVisible,
  label,
  layout,
  options,
  required,
  validationState,
  validationText,
  value,
  ...restProps
}) => (
  <div
    className={[
      styles.root,
      inFormLayout ? styles.isRootInFormLayout : '',
      layout === 'horizontal' ? styles.isRootLayoutHorizontal : '',
      getRootValidationStateClassName(validationState, styles),
    ].join(' ')}
  >
    <div
      className={[
        isLabelVisible ? '' : styles.isLabelHidden,
        isLabelVisible && required ? styles.isLabelRequired : '',
      ].join(' ')}
      id={`${id}__labelText`}
    >
      {label}
    </div>
    <ul className={styles.list}>
      {
        options.map((option) => (
          <li key={option.value}>
            <label
              className={styles.inputWrap}
              htmlFor={`${id}__item__${option.value}`}
              id={`${id}__item__${option.value}__label`}
            >
              <input
                {...transferProps(restProps)}
                className={styles.input}
                checked={(value === option.value) || false}
                disabled={disabled || option.disabled}
                id={`${id}__item__${option.value}`}
                name={id}
                onChange={changeHandler}
                type="radio"
                value={option.value}
              />
              <span
                className={styles.radioLabel}
                id={`${id}__item__${option.value}__labelText`}
              >
                { option.label }
              </span>
            </label>
          </li>
        ))
      }
    </ul>
    {helpText && (
      <div
        className={styles.helpText}
        id={`${id}__helpText`}
      >
        {helpText}
      </div>
    )}
    {validationText && (
      <div
        className={styles.validationText}
        id={`${id}__validationText`}
      >
        {validationText}
      </div>
    )}
  </div>
);

Radio.defaultProps = {
  changeHandler: null,
  disabled: false,
  helpText: null,
  inFormLayout: false,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  validationState: null,
  validationText: null,
  value: undefined,
};

Radio.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * Prefix for ID of important inner elements: `<ID>__labelText`, `<ID>__helpText`,
   * `<ID>__validationText`, and all options: `<ID>__item__<VALUE>` (individual inputs),
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
   * Validation message to be displayed.
   */
  validationText: PropTypes.node,
  /**
   * Value of the input.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export const RadioWithContext = withProviderContext(Radio, 'Radio');

export default RadioWithContext;
