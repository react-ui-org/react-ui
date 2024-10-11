import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { FormLayoutContext } from '../FormLayout';
import styles from './CheckboxField.module.scss';

export const CheckboxField = React.forwardRef((props, ref) => {
  const {
    disabled,
    helpText,
    id,
    isLabelVisible,
    label,
    labelPosition,
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
        context && styles.isRootInFormLayout,
        context && context.layout === 'horizontal' ? styles.isRootLayoutHorizontal : styles.isRootLayoutVertical,
        labelPosition === 'before' && styles.hasRootLabelBefore,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootValidationStateClassName(validationState, styles),
      )}
      htmlFor={id}
      id={id && `${id}__label`}
    >
      <div className={styles.field}>
        <div
          className={classNames(
            styles.label,
            !isLabelVisible && styles.isLabelHidden,
          )}
          id={id && `${id}__labelText`}
        >
          {label}
        </div>
        <input
          {...transferProps(restProps)}
          className={styles.input}
          disabled={disabled}
          id={id}
          ref={ref}
          required={required}
          type="checkbox"
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
    </label>
  );
});

CheckboxField.defaultProps = {
  disabled: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  labelPosition: 'after',
  required: false,
  validationState: null,
  validationText: null,
};

CheckboxField.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
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
   * Checkbox field label.
   */
  label: PropTypes.node.isRequired,
  /**
   * Placement of the label relative to the input.
   */
  labelPosition: PropTypes.oneOf(['before', 'after']),
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

export const CheckboxFieldWithGlobalProps = withGlobalProps(CheckboxField, 'CheckboxField');

export default CheckboxFieldWithGlobalProps;
