import React, { useContext } from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { FormLayoutContext } from './FormLayoutContext';
import styles from './FormLayoutCustomField.scss';
import { FormLayoutCustomFieldProps } from './FormLayout.types';

const renderLabel = (id: FormLayoutCustomFieldProps['id'], label: FormLayoutCustomFieldProps['label'], labelForId: FormLayoutCustomFieldProps['labelForId']) => {
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
  disabled = false,
  fullWidth = false,
  id,
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
