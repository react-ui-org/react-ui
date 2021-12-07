import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import withForwardedRef from '../withForwardedRef';
import styles from './Toggle.scss';

export const Toggle = ({
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
      className={classNames(
        styles.root,
        context && styles.isRootInFormLayout,
        context && context.layout === 'horizontal' ? styles.rootLayoutHorizontal : styles.rootLayoutVertical,
        labelPosition === 'before' && styles.hasRootLabelBefore,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootValidationStateClassName(validationState, styles),
      )}
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
          name={id}
          ref={forwardedRef}
          required={required}
          type="checkbox"
          value={value}
        />
        <div
          className={classNames(
            styles.label,
            !isLabelVisible && styles.isLabelHidden,
          )}
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

Toggle.defaultProps = {
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

Toggle.propTypes = {
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
    * ID of the input HTML element. It also serves as a prefix for nested elements:
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
   * Toggle label.
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

export const ToggleWithContext = withForwardedRef(withProviderContext(Toggle, 'Toggle'));

export default ToggleWithContext;
