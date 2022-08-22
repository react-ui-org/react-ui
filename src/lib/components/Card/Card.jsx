import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Card.scss';

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
      getRootColorClassName(color, styles),
      dense && styles.rootDense,
      raised && styles.rootRaised,
      disabled && styles.isDisabled,
    )}
  >
    {children}
  </div>
);

Card.defaultProps = {
  color: 'light',
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
   * [Color variant](/foundation/colors#component-colors) to clarify importance and meaning of the card.
   */
  color: PropTypes.oneOf(
    ['primary', 'secondary', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark'],
  ),
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
