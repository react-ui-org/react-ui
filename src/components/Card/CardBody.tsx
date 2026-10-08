import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './Card.module.scss';
import type { CardBodyProps } from './Card.types';

export const CardBody: React.FunctionComponent<CardBodyProps> = ({
  children,
  ...restProps
}: CardBodyProps) => (
  <div
    {...transferProps(restProps)}
    className={styles.body}
  >
    {children}
  </div>
);

export const CardBodyWithGlobalProps = withGlobalProps<CardBodyProps, never>(CardBody, 'CardBody');

export default CardBodyWithGlobalProps;
