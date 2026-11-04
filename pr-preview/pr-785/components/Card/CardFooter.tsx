import React from 'react';
import { transferProps } from '../../helpers/transferProps';
import { withGlobalProps } from '../../providers/globalProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './Card.module.scss';
import type { CardFooterProps } from './Card.types';

export const CardFooter: React.FunctionComponent<CardFooterProps> = ({
  children,
  ...restProps
}: CardFooterProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={styles.footer}
    >
      {children}
    </div>
  );
};

export const CardFooterWithGlobalProps = withGlobalProps<CardFooterProps, never>(CardFooter, 'CardFooter');

export default CardFooterWithGlobalProps;
