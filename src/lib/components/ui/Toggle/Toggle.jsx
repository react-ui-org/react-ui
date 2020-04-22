import PropTypes from 'prop-types';
import React from 'react';
import withForwardedRef from '../withForwardedRef';
import styles from './Toggle.scss';

export const Toggle = (props) => {
  let labelVisibilityClass = '';
  let labelPositionClass = '';
  let rootValidationStateClass = '';

  if (!props.isLabelVisible) {
    labelVisibilityClass = styles.isLabelHidden;
  }

  if (props.labelPosition === 'before') {
    labelPositionClass = styles.labelPositionBefore;
  } else if (props.labelPosition === 'after') {
    labelPositionClass = styles.labelPositionAfter;
  }

  if (props.validationState === 'invalid') {
    rootValidationStateClass = styles.isRootStateInvalid;
  } else if (props.validationState === 'valid') {
    rootValidationStateClass = styles.isRootStateValid;
  } else if (props.validationState === 'warning') {
    rootValidationStateClass = styles.isRootStateWarning;
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${labelPositionClass}
        ${rootValidationStateClass}
      `).trim()}
    >
      <label htmlFor={props.id} className={styles.inputWrap}>
        <input
          {...props.htmlElementAttributes}
          id={props.id}
          name={props.id}
          value={props.value}
          onChange={props.changeHandler}
          disabled={props.disabled}
          checked={props.checked}
          ref={props.forwardedRef}
          required={props.required}
          type="checkbox"
          className={styles.input}
        />
        <span className={styles.label}>
          <span
            className={(`
              ${styles.labelInner}
              ${labelVisibilityClass}
            `).trim()}
            id={`${props.id}__label`}
          >
            {props.label}
          </span>
        </span>
        <span className={styles.toggle} />
      </label>
      {props.description && (
        <div
          className={styles.description}
          id={`${props.id}__descriptionText`}
        >
          {props.description}
        </div>
      )}
      {props.error && (
        <div
          className={styles.error}
          id={`${props.id}__errorText`}
        >
          {props.error}
        </div>
      )}
    </div>
  );
};

Toggle.defaultProps = {
  changeHandler: null,
  checked: false,
  description: null,
  disabled: false,
  error: null,
  forwardedRef: undefined,
  htmlElementAttributes: {},
  isLabelVisible: true,
  labelPosition: 'after',
  required: false,
  validationState: null,
  value: undefined,
};

Toggle.propTypes = {
  changeHandler: PropTypes.func,
  checked: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  forwardedRef: PropTypes.func,
  htmlElementAttributes: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.oneOf(['before', 'after']),
  required: PropTypes.bool,
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withForwardedRef(Toggle);
