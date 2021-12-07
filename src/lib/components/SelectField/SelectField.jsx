import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import withForwardedRef from '../withForwardedRef';
import styles from './SelectField.scss';

export const SelectField = ({
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
  isLabelVisible,
  label,
  layout,
  options,
  required,
  size,
  validationState,
  validationText,
  value,
  variant,
  ...restProps
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.rootLayoutHorizontal
          : styles.rootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(size, styles),
        getRootValidationStateClassName(validationState, styles),
        variant === 'filled' ? styles.rootVariantFilled : styles.rootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
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
        <div className={styles.inputContainer}>
          <select
            {...transferProps(restProps)}
            className={styles.input}
            disabled={disabled}
            id={id}
            ref={forwardedRef}
            required={required}
            value={value}
          >
            {
              options.map((option) => (
                <option
                  disabled={option.disabled}
                  id={id && `${id}__item__${option.value}`}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))
            }
          </select>
          <div className={styles.caret}>
            <span className={styles.caretIcon} />
          </div>
          {variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
        </div>
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
    </label>
  );
};

SelectField.defaultProps = {
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  size: 'medium',
  validationState: null,
  validationText: null,
  value: undefined,
  variant: 'outline',
};

SelectField.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `select` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the input HTML element.
   *
   * Also serves as a prefix for important inner elements:
   * * `<ID>__label`
   * * `<ID>__labelText`,
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   *
   * and of individual options:
   * * `<ID>__item__<VALUE>`
   */
  id: PropTypes.string,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible: PropTypes.bool,
  /**
   * Select field label.
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
   * Size of the field.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
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
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export const SelectFieldWithContext = withForwardedRef(withProviderContext(SelectField, 'SelectField'));

export default SelectFieldWithContext;
