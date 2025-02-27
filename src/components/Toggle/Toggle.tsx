import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { FormLayoutContext } from '../FormLayout';
import styles from './Toggle.module.scss';

export const Toggle = React.forwardRef((props, ref) => {
  const {
    disabled,
    helpText,
    id,
    isLabelVisible,
    label,
    labelPosition,
    renderAsRequired,
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
        (required || renderAsRequired) && styles.isRootRequired,
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
          name={id}
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

Toggle.defaultProps = {
  disabled: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  labelPosition: 'after',
  renderAsRequired: false,
  required: false,
  validationState: null,
  validationText: null,
};

Toggle.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
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
  label: PropTypes.node.isRequired,
  /**
   * Placement of the label relative to the input.
   */
  labelPosition: PropTypes.oneOf(['before', 'after']),
  /**
   * If `true`, the input will be rendered as if it was required.
   */
  renderAsRequired: PropTypes.bool,
  /**
   * If `true`, the input will be made and rendered as required, regardless of the `renderAsRequired` prop.
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

export const ToggleWithGlobalProps = withGlobalProps(Toggle, 'Toggle');

export default ToggleWithGlobalProps;
