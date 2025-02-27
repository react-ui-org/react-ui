import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import { ModalFooterProps } from './ModalFooter.types';
import styles from './ModalFooter.module.scss';

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = ({
  children,
  justify = 'center',
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

export const ModalFooterWithGlobalProps = withGlobalProps(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
