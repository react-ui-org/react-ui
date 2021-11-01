import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import styles from './Card.scss';

export const CardBody = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.body}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  /**
   * Content of the card.
   */
  children: PropTypes.node.isRequired,
};

export const CardBodyWithContext = withProviderContext(CardBody, 'CardBody');

export default CardBodyWithContext;
