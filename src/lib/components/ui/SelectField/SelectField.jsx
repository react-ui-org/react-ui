import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './SelectField.scss';

export const SelectField = (props) => {
  let labelVisibilityClass = '';
  let rootFullWidthClass = '';
  let rootInFormLayoutClass = '';
  let rootLayoutClass = '';
  let rootRequiredClass = '';
  let rootSizeClass = '';
  let rootValidationStateClass = '';
  let rootVariantClass = '';

  if (!props.isLabelVisible) {
    labelVisibilityClass = styles.isLabelHidden;
  }

  if (props.fullWidth) {
    rootFullWidthClass = styles.isRootFullWidth;
  }

  if (props.inFormLayout) {
    rootInFormLayoutClass = styles.isRootInFormLayout;
  }

  if (props.layout === 'horizontal') {
    rootLayoutClass = styles.rootLayoutHorizontal;
  } else if (props.layout === 'vertical') {
    rootLayoutClass = styles.rootLayoutVertical;
  }

  if (props.required) {
    rootRequiredClass = styles.isRootRequired;
  }

  if (props.size === 'small') {
    rootSizeClass = styles.rootSizeSmall;
  } else if (props.size === 'medium') {
    rootSizeClass = styles.rootSizeMedium;
  } else if (props.size === 'large') {
    rootSizeClass = styles.rootSizeLarge;
  }

  if (props.validationState === 'invalid') {
    rootValidationStateClass = styles.isRootStateInvalid;
  } else if (props.validationState === 'valid') {
    rootValidationStateClass = styles.isRootStateValid;
  } else if (props.validationState === 'warning') {
    rootValidationStateClass = styles.isRootStateWarning;
  }

  if (props.variant === 'filled') {
    rootVariantClass = styles.rootVariantFilled;
  } else if (props.variant === 'outline') {
    rootVariantClass = styles.rootVariantOutline;
  }

  const propsToTransfer = transferProps(
    props,
    ['changeHandler', 'disabled', 'fullWidth', 'helperText', 'id', 'inFormLayout', 'isLabelVisible',
      'label', 'layout', 'options', 'required', 'size', 'validationState', 'value', 'variant'],
  );

  return (
    <label
      className={(`
        ${styles.root}
        ${rootFullWidthClass}
        ${rootInFormLayoutClass}
        ${rootLayoutClass}
        ${rootRequiredClass}
        ${rootSizeClass}
        ${rootValidationStateClass}
        ${rootVariantClass}
      `).trim()}
      htmlFor={props.id}
      id={`${props.id}__label`}
    >
      <div
        className={(`
          ${styles.label}
          ${labelVisibilityClass}
        `).trim()}
        id={`${props.id}__labelText`}
      >
        {props.label}
      </div>
      <div className={styles.field}>
        <div className={styles.inputContainer}>
          <select
            {...propsToTransfer}
            className={styles.input}
            disabled={props.disabled}
            id={props.id}
            onChange={props.changeHandler}
            ref={props.forwardedRef}
            required={props.required}
            value={props.value}
          >
            {
              props.options.map((option) => (
                <option
                  disabled={option.disabled}
                  id={`${props.id}__item__${option.value}`}
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
          {props.variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
        </div>
        {props.helperText && (
          <div
            className={styles.helperText}
            id={`${props.id}__helperText`}
          >
            {props.helperText}
          </div>
        )}
      </div>
    </label>
  );
};

SelectField.defaultProps = {
  changeHandler: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helperText: null,
  inFormLayout: false,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  size: 'medium',
  validationState: null,
  value: undefined,
  variant: 'outline',
};

SelectField.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `select` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional description.
   */
  helperText: PropTypes.string,
  /**
   * ID of the input HTML element. It also serves as a prefix for important inner elements:
   * `<ID>__label`, `<ID>__labelText`, `<ID>__helperText`, and all options: `<ID>__item__<VALUE>`.
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
   * Select field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Layout of the field.
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

export default withForwardedRef(SelectField);
