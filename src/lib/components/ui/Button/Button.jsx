import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './Button.scss';

export const Button = (props) => {
  const {
    afterLabel,
    beforeLabel,
    block,
    clickHandler,
    disabled,
    endCorner,
    forwardedRef,
    grouped,
    id,
    label,
    labelVisibility,
    loadingIcon,
    priority,
    size,
    startCorner,
    type,
    variant,
  } = props;

  let priorityClass = '';
  let sizeClass = '';
  let variantClass = '';
  let blockClass = '';
  let groupedClass = '';
  let labelVisibilityClass = '';
  let loadingClass = '';

  if (priority === 'default') {
    priorityClass = styles.priorityDefault;
  } else if (priority === 'outline') {
    priorityClass = styles.priorityOutline;
  } else if (priority === 'flat') {
    priorityClass = styles.priorityFlat;
  } else if (priority === 'link') {
    priorityClass = styles.priorityLink;
  }

  if (priority !== 'link') {
    if (size === 'small') {
      sizeClass = styles.sizeSmall;
    } else if (size === 'medium') {
      sizeClass = styles.sizeMedium;
    } else if (size === 'large') {
      sizeClass = styles.sizeLarge;
    }

    if (variant === 'primary') {
      variantClass = styles.variantPrimary;
    } else if (variant === 'secondary') {
      variantClass = styles.variantSecondary;
    } else if (variant === 'success') {
      variantClass = styles.variantSuccess;
    } else if (variant === 'warning') {
      variantClass = styles.variantWarning;
    } else if (variant === 'danger') {
      variantClass = styles.variantDanger;
    } else if (variant === 'dark') {
      variantClass = styles.variantDark;
    }

    if (block) {
      blockClass = styles.isRootBlock;
    }

    if (grouped) {
      groupedClass = styles.isRootGrouped;
    }

    if (labelVisibility === 'desktop') {
      labelVisibilityClass = styles.withLabelHiddenMobile;
    } else if (labelVisibility === 'none') {
      labelVisibilityClass = styles.withLabelHidden;
    }

    if (loadingIcon) {
      loadingClass = styles.isRootLoading;
    }
  }

  const propsToTransfer = transferProps(
    props,
    ['afterLabel', 'beforeLabel', 'block', 'clickHandler', 'disabled', 'endCorner', 'grouped', 'id',
      'label', 'labelVisibility', 'loadingIcon', 'priority', 'size', 'startCorner', 'type', 'variant'],
  );

  return (
    <button
      {...propsToTransfer}
      className={(`
        ${styles.root}
        ${priorityClass}
        ${sizeClass}
        ${variantClass}
        ${blockClass}
        ${groupedClass}
        ${labelVisibilityClass}
        ${loadingClass}
      `).trim()}
      disabled={disabled || !!loadingIcon}
      id={id}
      onClick={clickHandler}
      ref={forwardedRef}
      type={type}
    >
      {priority !== 'link' && startCorner && (
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
      {priority !== 'link' && endCorner && (
        <span className={styles.endCorner}>
          {endCorner}
        </span>
      )}
      {priority !== 'link' && loadingIcon && (
        <span className={styles.loadingIcon}>
          {loadingIcon}
        </span>
      )}
    </button>
  );
};

Button.defaultProps = {
  afterLabel: null,
  beforeLabel: null,
  block: false,
  clickHandler: null,
  disabled: false,
  endCorner: null,
  forwardedRef: undefined,
  grouped: false,
  id: undefined,
  labelVisibility: 'all',
  loadingIcon: null,
  priority: 'default',
  size: 'medium',
  startCorner: null,
  type: 'button',
  variant: 'primary',
};

Button.propTypes = {
  afterLabel: PropTypes.node,
  beforeLabel: PropTypes.node,
  block: PropTypes.bool,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  endCorner: PropTypes.node,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  grouped: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelVisibility: PropTypes.oneOf(['all', 'desktop', 'none']),
  loadingIcon: PropTypes.node,
  priority: PropTypes.oneOf(['default', 'outline', 'flat', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startCorner: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'dark']),
};

export default withForwardedRef(Button);
