import PropTypes from 'prop-types';
import React from 'react';
import getRootSizeClassName from '../../../helpers/getRootSizeClassName';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './TextArea.scss';

export const TextArea = ({
  changeHandler,
  cols,
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
  inFormLayout,
  isLabelVisible,
  label,
  layout,
  placeholder,
  required,
  rows,
  size,
  validationState,
  validationText,
  value,
  variant,
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
      getRootSizeClassName(size, styles),
      getRootValidationStateClassName(validationState, styles),
      variant === 'filled' ? styles.rootVariantFilled : styles.rootVariantOutline,
    ].join(' ')}
    htmlFor={id}
    id={`${id}__label`}
  >
    <div
      className={[
        styles.label,
        isLabelVisible ? '' : styles.isLabelHidden,
      ].join(' ')}
      id={`${id}__labelText`}
    >
      {label}
    </div>
    <div className={styles.field}>
      <div className={styles.inputContainer}>
        <textarea
          {...transferProps(restProps)}
          className={styles.input}
          cols={cols}
          disabled={disabled}
          id={id}
          onChange={changeHandler}
          placeholder={placeholder}
          ref={forwardedRef}
          required={required}
          rows={rows}
          value={value}
        />
        {variant === 'filled' && (
          <div className={styles.bottomLine} />
        )}
      </div>
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
  </label>
);

TextArea.defaultProps = {
  changeHandler: null,
  cols: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  inFormLayout: false,
  isLabelVisible: true,
  layout: 'vertical',
  placeholder: null,
  required: false,
  rows: 3,
  size: 'medium',
  validationState: null,
  validationText: null,
  value: undefined,
  variant: 'outline',
};

TextArea.propTypes = {
  /**
   * Function to call when the input has changed.
   */
  changeHandler: PropTypes.func,
  /**
   * The number of visible text columns for the control.
   */
  cols: PropTypes.number,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `textarea` element.
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
   * `<ID>__label`, `<ID>__labelText`, and `<ID>__helpText`, and `<ID>__validationText`.
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
   * Text field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Layout of the field.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Optional example value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * The number of visible text lines for the control.
   */
  rows: PropTypes.number,
  /**
   * Size of the field.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
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
  value: PropTypes.string,
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export const TextAreaWithContext = withProviderContext(withForwardedRef(TextArea), 'TextArea');

export default TextAreaWithContext;
