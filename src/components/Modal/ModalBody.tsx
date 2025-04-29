import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getScrollingClassName } from './_helpers/getScrollingClassName';
import type { ModalBodyProps } from './ModalBody.types';
import styles from './ModalBody.module.scss';

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
