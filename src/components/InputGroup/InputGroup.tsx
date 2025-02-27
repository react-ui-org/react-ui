import React, {
  useContext,
  useMemo,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { Text } from '../Text';
import { Validation } from '../../types';
import {
  defaultValues,
  InputGroupContext,
} from './InputGroupContext';
import styles from './InputGroup.module.scss';
import { InputGroupProps } from './InputGroup.types';

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  children,
  disabled = defaultValues.disabled,
  id,
  isLabelVisible = true,
  label,
  layout = defaultValues.layout,
  required = false,
  size = defaultValues.size,
  validationTexts,
  ...restProps
}) => {
  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContextValue = useMemo(() => ({
    disabled,
    layout,
    size,
  }), [disabled, layout, size]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  const childrenWithValidationState = children as unknown as React.Component<{ validationState?: Validation }>[];
  const validationState = childrenWithValidationState?.reduce<Validation | undefined>(
    (state, child) => {
      if (state === 'invalid' || (state === 'warning' && child.props.validationState === 'valid')) {
        return state as Validation;
      }
      return (child.props.validationState ?? state) as Validation;
    },
    undefined,
  );

  return (
    <fieldset
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        disabled && styles.isRootDisabled,
        required && styles.isRootRequired,
        getRootSizeClassName(size, styles),
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
        <div
          className={styles.inputGroup}
          id={id && `${id}__group`}
        >
          <InputGroupContext.Provider value={inputGroupContextValue}>
            {children}
          </InputGroupContext.Provider>
        </div>
        {validationTexts && (
          <ul
            className={styles.validationText}
            id={id && `${id}__validationTexts`}
          >
            {validationTexts.map((validationText) => (
              <li key={validationText as React.Key}>
                <Text blockLevel>
                  {validationText}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </fieldset>
  );
};

export const InputGroupWithGlobalProps = withGlobalProps(InputGroup, 'InputGroup');

export default InputGroupWithGlobalProps;
