import PropTypes from 'prop-types';
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
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { Text } from '../Text';
import type { ValidationState } from '../../types';
import { InputGroupContext } from './InputGroupContext';
import styles from './InputGroup.module.scss';
import type { InputGroupProps } from './InputGroup.types';

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

  const validationState = React.Children.toArray(children).reduce<ValidationState | undefined>(
    (state, child) => {
      const childValidationState = (child as ReactElement<{ validationState?: ValidationState }>).props.validationState;

      if (state === 'invalid' || (state === 'warning' && childValidationState === 'valid')) {
        return state;
      }
      return childValidationState ?? state;
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
InputGroup.propTypes = {
  /**
   * Supported elements to be grouped:
   * * `Button`
   * * `SelectField`
   * * `TextField`
   *
   * If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * If `true`, the whole input group with all nested inputs and buttons will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * An array of help texts to be displayed.
   */
  helpTexts: PropTypes.arrayOf(PropTypes.node),
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__label`
   * * `<ID>__displayLabel`
   * * `<ID>__group`
   * * `<ID>__validationTexts`
   */
  id: PropTypes.string,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible: PropTypes.bool,
  /**
   * Input group label.
   */
  label: PropTypes.node.isRequired,
  /**
   * Layout of the group.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the `InputGroup`'s label appears as required. Underlying `<fieldset>`
   * element does not take `required` attribute so there is no functional effect.
   */
  required: PropTypes.bool,
  /**
   * Size of the `children` elements.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * An array of validation messages to be displayed.
   */
  validationTexts: PropTypes.arrayOf(PropTypes.node),
};

export const InputGroupWithGlobalProps = withGlobalProps<InputGroupProps, never>(InputGroup, 'InputGroup');

export default InputGroupWithGlobalProps;
