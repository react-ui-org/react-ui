import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Card.scss';
import { CardProps } from './Card.types';

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  dense = false,
  disabled = false,
  raised = false,
  color = 'light',
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      getRootColorClassName(color, styles),
      dense && styles.isRootDense,
      raised && styles.isRootRaised,
      disabled && styles.isRootDisabled,
    )}
  >
    {children}
  </div>
);

export const CardWithGlobalProps = withGlobalProps(Card, 'Card');

export default CardWithGlobalProps;
