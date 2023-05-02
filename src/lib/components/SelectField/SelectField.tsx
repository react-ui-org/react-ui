import React, { useContext } from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import styles from './SelectField.scss';
import {
  SelectFieldProps, OptionOfOption, OptionType,
} from './SelectField.types';
import { Option } from './_components/Option';

export const SelectField: React.FunctionComponent<SelectFieldProps> = React.forwardRef<HTMLSelectElement,
SelectFieldProps>(({
  disabled = false,
  fullWidth = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  options,
  required = false,
  size = 'medium',
  validationState,
  validationText,
  variant = 'outline',
  ...restProps
}: SelectFieldProps, ref) => {
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
        getRootSizeClassName(size, styles),
        getRootValidationStateClassName(validationState, styles),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
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
          <select
            {...transferProps(restProps)}
            className={styles.input}
            disabled={disabled}
            id={id}
            ref={ref}
            required={required}
          >
            {
              options.map((option: OptionType | OptionOfOption) => {
                if ('options' in option) {
                  return (
                    <optgroup
                      key={option.key ?? option.label}
                      label={option.label}
                    >
                      {option.options?.map(
                        (optgroupOption: OptionOfOption) => (
                          <Option
                            key={optgroupOption.key ?? optgroupOption.value} // TODO: find wheter it can be replaced by optgroupOption.key ?? optgroupOption.value ///// ${index}option
                            {...optgroupOption}
                            {...(id && { id: `${id}__item__${optgroupOption.key ?? optgroupOption.value}` })}
                          />
                        ),
                      )}
                    </optgroup>
                  );
                }
                if ('value' in option) {
                  return (
                    <Option
                      key={option.key ?? option.value}
                      {...option}
                      {...(id && { id: `${id}__item__${option.key ?? option.value}` })}
                    />
                  );
                }

                return null;
              })
      }
          </select>
          <div className={styles.caret}>
            <span className={styles.caretIcon} />
          </div>
          {variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
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

export const SelectFieldWithGlobalProps = withGlobalProps(SelectField, 'SelectField');

export default SelectFieldWithGlobalProps;
