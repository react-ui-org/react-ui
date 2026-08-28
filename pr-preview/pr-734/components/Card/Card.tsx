import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Card.module.scss';
import type { CardProps } from './Card.types';

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  dense = false,
  disabled = false,
  raised = false,
  color,
  ...restProps
}: CardProps) => (
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const CardWithGlobalProps = withGlobalProps<CardProps, never>(Card, 'Card');

export default CardWithGlobalProps;
