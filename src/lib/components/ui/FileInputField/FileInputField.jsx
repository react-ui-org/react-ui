import PropTypes from 'prop-types';
import React from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './FileInputField.scss';

export const FileInputField = ({
  changeHandler,
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
  inFormLayout,
  isLabelVisible,
  label,
  layout,
  required,
  validationState,
  validationText,
  ...restProps
}) => (
  <label
    className={[
      styles.root,
      fullWidth ? styles.isRootFullWidth : '',
      inFormLayout ? styles.isRootInFormLayout : '',
      layout === 'horizontal' ? styles.rootLayoutHorizontal : styles.rootLayoutVertical,
      disabled ? styles.isRootDisabled : '',
      required ? styles.isRootRequired : '',
      getRootValidationStateClassName(validationState, styles),
    ].join(' ')}
    htmlFor={id}
    id={id && `${id}__label`}
  >
    <div
      className={[
        styles.label,
        isLabelVisible ? '' : styles.isLabelHidden,
      ].join(' ')}
      id={id && `${id}__labelText`}
    >
      {label}
    </div>
    <div className={styles.field}>
      <div className={styles.inputContainer}>
        <input
          {...transferProps(restProps)}
          className={styles.input}
          disabled={disabled}
          id={id}
          onChange={changeHandler}
          ref={forwardedRef}
          required={required}
          type="file"
        />
      </div>
      {helpText && (
        <div
          className={styles.helpText}
          id={id && `${id}__helpText`}
        >
          {helpText}
        </div>
      )}
      {validationText && (
        <div
          className={styles.validationText}
          id={id && `${id}__validationText`}
        >
          {validationText}
        </div>
      )}
    </div>
  </label>
);

FileInputField.defaultProps = {
  changeHandler: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  id: undefined,
  inFormLayout: false,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  validationState: null,
  validationText: null,
};

FileInputField.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `input` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the input HTML element. It also serves as a prefix for important inner elements:
   * `<ID>__label`, `<ID>__labelText`, `<ID>__helpText`, and `<ID>__validationText`.
   */
  id: PropTypes.string,
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
   * Text field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Layout of the field.
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
};

export const FileInputFieldWithContext = withForwardedRef(withProviderContext(FileInputField, 'FileInputField'));

export default FileInputFieldWithContext;
