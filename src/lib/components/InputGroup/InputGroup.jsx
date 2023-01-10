import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text } from '../Text';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { FormLayoutContext } from '../FormLayout';
import { InputGroupContext } from './InputGroupContext';
import styles from './InputGroup.scss';

export const InputGroup = ({
  children,
  id,
  isLabelVisible,
  label,
  layout,
  size,
  validationTexts,
  ...restProps
}) => {
  const formLayoutContext = useContext(FormLayoutContext);

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
    <div
      {...transferProps(restProps)}
      id={id}
      className={classNames(
        styles.root,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        getRootSizeClassName(size, styles),
        getRootValidationStateClassName(validationState, styles),
      )}
    >
      <div
        className={classNames(
          styles.label,
          !isLabelVisible && styles.isLabelHidden,
        )}
        id={id && `${id}__label`}
      >
        {label}
      </div>
      <div className={styles.field}>
        <div
          className={styles.inputGroup}
          id={id && `${id}__group`}
          role="group"
        >
          <InputGroupContext.Provider
            value={{
              layout,
              size,
            }}
          >
            {children}
          </InputGroupContext.Provider>
        </div>
        {validationTexts && (
          <div
            className={styles.validationText}
            id={id && `${id}__validationTexts`}
          >
            {validationTexts.map((validationText) => (
              <Text blockLevel key={validationText}>
                {validationText}
              </Text>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

InputGroup.defaultProps = {
  children: null,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
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
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__group`
   * * `<ID>__label`
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
  label: PropTypes.string.isRequired,
  /**
   * Layout of the group.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
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
