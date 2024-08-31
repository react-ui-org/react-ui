import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { ButtonGroupContext } from '../ButtonGroup';
import { InputGroupContext } from '../InputGroup/InputGroupContext';
import getRootLabelVisibilityClassName from './helpers/getRootLabelVisibilityClassName';
import styles from './Button.module.scss';

export const Button = React.forwardRef((props, ref) => {
  const {
    afterLabel,
    beforeLabel,
    block,
    disabled,
    endCorner,
    feedbackIcon,
    id,
    label,
    labelVisibility,
    priority,
    size,
    startCorner,
    color,
    ...restProps
  } = props;
  const buttonGroupContext = useContext(ButtonGroupContext);
  const inputGroupContext = useContext(InputGroupContext);

  if (buttonGroupContext && inputGroupContext) {
    throw new Error('Button cannot be placed both in `ButtonGroup` and `InputGroup`.');
  }

  const primaryContext = buttonGroupContext ?? inputGroupContext;

  return (
    /* No worries, `type` is always assigned correctly through props. */
    /* eslint-disable react/button-has-type */
    <button
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getRootPriorityClassName(
          resolveContextOrProp(buttonGroupContext && buttonGroupContext.priority, priority),
          styles,
        ),
        getRootColorClassName(color, styles),
        getRootSizeClassName(
          resolveContextOrProp(primaryContext && primaryContext.size, size),
          styles,
        ),
        getRootLabelVisibilityClassName(labelVisibility, styles),
        resolveContextOrProp(buttonGroupContext && buttonGroupContext.block, block) && styles.isRootBlock,
        buttonGroupContext && styles.isRootInButtonGroup,
        inputGroupContext && styles.isRootInInputGroup,
        feedbackIcon && styles.hasRootFeedback,
      )}
      disabled={resolveContextOrProp(primaryContext && primaryContext.disabled, disabled) || !!feedbackIcon}
      id={id}
      ref={ref}
    >
      {startCorner && (
        <span className={styles.startCorner}>
          {startCorner}
        </span>
      )}
      {beforeLabel && (
        <span className={styles.beforeLabel}>
          {beforeLabel}
        </span>
      )}
      <span
        className={styles.label}
        {...(id && { id: `${id}__labelText` })}
      >
        {label}
      </span>
      {afterLabel && (
        <span className={styles.afterLabel}>
          {afterLabel}
        </span>
      )}
      {endCorner && (
        <span className={styles.endCorner}>
          {endCorner}
        </span>
      )}
      {feedbackIcon && (
        <span className={styles.feedbackIcon}>
          {feedbackIcon}
        </span>
      )}
    </button>
    /* eslint-enable react/button-has-type */
  );
});

Button.defaultProps = {
  afterLabel: null,
  beforeLabel: null,
  block: false,
  color: 'primary',
  disabled: false,
  endCorner: null,
  feedbackIcon: null,
  id: undefined,
  labelVisibility: 'xs',
  priority: 'filled',
  size: 'medium',
  startCorner: null,
  type: 'button',
};

Button.propTypes = {
  /**
   * Element to be displayed after label, eg. an icon.
   */
  afterLabel: PropTypes.node,
  /**
   * Element to be displayed before label, eg. an icon.
   */
  beforeLabel: PropTypes.node,
  /**
   * If `true`, the button will span the full width of its parent.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  block: PropTypes.bool,
  /**
   * [Color variant](/docs/foundation/colors#component-colors) to clarify importance and meaning of the button.
   */
  color: PropTypes.oneOf(
    ['primary', 'secondary', 'selected', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark'],
  ),
  /**
   * If `true`, the button will be disabled.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  disabled: PropTypes.bool,
  /**
   * Element to be displayed in the top right corner.
   */
  endCorner: PropTypes.node,
  /**
   * Element to be displayed as a feedback icon on top of button label. When defined, it implies the
   * button is in feedback state.
   */
  feedbackIcon: PropTypes.node,
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__labelText`
   */
  id: PropTypes.string,
  /**
   * Button label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Defines minimum breakpoint from which the button label will be visible.
   */
  labelVisibility: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'x2l', 'x3l', 'none']),
  /**
   * Visual priority to highlight or suppress the button.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  priority: PropTypes.oneOf(['filled', 'outline', 'flat']),
  /**
   * Size of the button.
   *
   * Ignored if the component is rendered within `ButtonGroup` or `InputGroup` component as the value is inherited in
   * such case.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Element to be displayed in the top left corner.
   */
  startCorner: PropTypes.node,
  /**
   * Set the HTML `type` attribute of the `button` element.
   */
  type: PropTypes.oneOf(['button', 'submit']),
};

export const ButtonWithGlobalProps = withGlobalProps(Button, 'Button');

export default ButtonWithGlobalProps;
