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
  changeHandler: PropTypes.func,
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inFormLayout: PropTypes.bool,
  inputSize: PropTypes.number,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  max: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export default withForwardedRef(TextField);
