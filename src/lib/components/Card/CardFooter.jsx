import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Card.scss';

export const CardFooter = ({ children }) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.footer}>
      {children}
    </div>
  );
};

CardFooter.defaultProps = {
  children: null,
};

CardFooter.propTypes = {
  /**
   * Card actions, usually buttons.
   */
  children: PropTypes.node,
};

export const CardFooterWithGlobalProps = withGlobalProps(CardFooter, 'CardFooter');

export default CardFooterWithGlobalProps;
