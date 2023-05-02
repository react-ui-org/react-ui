import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalContent.scss';
import { ModalContentProps } from './Modal.types';

export const ModalContent: React.FunctionComponent<ModalContentProps> = ({
  children = null,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </div>
  );
};

export const ModalContentWithGlobalProps = withGlobalProps(ModalContent, 'ModalContent');

export default ModalContentWithGlobalProps;
