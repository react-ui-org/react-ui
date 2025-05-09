import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import type { ModalHeaderProps } from './ModalHeader.types';
import styles from './ModalHeader.module.scss';

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  children,
  justify = 'space-between',
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      getJustifyClassName(justify, styles),
    )}
  >
    {children}
  </div>
);

export const ModalHeaderWithGlobalProps = withGlobalProps(ModalHeader, 'ModalHeader');

export default ModalHeaderWithGlobalProps;
