import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import styles from './Card.scss';

export const CardBody = ({ children }) => (
  <div className={styles.body}>
    {children}
  </div>
);

CardBody.propTypes = {
  /**
   * Content of the card.
   */
  children: PropTypes.node.isRequired,
};

export const CardBodyWithGlobalProps = withGlobalProps(CardBody, 'CardBody');

export default CardBodyWithGlobalProps;
