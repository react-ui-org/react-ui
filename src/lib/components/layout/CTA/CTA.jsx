import PropTypes from 'prop-types';
import React from 'react';
import elementOfType from '../../../propTypes/elementOfType';
import { withProviderContext } from '../../../provider';
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
   * Nested elements. Supported types are:
   * * `CTAStart`
   * * `CTACenter`
   * * `CTAEnd`
   */
  children: elementOfType(['CTAStart', 'CTACenter', 'CTAEnd']).isRequired,
};

export const CTAWithContext = withProviderContext(CTA, 'CTA');

export default CTAWithContext;
