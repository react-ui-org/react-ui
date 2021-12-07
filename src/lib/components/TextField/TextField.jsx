import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import withForwardedRef from '../withForwardedRef';
import styles from './TextField.scss';

const SMALL_INPUT_SIZE = 10;

export const TextField = ({
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
  inputSize,
  isLabelVisible,
  label,
  layout,
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
  const context = useContext(FormLayoutContext);
  const hasSmallInput = (inputSize !== null) && (inputSize <= SMALL_INPUT_SIZE);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        hasSmallInput && styles.hasRootSmallInput,
        inputSize && styles.hasRootCustomInputSize,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.rootLayoutHorizontal
          : styles.rootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(size, styles),
        getRootValidationStateClassName(validationState, styles),
        variant === 'filled' ? styles.rootVariantFilled : styles.rootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
      {...(inputSize ? { style: { '--rui-custom-input-size': inputSize } } : {})}
    >
      <div
        className={classNames(
          styles.label,
          !isLabelVisible && styles.isLabelHidden,
        )}
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
};

TextField.defaultProps = {
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  id: undefined,
  inputSize: null,
  isLabelVisible: true,
  layout: 'vertical',
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
   * ID of the input HTML element. It also serves as a prefix for nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id: PropTypes.string,
  /**
   * Treat the field differently when it's inside a FormLayout. Do not set manually!
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
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
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

export const TextFieldWithContext = withForwardedRef(withProviderContext(TextField, 'TextField'));

export default TextFieldWithContext;
