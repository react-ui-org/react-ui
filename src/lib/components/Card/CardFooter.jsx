import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import styles from './Card.scss';

export const CardFooter = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.footer}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  /**
   * Card actions, usually buttons.
   */
  children: PropTypes.node.isRequired,
};

export const CardFooterWithContext = withProviderContext(CardFooter, 'CardFooter');

export default CardFooterWithContext;
