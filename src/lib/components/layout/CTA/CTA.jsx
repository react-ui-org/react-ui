import PropTypes from 'prop-types';
import React from 'react';
import styles from './CTA.scss';

export const CTA = (props) => {
  const {
    align,
    children,
  } = props;

  const alignClass = (value) => {
    if (value === 'top') {
      return styles.isAlignedToTop;
    }

    if (value === 'middle') {
      return styles.isAlignedToMiddle;
    }

    if (value === 'bottom') {
      return styles.isAlignedToBottom;
    }

    return styles.isAlignedToBaseline;
  };

  return (
    <div
      className={[
        styles.root,
        alignClass(align),
      ].join(' ')}
    >
      {children}
    </div>
  );
};

CTA.defaultProps = {
  align: 'baseline',
};

CTA.propTypes = {
  /**
   * Vertical alignment of CTA elements.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  /**
   * Slot for individual CTA elements: CTAStart, CTACenter, and CTAEnd.
   */
  children: PropTypes.node.isRequired,
};

export default CTA;
