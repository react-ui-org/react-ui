import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import styles from './FileInputField.module.scss';

export const FileInputField = React.forwardRef((props, ref) => {
  const {
    disabled,
    fullWidth,
    helpText,
    id,
    isLabelVisible,
    label,
    layout,
    required,
    validationState,
    validationText,
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

FileInputField.defaultProps = {
  disabled: false,
  fullWidth: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  validationState: null,
  validationText: null,
};

FileInputField.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the `<input>` HTML element.
   *
   * Also serves as base for ids of nested elements:
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
   * File input field label.
   */
  label: PropTypes.node.isRequired,
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   *
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  /**
   * Validation message to be displayed.
   */
  validationText: PropTypes.node,
};

export const FileInputFieldWithGlobalProps = withGlobalProps(FileInputField, 'FileInputField');

export default FileInputFieldWithGlobalProps;
