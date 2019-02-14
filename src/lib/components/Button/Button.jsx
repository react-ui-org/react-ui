import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import styles from './Button.scss';

const Button = (props) => {
  let priorityClass = styles.priorityDefault;
  if (props.priority === 'flat') {
    priorityClass = styles.priorityFlat;
  } else if (props.priority === 'primary') {
    priorityClass = styles.priorityPrimary;
  }

  let sizeClass = styles.sizeMedium;
  if (props.size === 'small') {
    sizeClass = styles.sizeSmall;
  } else if (props.size === 'large') {
    sizeClass = styles.sizeLarge;
  }

  let variantClass = '';
  if (props.variant === 'success') {
    variantClass = styles.variantSuccess;
  } else if (props.variant === 'warning') {
    variantClass = styles.variantWarning;
  } else if (props.variant === 'danger') {
    variantClass = styles.variantDanger;
  }

  let iconPositionClass = '';
  let iconClass = styles.icon;
  if (props.icon || props.loading) {
    if (props.iconPosition === 'after' || props.loading) {
      iconPositionClass = styles.iconPositionAfter;

      if (props.isLabelVisible) {
        iconClass = styles.iconAfter;
      }
    } else {
      iconPositionClass = styles.iconPositionBefore;

      if (props.isLabelVisible) {
        iconClass = styles.iconBefore;
      }
    }
  }

  let blockClass = '';
  if (props.block) {
    blockClass = styles.block;
  }

  return (
    <button
      className={(`
        ${styles.root}
        ${priorityClass}
        ${sizeClass}
        ${variantClass}
        ${iconPositionClass}
        ${blockClass}
      `).trim()}
      onClick={props.clickHandler}
      title={props.isLabelVisible ? null : props.label}
      type={props.type}
      disabled={props.disabled || props.loading}
    >
      {(props.icon || props.loading) && (
        <span className={(`${iconClass} ${props.loading ? styles.iconLoading : ''}`).trim()}>
          <Icon icon={props.loading ? 'sync' : props.icon} size={props.size} />
        </span>
      )}
      <span className={props.isLabelVisible ? undefined : styles.hiddenLabel}>
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
  isLabelVisible: true,
  loading: false,
  priority: 'default',
  size: 'medium',
  type: 'button',
  variant: 'default',
};

Button.propTypes = {
  block: PropTypes.bool,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  priority: PropTypes.oneOf(['default', 'primary', 'flat']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
};

export default Button;
