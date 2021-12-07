import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import styles from './Radio.scss';

export const Radio = ({
  disabled,
  helpText,
  id,
  isLabelVisible,
  label,
  layout,
  options,
  required,
  validationState,
  validationText,
  value,
  ...restProps
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <div
      className={classNames(
        styles.root,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.rootLayoutHorizontal
          : styles.rootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootValidationStateClassName(validationState, styles),
      )}
      id={id}
    >
      <div
        className={classNames(
          styles.label,
          !isLabelVisible && styles.isLabelHidden,
        )}
        id={id && `${id}__labelText`}
      >
        {label}
      </div>
      <div className={styles.field}>
        <ul className={styles.list}>
          {
            options.map((option) => (
              <li key={option.value}>
                <label
                  className={styles.option}
                  htmlFor={id && `${id}__item__${option.value}`}
                  id={id && `${id}__item__${option.value}__label`}
                >
                  <input
                    {...transferProps(restProps)}
                    className={styles.input}
                    checked={restProps.onChange
                      ? (value === option.value) || false
                      : undefined}
                    disabled={disabled || option.disabled}
                    id={id && `${id}__item__${option.value}`}
                    name={id}
                    type="radio"
                    value={option.value}
                  />
                  <span
                    className={styles.optionLabel}
                    id={id && `${id}__item__${option.value}__labelText`}
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
            id={id && `${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {validationText && (
          <div
            className={styles.validationText}
            id={id && `${id}__validationText`}
          >
            {validationText}
          </div>
        )}
      </div>
    </div>
  );
};

Radio.defaultProps = {
  disabled: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  validationState: null,
  validationText: null,
  value: undefined,
};

Radio.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   *
   * and of individual options (`<input>`):
   * * `<ID>__item__<VALUE>`
   * * `<ID>__item__<VALUE>__label`
   * * `<ID>__item__<VALUE>__labelText`
   */
  id: PropTypes.string,
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
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
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
