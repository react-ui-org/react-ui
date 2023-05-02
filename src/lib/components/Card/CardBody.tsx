import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './Card.scss';
import { CardBodyProps } from './Card.types';

export const CardBody: React.FunctionComponent<CardBodyProps> = ({
  children,
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={styles.body}
  >
    {children}
  </div>
);

export const CardBodyWithGlobalProps = withGlobalProps(CardBody, 'CardBody');

export default CardBodyWithGlobalProps;
