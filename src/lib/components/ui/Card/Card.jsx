import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
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
  /**
   * Slot for individual Card elements that build up the inner layout: CardBody, CardFooter, or
   * ScrollView.
   */
  children: PropTypes.node.isRequired,
  /**
   * Make the card more compact.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the card will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Add shadow to pull the card above the surface.
   */
  raised: PropTypes.bool,
  /**
   * Color variant to clarify importance and meaning of the button.
   */
  type: PropTypes.oneOf(['success', 'warning', 'error', 'help', 'info', 'note']),
  /**
   * Visual card variants.
   */
  variant: PropTypes.oneOf(['flat', 'bordered']),
};

export const CardWithContext = withProviderContext(Card, 'Card');

export default CardWithContext;
