import PropTypes from 'prop-types';
import React from 'react';
import styles from './MultipleSelectField.scss';

const MultipleSelectField = (props) => {
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
      htmlFor={props.fieldId}
    >
      <div
        className={(`
          ${styles.label}
          ${labelVisibilityClass}
        `).trim()}
      >
        {props.label}
      </div>
      <div className={styles.inputContainer}>
        <select
          className={styles.input}
          disabled={props.disabled}
          id={props.fieldId}
          multiple
          onChange={props.changeHandler}
          required={props.required}
          value={props.value}
        >
          {
            props.options.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
        </select>
        {props.variant === 'filled' && (
          <div className={styles.bottomLine} />
        )}
      </div>
      {props.helperText && (
        <div className={styles.helperText}>
          {props.helperText}
        </div>
      )}
    </label>
  );
};

MultipleSelectField.defaultProps = {
  changeHandler: null,
  disabled: false,
  fullWidth: false,
  helperText: null,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  size: 'medium',
  validationState: null,
  value: [],
  variant: 'outline',
};

MultipleSelectField.propTypes = {
  changeHandler: PropTypes.func,
  disabled: PropTypes.bool,
  fieldId: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export default MultipleSelectField;
