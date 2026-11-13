import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalFooter.module.scss';
import type { ModalFooterProps } from './Modal.types';

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = ({
  children,
  justify = 'center',
  ...restProps
}: ModalFooterProps) => (
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

export const ModalFooterWithGlobalProps = withGlobalProps<ModalFooterProps, never>(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
