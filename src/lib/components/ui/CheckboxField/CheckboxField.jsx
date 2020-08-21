import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './CheckboxField.scss';

export const CheckboxField = (props) => {
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
      className={`
        ${styles.root}
        ${rootInFormLayoutClass}
        ${rootLayoutClass}
        ${rootValidationStateClass}
      `.trim()}
    >
      <label
        className={(`
          ${styles.inputWrap}
          ${labelPositionClass}
        `).trim()}
        htmlFor={props.id}
        id={`${props.id}__label`}
      >
        <input
          {...propsToTransfer}
          id={props.id}
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

CheckboxField.defaultProps = {
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

CheckboxField.propTypes = {
  /**
   * Function to call when the input is toggled.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be checked.
   */
  checked: PropTypes.bool,
  /**
   * Optional description.
   */
  description: PropTypes.string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Error message to be displayed.
   */
  error: PropTypes.string,
  /**
   * Reference forwarded to the `input` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * ID of the input HTML element. It also serves as a prefix for important inner elements:
   * `<ID>__label`, `<ID>__labelText`, `<ID>__descriptionText`, and `<ID>__errorText`.
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
   * Checkbox field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Placement of the label relative to the input.
   */
  labelPosition: PropTypes.oneOf(['before', 'after']),
  /**
   * Layout of the field. It has impact only on CheckboxField inside a FormLayout.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
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
};

export default withForwardedRef(CheckboxField);
