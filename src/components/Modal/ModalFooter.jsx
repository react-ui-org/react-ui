import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../jsHelpers/classNames/classNames';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalFooter.module.scss';

export const ModalFooter = ({
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

ModalFooter.defaultProps = {
  justify: 'center',
};

ModalFooter.propTypes = {
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: PropTypes.node.isRequired,
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'stretch']),
};

export const ModalFooterWithGlobalProps = withGlobalProps(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
