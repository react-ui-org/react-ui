import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './ModalTitle.module.scss';
import type {
  ModalTitleHeadingTag,
  ModalTitleProps,
} from './Modal.types';

export const ModalTitle: React.FunctionComponent<ModalTitleProps> = ({
  children,
  level = 2,
  ...restProps
}: ModalTitleProps) => {
  const HeadingTag = `h${level}` as ModalTitleHeadingTag;

  return (
    <HeadingTag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </HeadingTag>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const ModalTitleWithGlobalProps = withGlobalProps<ModalTitleProps, never>(ModalTitle, 'ModalTitle');

export default ModalTitleWithGlobalProps;
