import React, { useContext } from 'react';
import type { CSSProperties } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../FormLayout/FormLayoutCustomFieldContext';
import { InputGroupContext } from '../InputGroup/InputGroupContext';
import styles from './TextField.module.scss';
import type { TextFieldProps } from './TextField.types';

const SMALL_INPUT_SIZE = 10;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({
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
  const formLayoutContext = useContext(FormLayoutContext);
  const formLayoutCustomFieldContext = useContext(FormLayoutCustomFieldContext);
  const inputGroupContext = useContext(InputGroupContext);
  const hasSmallInput = (inputSize !== undefined) && (inputSize <= SMALL_INPUT_SIZE);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        hasSmallInput && styles.hasRootSmallInput,
        inputSize && styles.hasRootCustomInputSize,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled) && styles.isRootDisabled,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        inputGroupContext && styles.isRootGrouped,
        required && styles.isRootRequired,
        getRootSizeClassName(
          styles,
          resolveContextOrProp(inputGroupContext && inputGroupContext.size, size),
        ),
        getRootValidationStateClassName(styles, validationState),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
      {...(inputSize ? { style: { '--rui-custom-input-size': inputSize } as CSSProperties } : {})}
    >
      <div
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext || formLayoutCustomFieldContext) && styles.isLabelHidden,
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
            disabled={resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled)}
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
        {(helpText && !inputGroupContext) && (
          <div
            className={styles.helpText}
            id={id && `${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {(validationText && !inputGroupContext) && (
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

export const TextFieldWithGlobalProps = withGlobalProps<TextFieldProps, HTMLInputElement>(TextField, 'TextField');

export default TextFieldWithGlobalProps;
