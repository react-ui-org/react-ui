import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import withForwardedRef from '../withForwardedRef';
import styles from './Button.scss';

export const Button = ({
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
  ...restProps
}) => {
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

  /* No worries, `type` is always assigned correctly through props. */
  /* eslint-disable react/button-has-type */
  return (
    <button
      {...transferProps(restProps)}
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
/* eslint-enable react/button-has-type */

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
   */
  block: PropTypes.bool,
  /**
   * Function to call when the button is clicked.
   */
  clickHandler: PropTypes.func,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Element to be displayed in the top right corner.
   */
  endCorner: PropTypes.node,
  /**
   * Reference forwarded to the `button` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * Treat button differently when it's inside `ButtonGroup`. Do not set manually!
   */
  grouped: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Button label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Defines when the button label should be visible.
   */
  labelVisibility: PropTypes.oneOf(['all', 'desktop', 'none']),
  /**
   * Element to be displayed as a loading icon. When defined, it implies the button is in the
   * loading state.
   */
  loadingIcon: PropTypes.node,
  /**
   * Visual priority to highlight or suppress the button.
   */
  priority: PropTypes.oneOf(['default', 'outline', 'flat', 'link']),
  /**
   * Size of the button.
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
  /**
   * Color variant to clarify importance and meaning of the button.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'dark']),
};

export default withForwardedRef(Button);
