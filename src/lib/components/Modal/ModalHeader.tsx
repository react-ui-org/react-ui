import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalHeader.scss';
import { ModalHeaderProps } from './Modal.types';

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
