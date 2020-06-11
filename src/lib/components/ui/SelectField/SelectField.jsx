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
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  options: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export default withForwardedRef(SelectField);
