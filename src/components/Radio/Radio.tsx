import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { RadioProps } from './Radio.types';
import styles from './Radio.module.scss';

export const Radio: React.FunctionComponent<RadioProps> = ({
  disabled = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  options,
  renderAsRequired = false,
  required = false,
  validationState,
  validationText,
  value,
  ...restProps
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <fieldset
      className={classNames(
        styles.root,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        (renderAsRequired || required) && styles.isRootRequired,
        getRootValidationStateClassName(validationState, styles),
      )}
      disabled={disabled}
      id={id}
    >
      <legend
        className={styles.legend}
        id={id && `${id}__label`}
      >
        {label}
      </legend>
      {isLabelVisible && (
        <div
          aria-hidden
          className={styles.label}
          id={id && `${id}__displayLabel`}
        >
          {label}
        </div>
      )}
      <div className={styles.field}>
        <div className={styles.options}>
          {
            options.map((option) => {
              const key = option.key ?? option.value;
              return (
                <label
                  className={styles.option}
                  htmlFor={id && `${id}__item__${key}`}
                  id={id && `${id}__item__${key}__label`}
                  key={key}
                >
                  <input
                    {...transferProps(restProps)}
                    checked={restProps?.onChange
                      ? (value === option.value) || false
                      : undefined}
                    className={styles.input}
                    disabled={disabled || option.disabled}
                    id={id && `${id}__item__${key}`}
                    name={id}
                    type="radio"
                    value={option.value}
                  />
                  <span
                    className={styles.optionLabel}
                    id={id && `${id}__item__${key}__labelText`}
                  >
                    { option.label }
                  </span>
                </label>
              );
            })
          }
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
    </fieldset>
  );
};

export const RadioWithGlobalProps = withGlobalProps(Radio, 'Radio');

export default RadioWithGlobalProps;
