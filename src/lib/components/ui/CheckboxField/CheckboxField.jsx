import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import { FormLayoutContext } from '../../layout/FormLayout';
import withForwardedRef from '../withForwardedRef';
import styles from './CheckboxField.scss';

export const CheckboxField = ({
  changeHandler,
  checked,
  disabled,
  forwardedRef,
  helpText,
  id,
  isLabelVisible,
  label,
  labelPosition,
  required,
  validationState,
  validationText,
  value,
  ...restProps
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <label
      className={[
        styles.root,
        context.layout ? styles.isRootInFormLayout : '',
        context.layout === 'horizontal' ? styles.rootLayoutHorizontal : styles.rootLayoutVertical,
        labelPosition === 'before' ? styles.hasRootLabelBefore : '',
        disabled ? styles.isRootDisabled : '',
        required ? styles.isRootRequired : '',
        getRootValidationStateClassName(validationState, styles),
      ].join(' ')}
      htmlFor={id}
      id={id && `${id}__label`}
    >
      <div className={styles.field}>
        <input
          {...transferProps(restProps)}
          checked={checked}
          className={styles.input}
          disabled={disabled}
          id={id}
          onChange={changeHandler}
          ref={forwardedRef}
          required={required}
          type="checkbox"
          value={value}
        />
        <div
          className={[
            styles.label,
            isLabelVisible ? '' : styles.isLabelHidden,
          ].join(' ')}
          id={id && `${id}__labelText`}
        >
          {label}
        </div>
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
};

CheckboxField.defaultProps = {
  changeHandler: null,
  checked: undefined,
  disabled: false,
  forwardedRef: undefined,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  labelPosition: 'after',
  required: false,
  validationState: null,
  validationText: null,
  value: undefined,
};

CheckboxField.propTypes = {
  /**
   * Function to call when the input is toggled.
   */
  changeHandler: PropTypes.func,
  /**
   * If `true`, the input will be checked.
   */
  checked: PropTypes.bool,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `input` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
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
  label: PropTypes.string.isRequired,
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
  /**
   * Value of the input.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export const CheckboxFieldWithContext = withForwardedRef(withProviderContext(CheckboxField, 'CheckboxField'));

export default CheckboxFieldWithContext;
