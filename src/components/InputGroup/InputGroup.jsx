import PropTypes from 'prop-types';
import React, {
  useContext,
  useMemo,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../jsHelpers/classNames/classNames';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { Text } from '../Text';
import { InputGroupContext } from './InputGroupContext';
import styles from './InputGroup.module.scss';

export const InputGroup = ({
  children,
  disabled,
  id,
  isLabelVisible,
  label,
  layout,
  required,
  size,
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

  const validationState = children.reduce(
    (state, child) => {
      if (state === 'invalid' || (state === 'warning' && child.props.validationState === 'valid')) {
        return state;
      }
      return child.props.validationState ?? state;
    },
    null,
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
              <li key={validationText}>
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

InputGroup.defaultProps = {
  children: null,
  disabled: false,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
  required: false,
  size: 'medium',
  validationTexts: null,
};

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
  validationTexts: PropTypes.node,
};

export const InputGroupWithGlobalProps = withGlobalProps(InputGroup, 'InputGroup');

export default InputGroupWithGlobalProps;
