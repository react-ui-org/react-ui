import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextField.scss';

const TextField = (props) => {
  let labelVisibilityClass = '';
  let rootFullWidthClass = '';
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

  return (
    <label
      className={(`
        ${styles.root}
        ${rootFullWidthClass}
        ${rootLayoutClass}
        ${rootRequiredClass}
        ${rootSizeClass}
        ${rootValidationStateClass}
        ${rootVariantClass}
      `).trim()}
      htmlFor={props.id}
    >
      <div
        className={(`
          ${styles.label}
          ${labelVisibilityClass}
        `).trim()}
        id={`${props.id}__label`}
      >
        {props.label}
      </div>
      <div className={styles.inputContainer}>
        <input
          autoCapitalize={props.autoCapitalize}
          autoComplete={props.autoComplete}
          className={styles.input}
          disabled={props.disabled}
          id={props.id}
          onChange={props.changeHandler}
          placeholder={props.placeholder}
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
    </label>
  );
};

TextField.defaultProps = {
  autoCapitalize: undefined,
  autoComplete: undefined,
  changeHandler: null,
  disabled: false,
  fullWidth: false,
  helperText: null,
  inputSize: null,
  isLabelVisible: true,
  layout: 'vertical',
  placeholder: null,
  required: false,
  size: 'medium',
  type: 'text',
  validationState: null,
  value: undefined,
  variant: 'outline',
};

TextField.propTypes = {
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  changeHandler: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputSize: PropTypes.number,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
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

export default TextField;
