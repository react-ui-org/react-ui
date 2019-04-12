import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextField.scss';

const TextField = (props) => {
  let labelVisibilityClass = '';
  let rootFullWidthClass = '';
  let rootLayoutClass = '';
  let rootRequiredClass = '';
  let rootStateClass = '';
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

  if (props.state === 'invalid') {
    rootStateClass = styles.isRootStateInvalid;
  } else if (props.state === 'valid') {
    rootStateClass = styles.isRootStateValid;
  } else if (props.state === 'warning') {
    rootStateClass = styles.isRootStateWarning;
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
        ${rootStateClass}
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
          <input
            className={styles.input}
            disabled={props.disabled}
            id={props.fieldId}
            onChange={props.changeHandler}
            placeholder={props.placeholder}
            required={props.required}
            size={props.size}
            type={props.type}
            value={props.value}
          />
          {props.variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
        </div>
      </label>
      {props.feedback && (
        <div className={styles.feedback}>
          {props.feedback}
        </div>
      )}
      {props.description && (
        <div className={styles.description}>
          {props.description}
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  changeHandler: null,
  description: null,
  disabled: false,
  feedback: null,
  fullWidth: false,
  isLabelVisible: true,
  layout: 'vertical',
  placeholder: null,
  required: false,
  size: null,
  state: null,
  type: 'text',
  value: undefined,
  variant: 'outline',
};

TextField.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  feedback: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.number,
  state: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export default TextField;
