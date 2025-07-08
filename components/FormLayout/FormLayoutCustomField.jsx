import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { FormLayoutContext } from './FormLayoutContext';
import styles from './FormLayoutCustomField.module.scss';

const renderLabel = (id, label, labelForId) => {
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

export const FormLayoutCustomField = ({
  children,
  fullWidth,
  id,
  disabled,
  innerFieldSize,
  label,
  labelForId,
  required,
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

FormLayoutCustomField.defaultProps = {
  children: null,
  disabled: false,
  fullWidth: false,
  id: undefined,
  innerFieldSize: null,
  label: null,
  labelForId: undefined,
  required: false,
  validationState: null,
};

FormLayoutCustomField.propTypes = {
  /**
   * Custom HTML or React component(s). If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * If `true`, label will be shown as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__field`
   * * `<ID>__label`
   */
  id: PropTypes.string,
  /**
   * Size of contained form field used to properly align label.
   */
  innerFieldSize: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Optional label of the field.
   */
  label: PropTypes.string,
  /**
   * Optional ID of labeled field to keep accessibility features. Only available if `label` is set.
   */
  labelForId: PropTypes.string,
  /**
   * If `true`, label will be styled as required.
   */
  required: PropTypes.bool,
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
};

export const FormLayoutCustomFieldWithGlobalProps = withGlobalProps(FormLayoutCustomField, 'FormLayoutCustomField');

export default FormLayoutCustomFieldWithGlobalProps;
