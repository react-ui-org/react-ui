import PropTypes from 'prop-types';
import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import styles from './ModalTitle.scss';

export const ModalTitle = ({
  children,
  id,
  level,
}) => {
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag className={styles.root} id={id}>
      {children}
    </HeadingTag>
  );
};

ModalTitle.defaultProps = {
  id: undefined,
  level: 2,
};

ModalTitle.propTypes = {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Optional heading level. Preferably `1` or `2` should be used, see
   * [W3C recommendation](https://github.com/w3c/aria-practices/issues/551#issuecomment-365134527).
   */
  level: PropTypes.number,
};

export const ModalTitleWithGlobalProps = withGlobalProps(ModalTitle, 'ModalTitle');

export default ModalTitleWithGlobalProps;
