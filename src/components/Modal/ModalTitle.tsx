import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './ModalTitle.module.scss';
import type {
  ModalTitleHeadingTag,
  ModalTitleProps,
} from './Modal.types';

export const ModalTitle: React.FunctionComponent<ModalTitleProps> = ({
  children,
  level = 2,
  ...restProps
}: ModalTitleProps) => {
  const HeadingTag = `h${level}` as ModalTitleHeadingTag;

  return (
    <HeadingTag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </HeadingTag>
  );
};

export const ModalTitleWithGlobalProps = withGlobalProps<ModalTitleProps, never>(ModalTitle, 'ModalTitle');

export default ModalTitleWithGlobalProps;
