import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { FileInputFieldProps } from './FileInputfield.types';
import styles from './FileInputField.module.scss';

export const FileInputField = React.forwardRef<HTMLInputElement, FileInputFieldProps>((props, ref) => {
  const {
    disabled = false,
    fullWidth = false,
    helpText = null,
    id,
    isLabelVisible = true,
    label,
    layout = 'vertical',
    required = false,
    validationState,
    validationText = null,
    ...restProps
  } = props;

  const context = useContext(FormLayoutContext);

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
        getRootValidationStateClassName(validationState, styles),
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
          <input
            {...transferProps(restProps)}
            disabled={disabled}
            id={id}
            ref={ref}
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
});

export const FileInputFieldWithGlobalProps = withGlobalProps(FileInputField, 'FileInputField');

export default FileInputFieldWithGlobalProps;
