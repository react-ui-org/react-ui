import React, { useContext } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import { FormLayoutContext } from '../FormLayout/FormLayoutContext';
import { InputGroupContext } from '../InputGroup/InputGroupContext';
import getRootLabelVisibilityClassName from './helpers/getRootLabelVisibilityClassName';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  afterLabel,
  beforeLabel,
  block = false,
  disabled = false,
  endCorner,
  feedbackIcon,
  id,
  label,
  labelVisibility = 'xs',
  priority = 'filled',
  size = 'medium',
  startCorner,
  color = 'primary',
  type = 'button',
  ...restProps
}, ref) => {
  const buttonGroupContext = useContext(ButtonGroupContext);
  const formLayoutContext = useContext(FormLayoutContext);
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
          styles,
          resolveContextOrProp(buttonGroupContext && buttonGroupContext.priority, priority),
        ),
        getRootColorClassName(styles, color),
        getRootSizeClassName(
          styles,
          resolveContextOrProp(primaryContext && primaryContext.size, size),
        ),
        getRootLabelVisibilityClassName(styles, labelVisibility),
        resolveContextOrProp(buttonGroupContext && buttonGroupContext.block, block) && styles.isRootBlock,
        buttonGroupContext && styles.isRootInButtonGroup,
        inputGroupContext && styles.isRootInInputGroup,
        formLayoutContext && styles.isRootInFormLayout,
        formLayoutContext && formLayoutContext.layout === 'horizontal' && styles.isRootLayoutHorizontal,
        feedbackIcon && styles.hasRootFeedback,
      )}
      disabled={resolveContextOrProp(primaryContext && primaryContext.disabled, disabled) || !!feedbackIcon}
      id={id}
      ref={ref}
      type={type}
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

export const ButtonWithGlobalProps = withGlobalProps<ButtonProps, HTMLButtonElement>(Button, 'Button');

export default ButtonWithGlobalProps;
