import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { FormLayoutContext } from './FormLayoutContext';
import styles from './FormLayoutCustomField.scss';

const renderLabel = (id, label, labelForId) => {
  if (labelForId && label) {
    return (
      <label
        htmlFor={labelForId}
        id={id && `${id}__label`}
        className={styles.label}
      >
        {label}
      </label>
    );
  }

  if (label) {
    return (
      <div
        id={id && `${id}__label`}
        className={styles.label}
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
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <div
      id={id}
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        context && context.layout === 'horizontal' ? styles.rootLayoutHorizontal : styles.rootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(innerFieldSize, styles),
        getRootValidationStateClassName(validationState, styles),
      )}
    >
      {renderLabel(id, label, labelForId)}
      <div
        id={id && `${id}__field`}
        className={styles.field}
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
   * Custom HTML or React component(s).
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

export const FormLayoutCustomFieldWithContext = withProviderContext(FormLayoutCustomField, 'FormLayoutCustomField');

export default FormLayoutCustomFieldWithContext;
