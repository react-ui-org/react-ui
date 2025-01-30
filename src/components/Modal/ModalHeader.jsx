import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../jsHelpers/classNames/classNames';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalHeader.module.scss';

export const ModalHeader = ({
  children,
  justify,
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

ModalHeader.defaultProps = {
  justify: 'space-between',
};

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

export const ModalHeaderWithGlobalProps = withGlobalProps(ModalHeader, 'ModalHeader');

export default ModalHeaderWithGlobalProps;
