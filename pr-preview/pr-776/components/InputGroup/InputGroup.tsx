import React, {
  useContext,
  useMemo,
} from 'react';
import type {
  Key,
  ReactElement,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootStateClassName } from '../_helpers/getRootStateClassName';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { Text } from '../Text';
import type { State } from '../../types';
import { InputGroupContext } from './InputGroupContext';
import styles from './InputGroup.module.scss';
import type { InputGroupProps } from './InputGroup.types';

const statePriority: State[] = ['invalid', 'warning', 'changed', 'valid'];

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  children,
  disabled = false,
  helpTexts,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  required = false,
  size = 'medium',
  validationTexts,
  ...restProps
}: InputGroupProps) => {
  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContextValue = useMemo(() => ({
    disabled,
    layout,
    size,
  }), [disabled, layout, size]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  const childStates = React.Children.toArray(children)
    .map((child) => (child as ReactElement<{ state?: State }>).props.state);
  const state = statePriority.find((priorityState) => childStates.includes(priorityState));

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
        getRootSizeClassName(styles, size),
        getRootStateClassName(styles, state),
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
        {helpTexts && helpTexts.length > 0 && (
          <ul
            className={styles.helpText}
            id={id && `${id}__helpTexts`}
          >
            {helpTexts.map((helpText) => (
              <li key={helpText as Key}>
                <Text blockLevel>
                  {helpText}
                </Text>
              </li>
            ))}
          </ul>
        )}
        {validationTexts && validationTexts.length > 0 && (
          <ul
            className={styles.validationText}
            id={id && `${id}__validationTexts`}
          >
            {validationTexts.map((validationText) => (
              <li key={validationText as Key}>
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

export const InputGroupWithGlobalProps = withGlobalProps<InputGroupProps, never>(InputGroup, 'InputGroup');

export default InputGroupWithGlobalProps;
