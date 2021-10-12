import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../../../helpers/resolveContextOrProp';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import { FormLayoutContext } from '../../layout/FormLayout';
import styles from './Radio.scss';

export const Radio = ({
  changeHandler,
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
      className={[
        styles.root,
        context ? styles.isRootInFormLayout : '',
        resolveContextOrProp(context?.layout, layout) === 'horizontal'
          ? styles.rootLayoutHorizontal
          : styles.rootLayoutVertical,
        disabled ? styles.isRootDisabled : '',
        required ? styles.isRootRequired : '',
        getRootValidationStateClassName(validationState, styles),
      ].join(' ')}
      id={id}
    >
      <div
        className={[
          styles.label,
          isLabelVisible ? '' : styles.isLabelHidden,
        ].join(' ')}
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
                    checked={(value === option.value) || undefined}
                    disabled={disabled || option.disabled}
                    id={id && `${id}__item__${option.value}`}
                    name={id}
                    onChange={changeHandler}
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
  changeHandler: null,
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
