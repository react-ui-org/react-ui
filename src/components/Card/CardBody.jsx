import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import styles from './Card.module.scss';

export const CardBody = ({
  children,
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={styles.body}
  >
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
