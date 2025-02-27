import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { FormLayoutContext } from '../FormLayout';
import { ToggleProps } from './Toggle.types';
import styles from './Toggle.module.scss';

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    disabled = false,
    helpText,
    id,
    isLabelVisible = true,
    label,
    labelPosition = 'after',
    renderAsRequired = false,
    required = false,
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

export const ToggleWithGlobalProps = withGlobalProps(Toggle, 'Toggle');

export default ToggleWithGlobalProps;
