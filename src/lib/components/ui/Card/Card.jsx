import PropTypes from 'prop-types';
import React from 'react';
import styles from './Card.scss';

export const Card = (props) => {
  const {
    children,
    dense,
    disabled,
    id,
    raised,
    type,
    variant,
  } = props;

  const overriddenVariant = type === null ? variant : 'bordered';

  let typeClass = '';
  if (type === 'success') {
    typeClass = styles.isTypeSuccess;
  } else if (type === 'warning') {
    typeClass = styles.isTypeWarning;
  } else if (type === 'error') {
    typeClass = styles.isTypeError;
  } else if (type === 'help') {
    typeClass = styles.isTypeHelp;
  } else if (type === 'info') {
    typeClass = styles.isTypeInfo;
  } else if (type === 'note') {
    typeClass = styles.isTypeNote;
  }

  let variantClass = '';
  if (overriddenVariant === 'flat') {
    variantClass = styles.isVariantFlat;
  } else if (overriddenVariant === 'bordered') {
    variantClass = styles.isVariantBordered;
  }

  let denseClass = '';
  if (dense) {
    denseClass = styles.isDense;
  }

  let disabledClass = '';
  if (disabled) {
    disabledClass = styles.isDisabled;
  }

  let raisedClass = '';
  if (raised) {
    raisedClass = styles.isRaised;
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${typeClass}
        ${variantClass}
        ${denseClass}
        ${disabledClass}
        ${raisedClass}
      `).trim()}
      id={id}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  dense: false,
  disabled: false,
  id: undefined,
  raised: false,
  type: null,
  variant: 'flat',
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  raised: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'help', 'info', 'note']),
  variant: PropTypes.oneOf(['flat', 'bordered']),
};

export default Card;
