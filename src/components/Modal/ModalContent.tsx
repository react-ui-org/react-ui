import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './ModalContent.module.scss';
import type { ModalContentProps } from './Modal.types';

export const ModalContent: React.FunctionComponent<ModalContentProps> = ({
  children,
  ...restProps
}: ModalContentProps) => {
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
ModalContent.propTypes = {
  /**
   * Content of the modal.
   */
  children: PropTypes.node,
};

export const ModalContentWithGlobalProps = withGlobalProps<ModalContentProps, never>(ModalContent, 'ModalContent');

export default ModalContentWithGlobalProps;
