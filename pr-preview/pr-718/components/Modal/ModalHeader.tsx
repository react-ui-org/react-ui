import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalHeader.module.scss';
import type { ModalHeaderProps } from './Modal.types';

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  children,
  justify = 'space-between',
  ...restProps
}: ModalHeaderProps) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      getJustifyClassName(styles, justify),
    )}
  >
    {children}
  </div>
);

export const ModalHeaderWithGlobalProps = withGlobalProps<ModalHeaderProps, never>(ModalHeader, 'ModalHeader');

export default ModalHeaderWithGlobalProps;
