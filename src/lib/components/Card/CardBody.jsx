import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import styles from './Card.scss';

export const CardBody = ({
  children,
  id,
}) => (
  <div className={styles.body} id={id}>
    {children}
  </div>
);

CardBody.defaultProps = {
  id: undefined,
};

CardBody.propTypes = {
  /**
   * Content of the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const CardBodyWithGlobalProps = withGlobalProps(CardBody, 'CardBody');

export default CardBodyWithGlobalProps;
