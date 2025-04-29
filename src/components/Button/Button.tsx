import React, {
  useContext,
  forwardRef,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { ButtonGroupContext } from '../ButtonGroup';
import { InputGroupContext } from '../InputGroup/InputGroupContext';
import getRootLabelVisibilityClassName from './helpers/getRootLabelVisibilityClassName';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
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

export const ButtonWithGlobalProps = withGlobalProps(Button, 'Button');

export default ButtonWithGlobalProps;
