import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Card.module.scss';

export const Card = ({
  children,
  dense,
  disabled,
  raised,
  color,
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      color && getRootColorClassName(color, styles),
      dense && styles.isRootDense,
      raised && styles.isRootRaised,
      disabled && styles.isRootDisabled,
    )}
  >
    {children}
  </div>
);

Card.defaultProps = {
  color: undefined,
  dense: false,
  disabled: false,
  raised: false,
};

Card.propTypes = {
  /**
   * Slot for individual card elements that build up the inner layout:
   * * `CardBody`
   * * `CardFooter`
   * * `ScrollView`
   */
  children: PropTypes.node.isRequired,
  /**
   * Color to clarify importance and meaning of the card. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color: PropTypes.oneOf(['success', 'warning', 'danger', 'help', 'info', 'note']),
  /**
   * Make the card more compact.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the card will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Add shadow to pull the card above surface.
   */
  raised: PropTypes.bool,
};

export const CardWithGlobalProps = withGlobalProps(Card, 'Card');

export default CardWithGlobalProps;
