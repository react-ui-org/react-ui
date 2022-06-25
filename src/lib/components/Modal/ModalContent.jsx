import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './ModalContent.scss';

export const ModalContent = ({
  children,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      className={styles.root}
      id={id}
    >
      {children}
    </div>
  );
};

ModalContent.defaultProps = {
  children: null,
  id: undefined,
};

ModalContent.propTypes = {
  /**
   * Content of the modal.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const ModalContentWithGlobalProps = withGlobalProps(ModalContent, 'ModalContent');

export default ModalContentWithGlobalProps;
