import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { FormLayoutContext } from './FormLayoutContext';
import type { FormLayoutCustomFieldProps } from './FormLayoutCustomField.types';
import styles from './FormLayoutCustomField.module.scss';

const renderLabel = (
  id?: string,
  label?: string,
  labelForId?: string,
) => {
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
  children = null,
  fullWidth = false,
  id,
  disabled = false,
  innerFieldSize,
  label,
  labelForId,
  required = false,
  validationState,
  ...restProps
}) => {
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
        getRootSizeClassName(innerFieldSize, styles),
        getRootValidationStateClassName(validationState, styles),
      )}
      id={id}
    >
      {renderLabel(id, label, labelForId)}
      <div
        className={styles.field}
        id={id && `${id}__field`}
      >
        {children}
      </div>
    </div>
  );
};

export const FormLayoutCustomFieldWithGlobalProps = withGlobalProps(FormLayoutCustomField, 'FormLayoutCustomField');

export default FormLayoutCustomFieldWithGlobalProps;
