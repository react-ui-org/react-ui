import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import type { CardProps } from './Card.types';
import styles from './Card.module.scss';

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
