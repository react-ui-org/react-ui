import AirBnbPropTypes from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './CTA.scss';
import { CTACenter } from './CTACenter';
import { CTAEnd } from './CTAEnd';
import { CTAStart } from './CTAStart';

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

const ChildrenPropTypes = [
  AirBnbPropTypes.elementType(CTACenter),
  AirBnbPropTypes.elementType(CTAEnd),
  AirBnbPropTypes.elementType(CTAStart),
];

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
  children: PropTypes.oneOfType([
    ...ChildrenPropTypes,
    PropTypes.arrayOf(PropTypes.oneOfType([...ChildrenPropTypes])),
  ]).isRequired,
};

export const CTAWithContext = withProviderContext(CTA, 'CTA');

export default CTAWithContext;
