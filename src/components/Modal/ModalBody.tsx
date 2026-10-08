import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getScrollingClassName } from './_helpers/getScrollingClassName';
import styles from './ModalBody.module.scss';
import type { ModalBodyProps } from './Modal.types';

export const ModalBody: React.FunctionComponent<ModalBodyProps> = ({
  children,
  scrolling = 'auto',
  ...restProps
}: ModalBodyProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getScrollingClassName(styles, scrolling),
      )}
    >
      {children}
    </div>
  );
};

export const ModalBodyWithGlobalProps = withGlobalProps<ModalBodyProps, never>(ModalBody, 'ModalBody');

export default ModalBodyWithGlobalProps;
