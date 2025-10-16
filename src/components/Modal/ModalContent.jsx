import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './ModalContent.module.scss';

export const ModalContent = ({
  children,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </div>
  );
};

ModalContent.defaultProps = {
  children: undefined,
};

ModalContent.propTypes = {
  /**
   * Content of the modal.
   */
  children: PropTypes.node,
};

export const ModalContentWithGlobalProps = withGlobalProps(ModalContent, 'ModalContent');

export default ModalContentWithGlobalProps;
