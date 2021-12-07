import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Card.scss';

export const Card = ({
  children,
  dense,
  disabled,
  id,
  raised,
  color,
}) => (
  <div
    className={classNames(
      styles.root,
      getRootColorClassName(color, styles),
      dense && styles.rootDense,
      raised && styles.rootRaised,
      disabled && styles.isDisabled,
    )}
    id={id}
  >
    {children}
  </div>
);

Card.defaultProps = {
  color: 'light',
  dense: false,
  disabled: false,
  id: undefined,
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
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Add shadow to pull the card above surface.
   */
  raised: PropTypes.bool,
};

export const CardWithContext = withProviderContext(Card, 'Card');

export default CardWithContext;
