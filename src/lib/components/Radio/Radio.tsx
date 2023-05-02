import React, { useContext } from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import styles from './Radio.scss';
import { RadioProps } from './Radio.types';

export const Radio: React.FunctionComponent<RadioProps> = ({
  disabled = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  options,
  required = false,
  validationState,
  validationText,
  value,
  ...restProps
}) => {
  const context = useContext(FormLayoutContext);

  return (
    <div
      className={classNames(
        styles.root,
        context && styles.isRootInFormLayout,
        resolveContextOrProp(context && context.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootValidationStateClassName(validationState, styles),
      )}
      id={id}
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
        <ul className={styles.list}>
          {
            options.map((option) => {
              const key = option.key ?? option.value;
              return (
                <li key={key}>
                  <label
                    className={styles.option}
                    htmlFor={id && `${id}__item__${key}`}
                    id={id && `${id}__item__${key}__label`}
                  >
                    <input
                      {...transferProps(restProps)}
                      checked={Object.prototype.hasOwnProperty.call(restProps, 'onChange')
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
                      {option.label}
                    </span>
                  </label>
                </li>
              );
            })
          }
        </ul>
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
    </div>
  );
};

export const RadioWithGlobalProps = withGlobalProps(Radio, 'Radio');

export default RadioWithGlobalProps;
