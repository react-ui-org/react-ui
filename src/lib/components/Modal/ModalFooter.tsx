import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalFooter.scss';
import { ModalFooterProps } from './Modal.types';

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
