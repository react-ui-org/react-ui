import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './Toggle.scss';

export const Toggle = (props) => {
  let labelVisibilityClass = '';
  let labelPositionClass = '';
  let rootInFormLayoutClass = '';
  let rootLayoutClass = '';
  let rootValidationStateClass = '';

  if (!props.isLabelVisible) {
    labelVisibilityClass = styles.isLabelHidden;
  }

  if (props.labelPosition === 'before') {
    labelPositionClass = styles.labelPositionBefore;
  } else if (props.labelPosition === 'after') {
    labelPositionClass = styles.labelPositionAfter;
  }

  if (props.inFormLayout) {
    rootInFormLayoutClass = styles.isRootInFormLayout;
  }

  if (props.layout === 'horizontal') {
    rootLayoutClass = styles.isRootLayoutHorizontal;
  }

  if (props.validationState === 'invalid') {
    rootValidationStateClass = styles.isRootStateInvalid;
  } else if (props.validationState === 'valid') {
    rootValidationStateClass = styles.isRootStateValid;
  } else if (props.validationState === 'warning') {
    rootValidationStateClass = styles.isRootStateWarning;
  }

  const propsToTransfer = transferProps(
    props,
    ['changeHandler', 'checked', 'description', 'disabled', 'error', 'id', 'inFormLayout', 'isLabelVisible',
      'label', 'labelPosition', 'layout', 'required', 'validationState', 'value'],
  );

  return (
    <div
      className={(`
        ${styles.root}
        ${labelPositionClass}
        ${rootInFormLayoutClass}
        ${rootLayoutClass}
        ${rootValidationStateClass}
      `).trim()}
    >
      <label
        className={styles.inputWrap}
        htmlFor={props.id}
        id={`${props.id}__label`}
      >
        <input
          {...propsToTransfer}
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
            id={`${props.id}__labelText`}
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
  inFormLayout: false,
  isLabelVisible: true,
  labelPosition: 'after',
  layout: 'vertical',
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
  id: PropTypes.string.isRequired,
  inFormLayout: PropTypes.bool,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.oneOf(['before', 'after']),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  required: PropTypes.bool,
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withForwardedRef(Toggle);
