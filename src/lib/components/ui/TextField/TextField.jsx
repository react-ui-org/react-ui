import PropTypes from 'prop-types';
import React from 'react';
import getRootSizeClassName from '../../../helpers/getRootSizeClassName';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import getCustomInputSizeByType from './helpers/getCustomInputSizeByType';
import styles from './TextField.scss';

const SMALL_INPUT_SIZE = 10;

export const TextField = ({
  changeHandler,
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
  inFormLayout,
  inputSize,
  isLabelVisible,
  label,
  layout,
  max,
  placeholder,
  required,
  size,
  type,
  validationState,
  validationText,
  value,
  variant,
  ...restProps
}) => {
  const customInputSize = getCustomInputSizeByType(type, inputSize, max);
  const hasSmallInput = (customInputSize !== null) && (customInputSize <= SMALL_INPUT_SIZE);

  return (
    <label
      className={[
        styles.root,
        fullWidth ? styles.isRootFullWidth : '',
        hasSmallInput ? styles.hasRootSmallInput : '',
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
      style={customInputSize ? { '--rui-custom-input-size': customInputSize } : {}}
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
          <input
            {...transferProps(restProps)}
            className={styles.input}
            disabled={disabled}
            id={id}
            max={type === 'number' ? max : null}
            onChange={changeHandler}
            placeholder={placeholder}
            ref={forwardedRef}
            required={required}
            size={type !== 'number' ? inputSize : null}
            type={type}
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
};

TextField.defaultProps = {
  changeHandler: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  inFormLayout: false,
  inputSize: null,
  isLabelVisible: true,
  layout: 'vertical',
  max: null,
  placeholder: null,
  required: false,
  size: 'medium',
  type: 'text',
  validationState: null,
  validationText: null,
  value: undefined,
  variant: 'outline',
};

TextField.propTypes = {
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
  id: PropTypes.string.isRequired,
  /**
   * Treat the field differently when it's inside a FormLayout. Do not set manually!
   */
  inFormLayout: PropTypes.bool,
  /**
   * Width of the input field, translated as `size` attribute of the input.
   */
  inputSize: PropTypes.number,
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
   * The maximum value for number input types.
   */
  max: PropTypes.number,
  /**
   * Optional example value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Size of the field.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * HTML input type, translated as `type` attribute of the input.
   */
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
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
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export const TextFieldWithContext = withProviderContext(withForwardedRef(TextField), 'TextField');

export default TextFieldWithContext;
