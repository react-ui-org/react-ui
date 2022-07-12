import PropTypes from 'prop-types';
import React from 'react';
import {
  withGlobalProps,
} from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './ModalHead.scss';

export const ModalHead = ({
  children,
  id,
  justify,
}) => {
  const justifyClass = (value) => {
    if (value === 'center') {
      return styles.isJustifiedToCenter;
    }

    if (value === 'space-between') {
      return styles.isJustifiedToSpaceBetween;
    }

    return styles.isJustifiedToStretch;
  };

  return (
    <div
      className={classNames(
        styles.root,
        justifyClass(justify),
      )}
      id={id}
    >
      {children}
    </div>
  );
};

ModalHead.defaultProps = {
  id: undefined,
  justify: 'space-between',
};

ModalHead.propTypes = {
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
  justify: PropTypes.oneOf(['center', 'space-between', 'stretch']),
};

export const ModalHeadWithGlobalProps = withGlobalProps(ModalHead, 'ModalHead');

export default ModalHeadWithGlobalProps;
