import PropTypes from 'prop-types';
import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import { classNames } from '../../utils/classNames';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalHeader.scss';

export const ModalHeader = ({
  children,
  id,
  justify,
}) => (
  <div
    className={classNames(
      styles.root,
      getJustifyClassName(justify, styles),
    )}
    id={id}
  >
    {children}
  </div>
);

ModalHeader.defaultProps = {
  id: undefined,
  justify: 'space-between',
};

ModalHeader.propTypes = {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'stretch']),
};

export const ModalHeadWithGlobalProps = withGlobalProps(ModalHeader, 'ModalHeader');

export default ModalHeadWithGlobalProps;
