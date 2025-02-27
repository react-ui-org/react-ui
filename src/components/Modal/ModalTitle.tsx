import React, { JSX } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { ModalTitleProps } from './ModalTitle.types';
import styles from './ModalTitle.module.scss';

export const ModalTitle: React.FunctionComponent<ModalTitleProps> = ({
  children,
  level = 2,
  ...restProps
}) => {
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
