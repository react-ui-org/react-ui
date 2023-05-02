import React, { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { transferProps } from '../_helpers/transferProps';
import { ButtonGroupContext } from '../ButtonGroup';
import { withGlobalProps } from '../../provider';
import getRootLabelVisibilityClassName from './helpers/getRootLabelVisibilityClassName';
import getRootPriorityClassName from './helpers/getRootPriorityClassName';
import styles from './Button.scss';
import { ButtonProps } from './Button.types';

export const Button: React.FunctionComponent<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  afterLabel,
  beforeLabel,
  block = false,
  color = 'primary',
  disabled = false,
  endCorner,
  feedbackIcon,
  id,
  label,
  labelVisibility = 'xs',
  priority = 'filled',
  size = 'medium',
  startCorner,
  type = 'button',
  ...restProps
}, ref) => {
  const context = useContext(ButtonGroupContext);

  return (
    <button
      /* eslint-disable react/button-has-type */
      type={type}
      /* eslint-enable react/button-has-type */
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getRootPriorityClassName(
          resolveContextOrProp(context && context.priority, priority),
          styles,
        ),
        getRootColorClassName(color, styles),

        getRootSizeClassName(
          resolveContextOrProp(context && context.size, size),
          styles,
        ),
        getRootLabelVisibilityClassName(labelVisibility, styles),
        resolveContextOrProp(context && context.block, block) && styles.isRootBlock,
        context && styles.isRootGrouped,
        feedbackIcon && styles.hasRootFeedback,
      )}
      disabled={resolveContextOrProp(context && context.disabled, disabled) || !!feedbackIcon}
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
  );
});

export const ButtonWithGlobalProps = withGlobalProps(Button, 'Button');

export default ButtonWithGlobalProps;
