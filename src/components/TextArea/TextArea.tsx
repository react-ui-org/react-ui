import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../FormLayout/FormLayoutCustomFieldContext';
import styles from './TextArea.module.scss';
import type { TextAreaProps } from './TextArea.types';

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  disabled = false,
  fullWidth = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  required = false,
  size = 'medium',
  validationState,
  validationText,
  variant = 'outline',
  ...restProps
}, ref) => {
  const context = useContext(FormLayoutContext);
  const formLayoutCustomFieldContext = useContext(FormLayoutCustomFieldContext);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(styles, size),
        getRootValidationStateClassName(styles, validationState),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
    >
      <div
        className={classNames(
          styles.label,
          (!isLabelVisible || formLayoutCustomFieldContext) && styles.isLabelHidden,
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
            disabled={disabled}
            id={id}
            ref={ref}
            required={required}
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

export const TextAreaWithGlobalProps = withGlobalProps<TextAreaProps, HTMLTextAreaElement>(TextArea, 'TextArea');

export default TextAreaWithGlobalProps;
