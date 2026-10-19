import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { FormLayoutContext } from './FormLayoutContext';
import { FormLayoutCustomFieldContext } from './FormLayoutCustomFieldContext';
import styles from './FormLayoutCustomField.module.scss';
import type { FormLayoutCustomFieldProps } from './FormLayoutCustomField.types';

const renderLabel = (id: string | undefined, label: string | undefined, labelForId: string | undefined) => {
  if (labelForId && label) {
    return (
      <label
        className={styles.label}
        htmlFor={labelForId}
        id={id && `${id}__label`}
      >
        {label}
      </label>
    );
  }

  if (label) {
    return (
      <div
        className={styles.label}
        id={id && `${id}__label`}
      >
        {label}
      </div>
    );
  }

  return null;
};

export const FormLayoutCustomField: React.FunctionComponent<FormLayoutCustomFieldProps> = ({
  children,
  fullWidth = false,
  id,
  disabled = false,
  innerFieldSize,
  label,
  labelForId,
  required = false,
  validationState,
  ...restProps
}: FormLayoutCustomFieldProps) => {
  const context = useContext(FormLayoutContext);

  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        context && context.layout === 'horizontal' ? styles.isRootLayoutHorizontal : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(styles, innerFieldSize),
        getRootValidationStateClassName(styles, validationState),
      )}
      id={id}
    >
      {renderLabel(id, label, labelForId)}
      <div
        className={styles.field}
        id={id && `${id}__field`}
      >
        <FormLayoutCustomFieldContext.Provider value>
          {children}
        </FormLayoutCustomFieldContext.Provider>
      </div>
    </div>
  );
};

export const FormLayoutCustomFieldWithGlobalProps = withGlobalProps<FormLayoutCustomFieldProps, never>(FormLayoutCustomField, 'FormLayoutCustomField');

export default FormLayoutCustomFieldWithGlobalProps;
