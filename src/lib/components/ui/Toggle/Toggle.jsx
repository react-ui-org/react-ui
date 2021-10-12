import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import getRootValidationStateClassName from '../../../helpers/getRootValidationStateClassName';
import { withProviderContext } from '../../../provider';
import transferProps from '../../../utils/transferProps';
import { FormLayoutContext } from '../../layout/FormLayout';
import withForwardedRef from '../withForwardedRef';
import styles from './Toggle.scss';

export const Toggle = ({
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
        context ? styles.isRootInFormLayout : '',
        context?.layout === 'horizontal' ? styles.rootLayoutHorizontal : styles.rootLayoutVertical,
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
          name={id}
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

Toggle.defaultProps = {
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

Toggle.propTypes = {
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
