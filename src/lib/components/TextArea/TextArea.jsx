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
import styles from './TextArea.scss';

export const TextArea = ({
  cols,
  disabled,
  forwardedRef,
  fullWidth,
  helpText,
  id,
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
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
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
          <textarea
            {...transferProps(restProps)}
            className={styles.input}
            cols={cols}
            disabled={disabled}
            id={id}
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

TextArea.defaultProps = {
  cols: null,
  disabled: false,
  forwardedRef: undefined,
  fullWidth: false,
  helpText: null,
  id: undefined,
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
  /** ID of the input HTML element. It also serves as a prefix for nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id: PropTypes.string,
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

export const TextAreaWithContext = withForwardedRef(withProviderContext(TextArea, 'TextArea'));

export default TextAreaWithContext;
