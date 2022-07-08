import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './ModalFooter.scss';

export const ModalFooter = ({
  children,
  id,
  justify,
}) => {
  const justifyClass = (value) => {
    if (value === 'start') {
      return styles.isJustifiedToStart;
    }

    if (value === 'center') {
      return styles.isJustifiedToCenter;
    }

    if (value === 'end') {
      return styles.isJustifiedToEnd;
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

ModalFooter.defaultProps = {
  id: undefined,
  justify: 'center',
};

ModalFooter.propTypes = {
  /**
   * Content of the footer (preferably nested `Button` elements).
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

export const ModalFooterWithGlobalProps = withGlobalProps(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
