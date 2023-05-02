import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import styles from './TextField.scss';
import { TextFieldProps } from './TextField.types';

const SMALL_INPUT_SIZE = 10;

export const TextField: React.FunctionComponent<TextFieldProps> = React.forwardRef<HTMLInputElement, TextFieldProps>(({
  disabled = false,
  fullWidth = false,
  helpText,
  id,
  inputSize,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  required = false,
  size = 'medium',
  type = 'text',
  validationState,
  validationText,
  variant = 'outline',
  ...restProps
}, ref) => {
  const context = React.useContext(FormLayoutContext);
  const hasSmallInput = inputSize && (inputSize <= SMALL_INPUT_SIZE);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        hasSmallInput && styles.hasRootSmallInput,
        inputSize && styles.hasRootCustomInputSize,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(size, styles),
        getRootValidationStateClassName(validationState, styles),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
      {...(inputSize ? { style: { '--rui-custom-input-size': inputSize } as React.CSSProperties } : {})}
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
            ref={ref}
            required={required}
            size={type !== 'number' ? inputSize : undefined}
            type={type}
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
});

export const TextFieldWithGlobalProps = withGlobalProps(TextField, 'TextField');

export default TextFieldWithGlobalProps;
