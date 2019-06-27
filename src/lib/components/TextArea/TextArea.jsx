import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextArea.scss';

const TextArea = (props) => {
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
    <div
      className={(`
        ${styles.root}
        ${rootFullWidthClass}
        ${rootLayoutClass}
        ${rootRequiredClass}
        ${rootSizeClass}
        ${rootValidationStateClass}
        ${rootVariantClass}
      `).trim()}
    >
      <label className={styles.container} htmlFor={props.fieldId}>
        <div
          className={(`
            ${styles.label}
            ${labelVisibilityClass}
          `).trim()}
        >
          {props.label}
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.input}
            cols={props.cols}
            disabled={props.disabled}
            id={props.fieldId}
            onChange={props.changeHandler}
            placeholder={props.placeholder}
            required={props.required}
            rows={props.rows}
            value={props.value}
          />
          {props.variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
        </div>
      </label>
      {props.helperText && (
        <div className={styles.helperText}>
          {props.helperText}
        </div>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  changeHandler: null,
  cols: null,
  disabled: false,
  fullWidth: false,
  helperText: null,
  isLabelVisible: true,
  layout: 'vertical',
  placeholder: null,
  required: false,
  rows: 3,
  size: 'medium',
  validationState: null,
  value: undefined,
  variant: 'outline',
};

TextArea.propTypes = {
  changeHandler: PropTypes.func,
  cols: PropTypes.number,
  disabled: PropTypes.bool,
  fieldId: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export default TextArea;
