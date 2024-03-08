import PropTypes from 'prop-types';
import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalTitle.module.scss';

export const ModalTitle = ({
  children,
  level,
  ...restProps
}) => {
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </HeadingTag>
  );
};

ModalTitle.defaultProps = {
  level: 2,
};

ModalTitle.propTypes = {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional heading level. Preferably `1` or `2` should be used, see
   * [W3C recommendation](https://github.com/w3c/aria-practices/issues/551#issuecomment-365134527).
   */
  level: PropTypes.number,
};

export const ModalTitleWithGlobalProps = withGlobalProps(ModalTitle, 'ModalTitle');

export default ModalTitleWithGlobalProps;
