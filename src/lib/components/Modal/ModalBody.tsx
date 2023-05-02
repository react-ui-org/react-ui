import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getScrollingClassName } from './_helpers/getScrollingClassName';
import styles from './ModalBody.scss';
import { ModalBodyProps } from './Modal.types';

export const ModalBody: React.FunctionComponent<ModalBodyProps> = ({
  children,
  scrolling = 'auto',
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getScrollingClassName(scrolling, styles),
      )}
    >
      {children}
    </div>
  );
};

export const ModalBodyWithGlobalProps = withGlobalProps(ModalBody, 'ModalBody');

export default ModalBodyWithGlobalProps;
