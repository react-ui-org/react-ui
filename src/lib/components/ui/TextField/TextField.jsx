import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './TextField.scss';

export const TextField = (props) => {
  const SMALL_INPUT_SIZE = 10;

  const setCustomInputSizeByType = (inputType, inputSize, max) => {
    if (inputType === 'number' && max) {
      return max.toString().length;
    }

    if (inputSize) {
      return inputSize;
    }

    return null;
  };

  const setInlineStyle = (customSize) => {
    const style = {};

    if (customSize) {
      style['--rui-custom-input-size'] = customSize;
    }

    return style;
  };

  const customInputSize = setCustomInputSizeByType(props.type, props.inputSize, props.max);
  const hasSmallInput = (customInputSize !== null) && (customInputSize <= SMALL_INPUT_SIZE);

  let labelVisibilityClass = '';
  let rootFullWidthClass = '';
  let rootInFormLayoutClass = '';
  let rootLayoutClass = '';
  let rootRequiredClass = '';
  let rootSizeClass = '';
  let rootSmallInputClass = '';
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

  if (hasSmallInput) {
    rootSmallInputClass = styles.hasRootSmallInput;
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
    ['changeHandler', 'disabled', 'fullWidth', 'helperText', 'id', 'inFormLayout', 'inputSize', 'isLabelVisible',
      'label', 'layout', 'max', 'placeholder', 'required', 'size', 'type', 'validationState', 'value', 'variant'],
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
        ${rootSmallInputClass}
        ${rootValidationStateClass}
        ${rootVariantClass}
      `).trim()}
      htmlFor={props.id}
      id={`${props.id}__label`}
      style={setInlineStyle(customInputSize)}
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
          <input
            {...propsToTransfer}
            className={styles.input}
            disabled={props.disabled}
            id={props.id}
            max={props.type === 'number' ? props.max : null}
            onChange={props.changeHandler}
            placeholder={props.placeholder}
            ref={props.forwardedRef}
            required={props.required}
            size={props.type !== 'number' ? props.inputSize : null}
            type={props.type}
            value={props.value}
          />
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

TextField.defaultProps = {
  changeHandler: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helperText: null,
  inFormLayout: false,
  inputSize: null,
  isLabelVisible: true,
  layout: 'vertical',
  max: null,
  placeholder: null,
  required: false,
  size: 'medium',
  type: 'text',
  validationState: null,
  value: undefined,
  variant: 'outline',
};

TextField.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `input` element.
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
   * `<ID>__label`, `<ID>__labelText`, and `<ID>__helperText`.
   */
  id: PropTypes.string.isRequired,
  /**
   * Treat the field differently when it's inside a FormLayout. Do not set manually!
   */
  inFormLayout: PropTypes.bool,
  /**
   * Width of the input field, translated as `size` attribute of the input.
   */
  inputSize: PropTypes.number,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible: PropTypes.bool,
  /**
   * Text field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Layout of the field.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The maximum value for number input types.
   */
  max: PropTypes.number,
  /**
   * Optional example value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Size of the field.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * HTML input type, translated as `type` attribute of the input.
   */
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
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

export default withForwardedRef(TextField);
