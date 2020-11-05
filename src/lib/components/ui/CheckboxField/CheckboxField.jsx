import PropTypes from 'prop-types';
import React from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './CheckboxField.scss';

export const CheckboxField = (props) => {
  const {
    changeHandler,
    checked,
    disabled,
    forwardedRef,
    helpText,
    id,
    inFormLayout,
    isLabelVisible,
    label,
    labelPosition,
    layout,
    required,
    validationState,
    validationText,
    value,
  } = props;

  const propsToTransfer = transferProps(
    props,
    ['changeHandler', 'checked', 'disabled', 'helpText', 'id', 'inFormLayout', 'isLabelVisible',
      'label', 'labelPosition', 'layout', 'required', 'validationState', 'validationText', 'value'],
  );

  return (
    <div
      className={[
        styles.root,
        inFormLayout ? styles.isRootInFormLayout : '',
        layout === 'horizontal' ? styles.isRootLayoutHorizontal : '',
        getRootValidationStateClassName(validationState, styles),
      ].join(' ')}
    >
      <label
        className={[
          styles.inputWrap,
          labelPosition === 'before' ? styles.labelPositionBefore : styles.labelPositionAfter,
        ].join(' ')}
        htmlFor={id}
        id={`${id}__label`}
      >
        <input
          {...propsToTransfer}
          id={id}
          value={value}
          onChange={changeHandler}
          disabled={disabled}
          checked={checked}
          ref={forwardedRef}
          required={required}
          type="checkbox"
          className={styles.input}
        />
        <span className={styles.label}>
          <span
            className={[
              styles.labelInner,
              isLabelVisible ? '' : styles.isLabelHidden,
            ].join(' ')}
            id={`${id}__labelText`}
          >
            {label}
          </span>
        </span>
      </label>
      {helpText && (
        <div
          className={styles.helpText}
          id={`${id}__helpText`}
        >
          {helpText}
        </div>
      )}
      {validationText && (
        <div
          className={styles.validationText}
          id={`${id}__validationText`}
        >
          {validationText}
        </div>
      )}
    </div>
  );
};

CheckboxField.defaultProps = {
  changeHandler: null,
  checked: false,
  disabled: false,
  forwardedRef: undefined,
  helpText: null,
  inFormLayout: false,
  isLabelVisible: true,
  labelPosition: 'after',
  layout: 'vertical',
  required: false,
  validationState: null,
  validationText: null,
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
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the input HTML element. It also serves as a prefix for important inner elements:
   * `<ID>__label`, `<ID>__labelText`, `<ID>__helpText`, and `<ID>__validationText`.
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
   * Validation message to be displayed.
   */
  validationText: PropTypes.node,
  /**
   * Value of the input.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withForwardedRef(CheckboxField);
