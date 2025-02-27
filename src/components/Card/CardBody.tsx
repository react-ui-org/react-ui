import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { CardBodyProps } from './CardBody.types';
import styles from './Card.module.scss';

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
