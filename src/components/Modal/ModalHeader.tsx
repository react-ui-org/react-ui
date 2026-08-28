import PropTypes from 'prop-types';
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
      getJustifyClassName(justify, styles),
    )}
  >
    {children}
  </div>
);

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
ModalHeader.propTypes = {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: PropTypes.node.isRequired,
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'stretch']),
};

export const ModalHeaderWithGlobalProps = withGlobalProps<ModalHeaderProps, never>(ModalHeader, 'ModalHeader');

export default ModalHeaderWithGlobalProps;
