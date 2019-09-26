import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import styles from './Button.scss';

const Button = (props) => {
  let priorityClass = styles.priorityDefault;
  if (props.priority === 'outline') {
    priorityClass = styles.priorityOutline;
  } else if (props.priority === 'flat') {
    priorityClass = styles.priorityFlat;
  }

  let sizeClass = styles.sizeMedium;
  if (props.size === 'small') {
    sizeClass = styles.sizeSmall;
  } else if (props.size === 'large') {
    sizeClass = styles.sizeLarge;
  }

  let variantClass = styles.variantSecondary;
  if (props.variant === 'primary') {
    variantClass = styles.variantPrimary;
  } else if (props.variant === 'success') {
    variantClass = styles.variantSuccess;
  } else if (props.variant === 'warning') {
    variantClass = styles.variantWarning;
  } else if (props.variant === 'danger') {
    variantClass = styles.variantDanger;
  } else if (props.variant === 'dark') {
    variantClass = styles.variantDark;
  }

  let blockClass = '';
  if (props.block) {
    blockClass = styles.isRootBlock;
  }

  let iconPositionClass = '';
  if (props.icon || props.loading) {
    if (props.iconPosition === 'after' || props.loading) {
      iconPositionClass = styles.withIconAfter;
    } else {
      iconPositionClass = styles.withIconBefore;
    }
  }

  let labelVisibilityClass = '';
  if (props.labelVisibility === 'desktop') {
    labelVisibilityClass = styles.withLabelHiddenMobile;
  } else if (props.labelVisibility === 'none') {
    labelVisibilityClass = styles.withLabelHidden;
  }

  return (
    <button
      className={(`
        ${styles.root}
        ${priorityClass}
        ${sizeClass}
        ${variantClass}
        ${blockClass}
        ${iconPositionClass}
        ${labelVisibilityClass}
      `).trim()}
      id={props.id}
      onClick={props.clickHandler}
      title={props.labelVisibility === 'all' ? null : props.label}
      type={props.type}
      disabled={props.disabled || props.loading}
    >
      {(props.icon || props.loading) && (
        <span
          className={`
            ${styles.icon}
            ${props.loading ? styles.iconLoading : ''}
          `.trim()}
        >
          <Icon icon={props.loading ? 'sync' : props.icon} size={props.size} />
        </span>
      )}
      <span
        className={styles.label}
        {...(props.id && { id: `${props.id}__label` })}
      >
        {props.label}
      </span>
    </button>
  );
};

Button.defaultProps = {
  block: false,
  clickHandler: null,
  disabled: false,
  icon: null,
  iconPosition: 'before',
  id: undefined,
  labelVisibility: 'all',
  loading: false,
  priority: 'default',
  size: 'medium',
  type: 'button',
  variant: 'primary',
};

Button.propTypes = {
  block: PropTypes.bool,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelVisibility: PropTypes.oneOf(['all', 'desktop', 'none']),
  loading: PropTypes.bool,
  priority: PropTypes.oneOf(['default', 'outline', 'flat']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'dark']),
};

export default Button;
