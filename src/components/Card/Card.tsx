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
      color && getRootColorClassName(styles, color),
      dense && styles.isRootDense,
      raised && styles.isRootRaised,
      disabled && styles.isRootDisabled,
    )}
  >
    {children}
  </div>
);

export const CardWithGlobalProps = withGlobalProps<CardProps, never>(Card, 'Card');

export default CardWithGlobalProps;
