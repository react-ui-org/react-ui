import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalTitle.scss';
import { ModalTitleProps } from './Modal.types';

export const ModalTitle = ({
  children,
  level = 2,
  ...restProps
}: ModalTitleProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </HeadingTag>
  );
};

export const ModalTitleWithGlobalProps = withGlobalProps(ModalTitle, 'ModalTitle');

export default ModalTitleWithGlobalProps;
