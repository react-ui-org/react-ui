import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { FormLayoutCustomFieldContext } from '../FormLayout/FormLayoutCustomFieldContext';
import { InputGroupContext } from '../InputGroup/InputGroupContext';
import { Option } from './_components/Option';
import styles from './SelectField.module.scss';
import type {
  SelectFieldOption,
  SelectFieldOptionGroup,
  SelectFieldProps,
} from './SelectField.types';

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(({
  disabled = false,
  fullWidth = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  options,
  renderAsRequired = false,
  required = false,
  size = 'medium',
  validationState,
  validationText,
  variant = 'outline',
  ...restProps
}, ref) => {
  const formLayoutContext = useContext(FormLayoutContext);
  const formLayoutCustomFieldContext = useContext(FormLayoutCustomFieldContext);
  const inputGroupContext = useContext(InputGroupContext);

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled) && styles.isRootDisabled,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        inputGroupContext && styles.isRootGrouped,
        (renderAsRequired || required) && styles.isRootRequired,
        getRootSizeClassName(
          styles,
          resolveContextOrProp(inputGroupContext && inputGroupContext.size, size),
        ),
        getRootValidationStateClassName(styles, validationState),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
    >
      <div
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext || formLayoutCustomFieldContext) && styles.isLabelHidden,
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
            disabled={resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled)}
            id={id}
            ref={ref}
            required={required}
          >
            {
              (options as (SelectFieldOption | SelectFieldOptionGroup)[]).map((option) => {
                if ('options' in option) {
                  return (
                    <optgroup
                      key={option.key ?? option.label}
                      label={option.label}
                    >
                      {option.options.map((optgroupOption) => (
                        <Option
                          key={optgroupOption.key ?? optgroupOption.value}
                          {...optgroupOption}
                          {...(id && { id: `${id}__item__${optgroupOption.key ?? optgroupOption.value}` })}
                        />
                      ))}
                    </optgroup>
                  );
                }
                return (
                  <Option
                    key={option.key ?? option.value}
                    {...option}
                    {...(id && { id: `${id}__item__${option.key ?? option.value}` })}
                  />
                );
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
        {(helpText && !inputGroupContext) && (
          <div
            className={styles.helpText}
            id={id && `${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {(validationText && !inputGroupContext) && (
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

export const SelectFieldWithGlobalProps = withGlobalProps<SelectFieldProps, HTMLSelectElement>(SelectField, 'SelectField');

export default SelectFieldWithGlobalProps;
